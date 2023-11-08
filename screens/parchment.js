// Pantalla de papiro 

import React from "react";
import { ImageBackground, StyleSheet } from 'react-native'
import styled from "styled-components/native";

const bgImage = '../assets/pergaminoEncriptado.png';

const Parchment = () => {
   
    return(
    
    <View>
        <ImageBackground source={require(bgImage)} style={styles.container}> 
            <ClearParchmentButton onPress={() => { console.log("Pulsado Boton Pergamino")}}>
                <ClearParchmentText>Clean Parchment</ClearParchmentText>
            </ClearParchmentButton>
        </ImageBackground>
    </View>
    )
}


const ClearParchmentText = styled.Text`
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  top: 5px;
`

const ClearParchmentButton = styled.TouchableOpacity`
  top: -150px;
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882; 
`

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null,
        backgroundColor: '#C8A2C8'
    }
})


export default Parchment;