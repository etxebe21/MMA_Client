
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";


const Login = ({ onLogin, setLoginModalVisible}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    

    GoogleSignin.configure({
        webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
        requestProfile: true,
    });

    async function onGoogleButtonPress() {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            console.log("PASO 1 token");
            console.log(idToken);

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            console.log("PASO 2 credenciales google")
            console.log(googleCredential);

            console.log("PASO 3 credenciales");
            await auth().signInWithCredential(googleCredential);

            console.log("PASO 4 autenticar usuario actual");
            const idTokenResult = await auth().currentUser.getIdTokenResult();
            console.log(idTokenResult);
            const checkToken = idTokenResult.token;

            console.log("CHEEECK TOKEEEN");
            console.log(checkToken);
            //const url = 'http://192.168.1.170:3000/api/users/verify-token';
            //const url = 'http://192.168.1.169:3000/api/users/verify-token'; //ETXEBE-CLASE
            //const url = 'http://192.168.0.12:3000/api/users/verify-token'; //ETXEBE-HOME
            const url = 'https://mmaproject-app.fly.dev/api/users/verify-token'; //FLY 
            
            const response = await axios.post(url, {idToken:checkToken});
            const {validToken, user }= response.data;
            console.log('Iniciado sesión con Google!');
            // El servidor debe responder con el resultado de la verificación
            //console.log('Resultado de la verificación:', validToken);
            console.log('Usuario:', user);
            const email = user.email;
            console.log(email);
            const role = user.role;
            console.log(role);
            const id = user._id;

            // Guarda el correo electrónico en AsyncStorage
            await AsyncStorage.setItem('userEmail', email)
            .then(() => {
            console.log('Correo electrónico guardado en AsyncStorage:', email);
            })
            .catch(error => {
            console.error('Error al guardar el correo electrónico en AsyncStorage:', error);
            });
            await AsyncStorage.setItem('userRole', role)
            .then(() => {
            console.log('Crole guardado en AsyncStorage:', role);
            })
            
            await AsyncStorage.setItem('userID', id)
            .then(() => {
            console.log('Crole guardado en AsyncStorage:', id);
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
        onLogin(); // Llama a la función onLogin proporcionada por el componente padre (App) para establecer isAuthenticated como true
        setLoginModalVisible(false); // Cierra el modal después del inicio de sesión exitoso 
      };

    return (
        <View>
            <Text>LOGIN</Text>
            <StyledButton onPress={onGoogleButtonPress} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
            </StyledButton>
        </View>
    );
}
const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`;

const Text = styled.Text`
    bottom: -100px;
    color: #4c2882;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;
`;

const StyledButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -500px;
    width: 50%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;
`;


export default Login;