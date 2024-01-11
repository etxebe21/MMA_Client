import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SECRET} from '@env'
import auth from '@react-native-firebase/auth';


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
  console.log("GETTING SECURE VALUE")
  const result = await Keychain.getInternetCredentials(key)
  if (result) {
    console.log(password);
    console.log(result);
    return result.password 
  }
  return false
 }
 
 export const removeSecureValue = async (key) => {
    console.log("REMOVING SECURE VALUE")
    await Keychain.resetInternetCredentials(key)
 }
 
// Función para manejar la actualización del token
export const handleTokenRefresh = async () => {
  try {
    // Lógica para actualizar el token (similar a lo que ya has implementado)
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
  
        // Manejar el token actualizado según sea necesario
      }
    }
  });
  
  async function sendDataToServer(email, token) {
    // Realizar la lógica para enviar el correo electrónico y el token al servidor
    // Puedes usar axios u otra biblioteca para hacer la solicitud al servidor
    const urlServidor = 'https://mmaproject-app.fly.dev/';
    const respuestaServidor = await axios.post(urlServidor, { email, token });
    console.log(respuestaServidor);
    // Manejar la respuesta del servidor según sea necesario
  }
  
  