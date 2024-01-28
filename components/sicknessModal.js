import React, { useState, useEffect, useContext } from "react"
import { Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid } from "react-native";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect'
import Icon from 'react-native-vector-icons/FontAwesome';

const SicknessModal = ({closeModal, selectedSicknessUser}) => {

  // GLOBALES
  const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);
  
  // LOCALES
  // const [appliedSicknessUser, setAppliedSicknessUser] = useState([]);
  const [acolitos, setAcolitos] = useState([]);
  
  // IMAGES
  const Image_background  = require('../assets/wallpaper_sicknessModal.png');
  const Image_ClosedIcon  = require('../assets/descansoAcolito.png');
  const Image_Marco       = require('../assets/marco_enfermedades.png');

  const Image_RottingPlague     = require('../assets/RottingPlague.jpeg')
  const Image_EpicWeackness     = require('../assets/EpicWeackness.jpeg')
  const Image_MarrowApocalypse  = require('../assets/MarrowApocalypse.jpeg')

  // useEffect(() => {
  //   console.log("==========================") 
  //   console.log(appliedSicknessUser.username)
  //   console.log("Inteligencia: " + appliedSicknessUser.inteligencia)
  //   console.log("Fuerza: " + appliedSicknessUser.fuerza)
  //   console.log("Agilidad: " + appliedSicknessUser.agilidad)
  //   console.log("==========================")


  // }, [appliedSicknessUser]);

  useEffect(() => {
    setAcolitos(usersGlobalState.filter(user => user.role === "ACÓLITO"));
  }, [usersGlobalState]);

    
  // ==============================
  //    BOTONES DE ENFERMEDADES
  // ==============================

  const RottingPlagueApply = () => {
    const sickUser = selecUserFromGlobal();
    
    if (!sickUser.rotting_plague){
      sickUser.rotting_plague = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES
      
      appliedSickness("rotting_plague", sickUser)
    }  
  }

  const EpicWeaknessApply = () => {
    const sickUser = selecUserFromGlobal();

    if (!sickUser.epic_weakness){
      sickUser.epic_weakness = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES 
      
      appliedSickness("epic_weakness", sickUser)
    }  
  }

  const MarrowApocalypseApply = () => {
    const sickUser = selecUserFromGlobal();
    
    if (!sickUser.marrow_apocalypse){
      sickUser.marrow_apocalypse = true;

      // FALTA EMITIR LA BOOLEANA DE ENFERMEDADES
      appliedSickness("marrow_apocalypse", sickUser)
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
        console.log("Entra en Rotting Plague")
        const rottingPlague = {
          id: sickUser._id,
          inteligencia: Math.max(5, Math.ceil(sickUser.inteligencia * 0.75)),
          rotting_plague: true,
        };

        const updatedAcolitos1 = acolitos.map(user =>
          user._id === rottingPlague.id ? { ...user, rotting_plague: true } : user
        );

        setAcolitos(updatedAcolitos1);
        socket.emit('RottingPlague', rottingPlague);
        break;

      // Le quita 60% a la FUERZA
      case "epic_weakness":
        console.log("Entra en Epic Weakness")
        const epicWeakness = {
          id: sickUser._id,
          fuerza: Math.max(5, Math.ceil(sickUser.fuerza * 0.6)),
          epic_weakness: true,
        };

        const updatedAcolitos2 = acolitos.map(user =>
          user._id === epicWeakness.id ? { ...user, epic_weakness: true } : user
        );

        setAcolitos(updatedAcolitos2);
        socket.emit('EpicWeakness', epicWeakness);
        break;

      // Le quita 30% a la AGILIDAD
      case "marrow_apocalypse":
        console.log("Entra en Marrow Apocalypse")
        const marrowApocalypse = {
          id: sickUser._id,
          agilidad: Math.max(5, Math.ceil(sickUser.agilidad * 0.3)),
          marrow_apocalypse: true,
        };

        const updatedAcolitos3 = acolitos.map(user =>
          user._id === marrowApocalypse.id ? { ...user, marrow_apocalypse: true } : user
        );

        setAcolitos(updatedAcolitos3);
        socket.emit('MarrowApocalypse', marrowApocalypse);
        break;

      default:
        console.log("no applied")
        break;
    }
    
    ToastAndroid.showWithGravity('ENFERMEDAD: ' + sickness +  ' INVOCADA', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  return(
      
    <MainContainer>
      <ImageBackground source={Image_background} style={styles.background}>
        
        <DisseasText>¡Elige el veneno que quieres aplicarle a {selectedSicknessUser.username}!</DisseasText>

        <ClosedButton onPress={() => closeModal(false)}>
          <Icon name="times" size={50} color="#4c2882" />
        </ClosedButton>

        {/* Botones de Envenenamiento */}
        <DisseasesContainer>
          <ImageBackground source={Image_Marco} style={styles.marcoPotion} >

            <RottingPlague onPress={() => RottingPlagueApply()}>
              <Image source={Image_RottingPlague} style={styles.disseasApplyIcons} />
            </RottingPlague>
  
            <DisseasTwo onPress={() => EpicWeaknessApply()}>
              <Image source={Image_EpicWeackness} style={styles.disseasApplyIcons} />
            </DisseasTwo>

            <DisseasThree onPress={() => MarrowApocalypseApply()}>
              <Image source={Image_MarrowApocalypse} style={styles.disseasApplyIcons} />
            </DisseasThree>

          </ImageBackground>
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
    width: 50,
    height: 50,
    backgroundColor: 'orange'
  },
  disseasApplyIcons: {
    width: 120,
    height: 120,
    borderRadius: 50
  },
  marcoPotion: {
    marginTop: '-30%',
    width: '100%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const RottingPlague =  styled(TouchableOpacity)`
  margin-top: -7%;
  // background-color: yellow;
`

const DisseasTwo =  styled(TouchableOpacity)`
  margin-top: 5%;
  // background-color: orange;
`

const DisseasThree =  styled(TouchableOpacity)`
  margin-top: 5%;
  // background-color: pink;
`

const DisseasesContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  
`

const ClosedButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25%;
  position: 'absolute';            
  marginLeft: 280px;
  width:  ${Dimensions.get('window').height * 0.12}px;
  height: ${Dimensions.get('window').height * 0.10}px;
`;

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DisseasText = styled.Text`
  top: 10%; 
  color: rgba(137, 59, 255,1)
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
  font-size: 22px;
  text-shadow: 2px 2px 3px blue;
`


export default SicknessModal;


