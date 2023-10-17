import React, { useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

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

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        //onGoogleButtonPress()
            // .then(() => {
            //     console.log('Signed in with Google!');
            //     // Realiza acciones después de iniciar sesión si es necesario
            // })
            // .finally(() => {
            //     setIsLoading(false);
            // });
    };

    return (
        <View>
            <Text>LOGIN</Text>
            <StyledButton onPress={handleGoogleSignIn} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
            </StyledButton>
        </View>
    );
};

export default Login;