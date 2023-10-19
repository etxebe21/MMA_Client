

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
        webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        setIsLoading(true); // Cambiar a true al iniciar la acción
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
            // Realiza acciones después de iniciar sesión si es necesario
            console.log('Iniciado sesión con Google!');
        } catch (error) {
            // Manejar errores aquí
            console.error(error);
        } finally {
            setIsLoading(false); // Cambiar a false cuando la acción esté completa
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
};

export default Login;