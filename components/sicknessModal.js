import React from "react"
import { Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const RottingPlagueApply = () => {
  console.log("Rotting Plague Applied");
}

const EpicWeaknessApply = () => {
  console.log("Epic Weakness Apply Applied");
}

const MarrowApocalypseApply = () => {
  console.log("Marrow Apocalypse Applied");
}


const SicknessModal = ({closeModal, selectedSicknessUser}) => {

  console.log("El usuario Selccionado para ser envenenado");
  console.log(selectedSicknessUser);

  const Image_background = require('../assets/fondoViejaEscuela.png');
  const Image_ClosedIcon = require('../assets/descansoAcolito.png');

  const Image_RottingPlague     = require('../assets/RottingPlague.jpeg')
  const Image_EpicWeackness     = require('../assets/EpicWeackness.jpeg')
  const Image_MarrowApocalypse  = require('../assets/MarrowApocalypse.jpeg')

  return(
      
    <MainContainer>
      <ImageBackground source={Image_background} style={styles.background}>
        
        <DisseasText>¡Elige el envenenamiento!</DisseasText>

        <ClosedButton onPress={() => closeModal(false)}>
          <Image source={Image_ClosedIcon} style={styles.disseasClosedIcon} />
        </ClosedButton>

        {/* Botones de Envenenamiento */}
        <DisseasesContainer>
          <RottingPlague onPress={() => RottingPlagueApply(false)}>
            <Image source={Image_RottingPlague} style={styles.disseasApplyIcons} />
          </RottingPlague>

          <DisseasTwo onPress={() => EpicWeaknessApply(false)}>
            <Image source={Image_EpicWeackness} style={styles.disseasApplyIcons} />
          </DisseasTwo>

          <DisseasThree onPress={() => MarrowApocalypseApply(false)}>
            <Image source={Image_MarrowApocalypse} style={styles.disseasApplyIcons} />
          </DisseasThree>
        </DisseasesContainer>
        
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
  },
  disseasApplyIcons: {
    width: 80,
    height: 80,
    backgroundColor: 'orange',
    borderRadius: 50
  }
});

const RottingPlague =  styled(TouchableOpacity)`
  background-color: yellow;
`

const DisseasTwo =  styled(TouchableOpacity)`
  background-color: orange;
`

const DisseasThree =  styled(TouchableOpacity)`
  background-color: pink;
`

const DisseasesContainer = styled.View`
  margin-top: 10%;
  display: flex;
  justify-content: row;
  align-items: center;
`

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


