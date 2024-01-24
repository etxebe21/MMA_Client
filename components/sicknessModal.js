import React from "react"
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import styled from "styled-components/native";

const SicknessModal = () => {

  const Image_background = require('../assets/fondoViejaEscuela.png');

  return(
      
    <MainContainer>
      <ImageBackground source={Image_background} style={styles.background}>
        
        <DisseasText>¡Elige el envenenamiento!</DisseasText>
        
      </ImageBackground>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  }
});

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;
`;

const DisseasText = styled.Text`
  top: 5%; 
  color: rgba(137, 59, 255,1)
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
`


export default SicknessModal;


