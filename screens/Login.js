
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";
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

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: '769950438406-81ot6untouj1ra9k35s1b6ip4bnjnspo.apps.googleusercontent.com',
        
    });

    async function onGoogleButtonPress() {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            console.log(idToken);
           
            try {
                const response = await axios.post("http://localhost:3000/api/workouts/verify-token",{ idToken });
                console.log("Response:", response.data);
              } catch (error) {
                console.error("Error:", error);
              }
            
              // console.log('Resultado de la verificación:', response.data);
              
              console.log('Iniciado sesión con Google!');
        } catch (error) {
            // Manejar errores aquí
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <View>
            <Text>LOGIN</Text>
            <StyledButton onPress={onGoogleButtonPress} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
            </StyledButton>
        </View>
    );
}

export default Login;