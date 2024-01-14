import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SECRET} from '@env'
import axios from 'axios';

export const setSecureValue = async (jsonAccessToken) => {
const key = process.env.KEYCHAIN_SECRET;
const value = jsonAccessToken.accessToken;

try {
if (value !== undefined && value !== null) {
console.log('Key:', key);
console.log('Value:', value);

// Utiliza setGenericPassword con el valor y el nombre de usuario (username)
await Keychain.setGenericPassword(key, value, { service: 'myApp', username: 'accessToken' });
//console.log('Token guardado en Keychain');

// Obtén las credenciales utilizando getGenericPassword
const credentials = await Keychain.getGenericPassword({ service: 'myApp', username: 'accessToken' });
//console.log('Credenciales:', credentials);

const token = credentials?.password;
//console.log('Recibimos token de KeyChain:', token);

} else {
console.error('Error: Valor de token vacío o nulo');
}
} catch (error) {
console.error('Error al guardar el token en Keychain:', error);
}
};

export const setSecureValueRefresh = async (jsonAccessToken) => {
const key = process.env.KEYCHAIN_SECRET;
const valueR = jsonAccessToken.refreshToken;
try {
if (valueR !== undefined && valueR !== null) {
console.log('Key:', key);
console.log('Value:', valueR);

// Utiliza setGenericPassword con el valor y el nombre de usuario (username)
await Keychain.setGenericPassword(key, valueR, { service: 'myAppRefresh', username: 'refreshToken' });
console.log('Token refresh guardado en Keychain');

// Obtén las credenciales utilizando getGenericPassword
const credentialsR = await Keychain.getGenericPassword({ service: 'myAppRefresh', username: 'refreshToken' });
console.log('Credenciales:', credentialsR);

const refreshToken = credentialsR?.password;
console.log('Recibimos refreshtoken de KeyChain:', refreshToken);
} else {
console.error('Error: Valor de token vacío o nulo');
}
} catch (error) {
console.error('Error al guardar el token en Keychain:', error);
}
};

export const getSecureValue = async () => {
const key = KEYCHAIN_SECRET;
try {
// Utiliza getGenericPassword para obtener las credenciales
const credentials = await Keychain.getGenericPassword({ service: 'myApp', username: 'accessToken' });

if (credentials) {
console.log('Valor accesToken obtenido:', credentials.password);
return credentials.password;
}

return false;
} catch (error) {
console.error('Error al obtener valor seguro:', error);
throw error;
}
};

export const getSecureValueRefresh = async () => {
const key = KEYCHAIN_SECRET;
try {
// Utiliza getGenericPassword para obtener las credenciales
const credentials = await Keychain.getGenericPassword({ service: 'myAppRefresh', username: 'refreshToken' });

if (credentials) {
console.log('Valor refresh obtenido:', credentials.password);
return credentials.password;
}

return false;
} catch (error) {
console.error('Error al obtener valor seguro:', error);
throw error;
}
};


export const removeSecureValue = async (key) => {
console.log("REMOVING SECURE VALUE");
try {
await Keychain.resetInternetCredentials(key);
} catch (error) {
console.error('Error al remover valor seguro:', error);
throw error;
}
};

export const refreshToken = async (userEmail) => {
const url = 'https://mmaproject-app.fly.dev/api/users/verify';
try {
// Obtener el token almacenado en el Keychain
const storedToken = await getSecureValueRefresh('myAppRefresh');
console.log('Valor de token almacenado en refreshToken:', storedToken);

const headers = {
Authorization: `Bearer ${storedToken}`,
// Otros encabezados si es necesario
};

const response = await axios.post(url, { email: userEmail }, { headers });

if (response.status === 200) {
const jsonAccessToken = response.data.refreshToken;
console.log('Token actualizado:', jsonAccessToken);

// Guardar el nuevo token en el Keychain
await setSecureValueRefresh('myAppRefresh', jsonAccessToken);

return jsonAccessToken;
} else {
console.error('Error al refrescar el token:', response.statusText);
throw new Error(`Error: ${response.status}`);
}
} catch (error) {
console.error('Error al refrescar el token:', error);
throw error;
}
};
