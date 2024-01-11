import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SECRET} from '@env'

export const setSecureValue = async (key, value) => {
    console.log("SETTING SECURE VALUE")
    await Keychain.setInternetCredentials(key, KEYCHAIN_SECRET, value)   
 }
 
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
 

 const onJwtTestButtonPress = async () => {
    const token = await Keychain.getSecureValue('JWT');
    console.log(token)
    axios.get('URL Servidor Heroku', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("RESPONSE TESTING JWT TOKEN FROM EXPRESS");
      console.log(response.data.message);  
    })
    .catch(error => {
      console.log("RESPONSE ERROR TOKEN VERIFICATION");
      console.log(error);
    })
    .then(() => {
      setIsLoading(false)
    })
  }
 
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
  
  