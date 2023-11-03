import React , {useState, useEffect} from "react";
import styled from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Login from "./Login";
import { Modal , StyleSheet} from "react-native";


const Mortimer = () => {
   
    

    return(
        <View>
            <Text>ACÓLITOS</Text> 
        </View>  
    )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C8A2C8',
    },
  });
  
const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`
const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const SignOutButton = styled.TouchableOpacity`
    background-color: #FF0000;
    padding: 10px 20px;
    bottom: -400px;
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

export default Mortimer;