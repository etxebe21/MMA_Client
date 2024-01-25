import React, { useState, useEffect, useContext } from "react"
import { Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../context/Context";

const SicknessModal = ({closeModal, selectedSicknessUser}) => {

  // GLOBALES
  const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);
  
  const [appliedSicknessUser, setAppliedSicknessUser] = useState([]);
  // Images
  const Image_background = require('../assets/fondoViejaEscuela.png');
  const Image_ClosedIcon = require('../assets/descansoAcolito.png');

  const Image_RottingPlague     = require('../assets/RottingPlague.jpeg')
  const Image_EpicWeackness     = require('../assets/EpicWeackness.jpeg')
  const Image_MarrowApocalypse  = require('../assets/MarrowApocalypse.jpeg')

  useEffect(() => {
    console.log("==========================") 
    console.log(appliedSicknessUser.username)
    console.log("Inteligencia: " + appliedSicknessUser.inteligencia)
    console.log("Fuerza: " + appliedSicknessUser.fuerza)
    console.log("Agilidad: " + appliedSicknessUser.agilidad)
    console.log("==========================")


  }, [appliedSicknessUser]);
    
  // ==============================
  //    BOTONES DE ENFERMEDADES
  // ==============================

  const RottingPlagueApply = () => {
    const sickUser = selecUserFromGlobal();
    
    if (!sickUser.rotting_plague){
      sickUser.rotting_plague = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES
      
      setAppliedSicknessUser(appliedSickness("rotting_plague", sickUser))
    }  
  }

  const EpicWeaknessApply = () => {
    const sickUser = selecUserFromGlobal();

    if (!sickUser.epic_weakness){
      sickUser.epic_weakness = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES 
      
      setAppliedSicknessUser(appliedSickness("epic_weakness", sickUser))
    }  
  }

  const MarrowApocalypseApply = () => {
    const sickUser = selecUserFromGlobal();
    
    if (!sickUser.marrow_apocalypse){
      sickUser.marrow_apocalypse = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES
      setAppliedSicknessUser(appliedSickness("marrow_apocalypse", sickUser))
    }
  }


  const selecUserFromGlobal = () => {
    const   SelectedUser = usersGlobalState.filter((user) => user._id === selectedSicknessUser._id);
    return  SelectedUser[0]
  }

  const appliedSickness = (sickness, sickUser) => {
    switch (sickness) {
      
      // Le quita 75% a la INTELIGENCIA
      case "rotting_plague":
        sickUser.inteligencia = Math.floor((sickUser.inteligencia * 75) / 100)
        break;

      // Le quita 60% a la FUERZA
      case "epic_weakness":
        sickUser.fuerza = Math.floor((sickUser.fuerza * 60) / 100)
        break;

      // Le quita 30% a la AGILIDAD
      case "marrow_apocalypse":
        sickUser.agilidad = Math.floor((sickUser.agilidad * 30) / 100)
        break;

      default:
        console.log("no applied")
        break;
    }

    return sickUser
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


