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
 