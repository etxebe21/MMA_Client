
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";
import { Context } from "../context/Context";

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
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            // console.log("PASO 1 token");
            // console.log(idToken);

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            // console.log("PASO 2 credenciales google")
            // console.log(googleCredential);

            // console.log("PASO 3 credenciales");
            await auth().signInWithCredential(googleCredential);

            // console.log("PASO 4 autenticar usuario actual");
            const idTokenResult = await auth().currentUser.getIdTokenResult();
            // console.log(idTokenResult);
            const checkToken = idTokenResult.token;

            // console.log("CHEEECK TOKEEEN");
            // console.log(checkToken);

            //const url = 'http://192.168.1.170:3000/api/users/verify-token';
            //const url = 'http://192.168.1.169:3000/api/users/verify-token'; //ETXEBE-CLASE
            //const url = 'http://192.168.0.12:3000/api/users/verify-token'; //ETXEBE-HOME
            const url = 'https://mmaproject-app.fly.dev/api/users/verify-data'; //FLY 
            const urlUsers = 'https://mmaproject-app.fly.dev/api/users';
            
            const response = await axios.post(url, {idToken:checkToken});
            const responseUsers = await axios.get(urlUsers);
            
            const {validToken, user }= response.data;
            console.log('Iniciado sesión con Google!');

            // Seteamos el usuario el cual ha iniciado sesion al estado global del user
            setUserGlobalState(user);
            
            // Seleccionamos todos los usuarios y los seteamos 
            setUsersGlobalState(responseUsers.data.data.filter(user => user.role === "ACÓLITO"))
            
            
            // El servidor debe responder con el resultado de la verificación
            //console.log('Resultado de la verificación:', validToken);
            // console.log('Usuario:', user);
            const email = user.email;
            // console.log(email);
            const role = user.role;
            // console.log(role);
            const id = user._id;

            // Guarda el correo electrónico en AsyncStorage
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
            // console.log('Crole guardado en AsyncStorage:', id);
            })
                handleSuccessfulLogin();
           
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
      };

      const getArtifactsFromDataBase = async () => {
        try {
          const url = 'https://mmaproject-app.fly.dev/api/artifacts';
          const response = await axios.get(url);
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
          
          console.log('Artefactos guardados en artifactsGlobalState:', updatedArtifacts);
        } catch (error) {
          console.error('Error al obtener artefactos:', error);
        }
      };
       // función para obtener la imagen del usuario por su ID
       const getUserImageById = async (userId) => {
        try {
          const user = await axios.get(`https://mmaproject-app.fly.dev/api/users/${userId}`);
          const userPicture = user.data.data.picture;
          console.log(userPicture);
          return userPicture; // Devolvemos la URL de la imagen del usuario
    
      } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
      }
    };
    

      return (
        <ImageBackground source={require("../assets/login3.png")} style={styles.imageBackground}>
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
    margin-top: 350%;
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
