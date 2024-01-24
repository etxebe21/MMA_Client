import React from "react"
import { Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const SicknessModal = ({closeModal}) => {

  const Image_background = require('../assets/fondoViejaEscuela.png');
  const Image_ClosedIcon = require('../assets/descansoAcolito.png');

  return(
      
    <MainContainer>
      <ImageBackground source={Image_background} style={styles.background}>
        
        <DisseasText>¡Elige el envenenamiento!</DisseasText>

        <ClosedButton onPress={() => closeModal(false)}>
          <Image source={Image_ClosedIcon} style={styles.disseasClosedIcon} />
        </ClosedButton>
        
      </ImageBackground>
    </MainContainer>
  )
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  disseasClosedIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'orange'
  }
});

const ClosedButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  width:  ${Dimensions.get('window').height * 0.12}px;
  height: ${Dimensions.get('window').height * 0.10}px;
`;

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


