import React, { useState, useEffect, useContext } from "react"
import { Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../context/Context";

const SicknessModal = ({closeModal, selectedSicknessUser}) => {

  // GLOBALES
  const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);

  // Images
  const Image_background = require('../assets/fondoViejaEscuela.png');
  const Image_ClosedIcon = require('../assets/descansoAcolito.png');

  const Image_RottingPlague     = require('../assets/RottingPlague.jpeg')
  const Image_EpicWeackness     = require('../assets/EpicWeackness.jpeg')
  const Image_MarrowApocalypse  = require('../assets/MarrowApocalypse.jpeg')

  // ==============================
  //    BOTONES DE ENFERMEDADES
  // ==============================

  // Le quita 75% a la INTELIGENCIA
  const RottingPlagueApply = () => {
    const sickUser = selecUserFromGlobal();
    sickUser.rotting_plague = true;
  }

  // Le quita 60% a la FUERZA
  const EpicWeaknessApply = () => {
    const sickUser = selecUserFromGlobal();
    sickUser.epic_weakness = true;
  }

  // Le quita 30% a la AGILIDAD
  const MarrowApocalypseApply = () => {
    const sickUser = selecUserFromGlobal();
    sickUser.marrow_apocalypse = true;
  }


  const selecUserFromGlobal = () => {
    const   SelectedUser = usersGlobalState.filter((user) => user._id === selectedSicknessUser._id);
    return  SelectedUser[0]
  }

  return(
      
    <MainContainer>
      <ImageBackground source={Image_background} style={styles.background}>
        
        <DisseasText>¡Elige el veneno que quieres aplicarle a {selectedSicknessUser.username}!</DisseasText>

        <ClosedButton onPress={() => closeModal(false)}>
          <Image source={Image_ClosedIcon} style={styles.disseasClosedIcon} />
        </ClosedButton>

        {/* Botones de Envenenamiento */}
        <DisseasesContainer>
          <RottingPlague onPress={() => RottingPlagueApply()}>
            <Image source={Image_RottingPlague} style={styles.disseasApplyIcons} />
          </RottingPlague>

          <DisseasTwo onPress={() => EpicWeaknessApply()}>
            <Image source={Image_EpicWeackness} style={styles.disseasApplyIcons} />
          </DisseasTwo>

          <DisseasThree onPress={() => MarrowApocalypseApply()}>
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
  margin-top: 14%;
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
  top: 10%; 
  color: rgba(137, 59, 255,1)
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
`


export default SicknessModal;


