
import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import { KEYCHAIN_SECRET } from '@env';
import axios from "axios";
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect';
import { setSecureValue, onJwtTestButtonPress, getSecureValue } from "../keychain"

const LoginModal = ({ onLogin, setLoginModalVisible}) => {
    
    const {userGlobalState,     setUserGlobalState }    = useContext(Context);
    const {usersGlobalState,    setUsersGlobalState }   = useContext(Context);
    const {artifactsGlobalState, setArtefactsGlobalState} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
        requestProfile: true,
    });

    async function onGoogleButtonPress() {
        setIsLoading(true);
        try {
          // PASO 1 token
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const { idToken } = await GoogleSignin.signIn();

          // PASO 2 credenciales google
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
          // PASO 3 credenciales
          await auth().signInWithCredential(googleCredential);

          // PASO 4 autenticar usuario actual
          const idTokenResult = await auth().currentUser.getIdTokenResult();
          const checkToken = idTokenResult.token;

          // RUTAS 
          const url = 'https://mmaproject-app.fly.dev/api/users/verify-data'; //FLY 
          const urlUsers = 'https://mmaproject-app.fly.dev/api/users';
          
          // JSWT
          const response = await axios.post(url, {idToken:checkToken});
          const jsonAccessToken = response.data.accessToken;
          
          // COMPROBACION JWT
          if (( jsonAccessToken === undefined || jsonAccessToken === 'error') && console.error.length > 0) {
            console.log('Token Caducado');
          } else {
            console.log('Token de acceso válido:', jsonAccessToken);

            // Guardar el jsonAccessToken en el Keychain
            setSecureValue(jsonAccessToken);
            getAllUsersFromDataBase(urlUsers);
            
            const {validToken, user }= response.data;
            console.log('Iniciado sesión con Google!');

            // Seteamos usuario que ha iniciado sesion
            setUserGlobalState(user);
            
            // Constantes del usuario
            const email = user.email;
            const role = user.role;
            const id = user._id;


            //ASYNC STORAGE
            await AsyncStorage.setItem('userEmail', email)
            .then(() => {
            // console.log('Correo electrónico guardado en AsyncStorage:', email);
            })
            .catch(error => {
            console.error('Error al guardar el correo electrónico en AsyncStorage:', error);
            });

            await AsyncStorage.setItem('userRole', role)
            .then(() => {
            // console.log('Crole guardado en AsyncStorage:', role);
            })
            
            await AsyncStorage.setItem('userID', id)
            .then(() => {
            socket.emit('setUsername', id);
            })
            handleSuccessfulLogin();
          }  
        } catch (error) {
          // Manejar errores aquí
          console.error(error);

        } finally {
          setIsLoading(false);
        }
    }
    
    const handleSuccessfulLogin = () => {  
        //setIsAuthenticated(true);
        onLogin(); // Llama a la función onLogin proporcionada por el componente padre (App) para establecer isAuthenticated como true
        setLoginModalVisible(false); // Cierra el modal después del inicio de sesión exitoso 
        getArtifactsFromDataBase()
      
      };

      const getArtifactsFromDataBase = async () => {
        try {
      
          setIsLoading(true);
      
          // Obtener el token JWT del almacenamiento seguro
          const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
          const token = credentials?.password;
      
          if (token) {
            const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      
            // Realizar la solicitud al servidor con el token en el encabezado de autorización
            const response = await axios.get(url, {
              headers: {
                'authorization': `Bearer ${token}`
              }
            });
      
            const artifactsData = response.data.data;
      
            // Actualizar los artefactos con la información de las imágenes del usuario
            const updatedArtifacts = await Promise.all(
              artifactsData.map(async (artifact) => {
                if (artifact.found) {
                  const userImage = await getUserImageById(artifact.who);
                  return { ...artifact, userImage };
                }
                return artifact;
              })
            );
      
            setArtefactsGlobalState(updatedArtifacts);
      
            // Log if needed
            console.log('Artefactos guardados en artifactsGlobalState:');
          } else {
            console.log('No se encontró un token en el Keychain.');
          }
        } catch (error) {
          console.error('Error al obtener artefactos:', error);
        } finally {
          // Set isLoading to false if needed
          setIsLoading(false);
        }
      };

        // función para obtener la imagen del usuario por su ID
  const getUserImageById = async (userId) => {
    try {
      // Obtener el token JWT del almacenamiento seguro
      const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
      const token = credentials?.password;
  
      if (token) {
        const user = await axios.get(`https://mmaproject-app.fly.dev/api/users/${userId}`, {
          headers: {'authorization': `Bearer ${token}` }
        });
  
        const userPicture = user.data.data.picture;
        console.log('Recibimos imagen de usuario logeado');
        return userPicture; // Devolvemos la URL de la imagen del usuario
      } else {
        console.log('No se encontró un token en el Keychain.');
      }
    } catch (error) {
      console.error('Error al obtener la imagen del usuario:', error);
    } 
  };
    
    const getAllUsersFromDataBase = async (urlUsers) => {
      try {
        setIsLoading(true);
    
        // Obtener el token JWT del almacenamiento seguro
        const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
        const token = credentials?.password;
        
        if (token) {
          // Realizar la solicitud al servidor con el token en el encabezado de autorización
          const responseUsers = await axios.get(urlUsers, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          });
          
          console.log("RESPONSE TESTING JWT TOKEN FROM EXPRESS");
          console.log('USUARIOS RECIBIDOS');

           // Seleccionamos todos los usuarios y los seteamos 
           setUsersGlobalState(responseUsers.data.data.filter(user => user.role === "ACÓLITO"))

        } else {
          console.log('No se encontró un token en el Keychain.');
        }
      } catch (error) {
        console.log("RESPONSE ERROR TOKEN VERIFICATION");
        console.log(error);
    
        // Manejar el error, por ejemplo, verificar si es un error de token expirado
        if (error.response && error.response.status === 401) {
          // Token expirado, manejar la actualización del token aquí
          await handleTokenRefresh();
        }
      } finally {
        setIsLoading(false);
      }
    };
    
      return (
        <ImageBackground source={require("../assets/wallpaper_login.png")} style={styles.imageBackground}>
            <View>
                {/* <Text>LOGIN</Text> */}
                <StyledButton onPress={onGoogleButtonPress} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
                </StyledButton>
            </View>
        </ImageBackground>
    );
}

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 45%;
`

const Text = styled.Text`
    bottom: 260px;
    color: #4c2882;
    font-size: 50px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;
`

const StyledButton = styled.TouchableOpacity`
    background-color: rgba(171, 147, 192, 0.7);
    display: flex;
    justify-content: center;
    height: 60px;
    width: 100%;
    margin-top: 35%;
    border-radius: 60px;
    border: #7B26C4;
    align-self: center;
`

const ButtonText = styled.Text`
    color:rgba(92, 0, 172, 0.8);
    font-size: 20px;
    text-align: center;
`
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageBackground: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


export default LoginModal;