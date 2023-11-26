import React, { useState } from "react";
import {  ImageBackground, StyleSheet } from 'react-native';
import { Modal } from "react-native-paper";
import styled from "styled-components/native";
import { CreatePotionsParch } from "./CreatePotions";
import Icon from 'react-native-vector-icons/FontAwesome';

const bgImageDirty = require("../assets/pergaminoEncriptado.png");
const bgImageClean = require("../assets/pergaminoNOEncriptado.png"); // Corregido

const Parchment = ({ towerBoolean }) => {
  const [isCleaned, setIsCleaned] = useState(false);
  const [isPotionCreated, setIsPotionCreated] = useState(false);
  const [isEnteringTower, setIsEnteringTower] = useState(false);

  const cleanParchment = () => {
    setIsCleaned(true);
  };

  const returnButton = () => {
    setIsCleaned(false);
    setIsPotionCreated(false);
    setIsEnteringTower(false);
  };

  const potionCreation = () => {
    setIsPotionCreated(true);
    setIsCleaned(true);
  };

  return (
    <View>
      <Modal visible={towerBoolean}>
      <>
        {!isCleaned && (
          <ImageBackground source={bgImageDirty} style={styles.parchment}>
            <CleanParchmentButton onPress={() => cleanParchment()}>
              <ClearParchmentText>CLEAN PARCHMENT</ClearParchmentText>
            </CleanParchmentButton>
          </ImageBackground>
        )}
        </>
    

        {isCleaned && !isPotionCreated && (
          <ViewPotion>
            <CreatePotionsParch  setIsPotionCreated={setIsPotionCreated} />
          </ViewPotion>
        )}

        {isCleaned && isPotionCreated && (
            
          <ImageBackground source={bgImageClean} style={styles.parchment}>
            {/* <CloseButton onPress={() => returnButton()}>
                <Icon name="times" size={60} color="#4c2882" />
            </CloseButton> */}
           
              <ClearParchmentCleanText>Este pergamino recoge la historia de la leyenda de la armadura épica: 
                                        un artefacto de brillo dorado necesario para acceder a la tumba Espectral, 
                                        lugar donde residen los 4 jinetes.
              </ClearParchmentCleanText>   
              <ClearParchmentCleanText>   
                                        La armadura se perdió en la 2ª Era, pero se conservan aún manuales de cómo se llegó a forjar. 
                                        Cada una de las piezas necesarias para su construcción descansa en una tumba del Obituario. 
                                        El problema es que la entrada permanece sellada por el rosetón de los 4 artefactos arcanos 
                                        necesarios para desbloquearla.
              </ClearParchmentCleanText>
              <ClearParchmentCleanText>      
                                        Los artefactos se perdieron a lo largo de la ciénaga, pero poco más se sabe. 
                                        El único material disponible es un viejo manuscrito con un mapa de la zona. 
                                        Sin embargo, a excepción de unos números extraños, no incluye detalles relevantes. 
                                        Nadie ha logrado comprender su significado, pero podrían indicar el paradero de los artefactos.
              </ClearParchmentCleanText>   
          </ImageBackground>
        )}
        </Modal>
    </View>
  );
};
const ViewPotion = styled.View`
    backgroundcolor: #000000;
    height: 95%;
    width:  100%
`

const ParchmentView = styled.View`
    bottom: -50px;
    width: 350px;
    height: 350px;
    align-self: center;
    background: #4c2882;
    border-radius: 30px; 
`

const CreatePotionButtonText = styled.Text`
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  top: 5px;
`

const CreatePotionButton = styled.TouchableOpacity`
  top: 12px;
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882;
`

const ClearParchmentText = styled.Text`
  top: 15px;
  fontSize: 28px;
  opacity: 1;
  color: #4c2882; 
  align-self: center;
  fontFamily: 'Creepster';
`
const ClearParchmentCleanText = styled.Text`
  fontSize: 15px;
  padding: 5%;
  color: #000000; 
  align-self: center;
  top: 15%
`

const CleanParchmentButton = styled.TouchableOpacity`
  top: 300px;
  background: #A3A2A2;
  opacity: 0.95;
  width: 180px;
  height: 65px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882;
`

const CleanParchmentButtonReturn = styled.TouchableOpacity`
  top: 510px;
  background: #CCCCCC;
  width: 180px;
  height: 80px;
  align-self: center;
  border-radius: 40px;
  border: #4c2882;
`
const CloseButton = styled.TouchableOpacity`
  position: 'absolute';            
  top: 50px;
  marginLeft: 330px;
`
const View = styled.View`
    flex: 1;

`

const ImageParchment = styled.View`


`
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100',
      height: '100',
    },

    parchment: {
      top: -40,
      width: 400, 
      height: 800,  
    }

  });
  

const Text = styled.Text `
    bottom: 100px;
    color: white;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Parchment;