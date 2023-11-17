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
          <ImageBackground source={bgImageDirty} style={{width: 395, height: 660  }}>
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
            
          <ImageBackground source={bgImageClean} style={{width: 395, height: 660  }}>
            <CloseButton onPress={() => returnButton()}>
                <Icon name="times" size={60} color="#4c2882" />
            </CloseButton>
           
              <ClearParchmentCleanText>PARCHMENT CLEANED!</ClearParchmentCleanText>   
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
    height: 350x;
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
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  fontFamily: 'Creepster';
`
const ClearParchmentCleanText = styled.Text`
  fontSize: 45px;
  color: #000000; 
  align-self: center;
  top: 200px;
`

const CleanParchmentButton = styled.TouchableOpacity`
  top: 300px;
  background: #CCCCCC;
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
    // Otros estilos...
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