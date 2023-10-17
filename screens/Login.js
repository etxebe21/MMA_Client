import React from "react";
import styled from "styled-components/native";

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`
const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
`
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
`


const Login = () => {
    return (
        <View>
            <Text>LOGIN</Text>
            <StyledButton onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                <ButtonText>Google Sign-In</ButtonText>
            </StyledButton>
        </View>
    );
};

export default Login;