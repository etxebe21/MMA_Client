import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SECRET} from '@env'
import auth from '@react-native-firebase/auth';
import axios from 'axios';

export const setSecureValue = async (jsonAccessToken) => {
           
  const key = KEYCHAIN_SECRET;
  const value = jsonAccessToken.accessToken;
  try {
    if (value !== undefined && value !== null) {
      console.log('Key:', key);
      console.log('Value:', value);

      await Keychain.setGenericPassword(key, value, { service: 'myApp' });
      console.log('Token guardado en Keychain');
      const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
      console.log('Credenciales', credentials)
      const token = credentials?.password;
      console.log('Recibimos token de keyChain', token)
;                } else {
      console.error('Error: Valor de token vacío o nulo');
    }
  } catch (error) {
    console.error('Error al guardar el token en Keychain:', error);
  }
};
 
export const getSecureValue = async (key) => {
  console.log("GETTING SECURE VALUE");
  try {
    const result = await Keychain.getInternetCredentials(key);
    if (result) {
      console.log(result.password);
      console.log(result);
      return result.password;
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
    const storedToken = await getSecureValue('myApp');
    console.log('Valor de token almacenado en refreshToken:', storedToken);

    const headers = {
      Authorization: `Bearer ${storedToken}`,
      // Otros encabezados si es necesario
    };

    const response = await axios.post(url, { email: userEmail }, { headers });

    if (response.status === 200) {
      const jsonAccessToken = response.data.accessToken;
      console.log('Token actualizado:', jsonAccessToken);

      // Guardar el nuevo token en el Keychain
      await setSecureValue('myApp', jsonAccessToken);

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



// Función para manejar la actualización del token
export const handleTokenRefresh = async () => {
  try {
    // Lógica para actualizar el token 
    const refreshedToken = await user.getIdToken(true);
    console.log('Token refrescado', refreshedToken)

    // Actualizar el token en el almacenamiento seguro
    await Keychain.setSecureValue('JWT', refreshedToken);

    // Volver a intentar la solicitud con el nuevo token
    await onJwtTestButtonPress();
  } catch (error) {
    console.error('Error al intentar actualizar el token:', error);
    // Manejar el error de actualización del token según sea necesario
  }
};

  //MANEJAR LA EXPIRACIÓN DEL TOKEN
  auth().onUserChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
  
      // Verificar si el token ha caducado y actualizar si es necesario
      if (idTokenResult.expirationTime < Date.now()) {
        const refreshedToken = await user.getIdToken(true);
        console.log("Nuevo token", refreshedToken);
        // Obtener el correo electrónico del usuario
        const userEmail = user.email;
  
        // Enviar el correo electrónico y el token actualizado al servidor
        await sendDataToServer(userEmail, refreshedToken);
  
      }
    }
  });
  
  async function sendDataToServer(email, token) {
    const urlServidor = 'https://mmaproject-app.fly.dev/';
    const respuestaServidor = await axios.post(urlServidor, { email, token });
    console.log(respuestaServidor);
  }
  

  