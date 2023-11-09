// Pantalla de papiro 

import React, { useState, useRef } from "react";
import { ImageBackground, StyleSheet } from 'react-native'
import { Modal } from "react-native-paper";
import { Image } from "react-native-svg";
import styled from "styled-components/native";
import CreatePotions from "./CreatePotions";

const bgImageDirty = '../assets/pergaminoEncriptado.png';
const bgImageClean = '../assets/pergaminoNOEncriptado.png';

const Parchment = ({towerBoolean}) => {
    const [isCleaned, setIsCleaned] = useState(false);     // Booleana pergamino
    const [isPotionCreated, setIsPotionCreeated] = useState(false);     // Booleana pergamino
    
    // Funcion de limpieza de pergamino
    const cleanParchment        = () => { setIsCleaned(true) };

    const returnButton          = () => { 
        setIsCleaned(false); 
        setIsPotionCreeated(false);
    };

    const potionCreation        = () => { 
        setIsPotionCreeated(true);
        setIsCleaned(true); 
    };

    return(
    
    <View>
            <Modal visible = {towerBoolean} >

                {/* Cuando El pergamino Esta SUCIO */}
                {!isCleaned && (
                    <>
                    <View>
                        <Image source={require('../assets/newPotion.png')} />
                        {/* <ImageBackground source={require(bgImageDirty)} style={styles.container}> */}
                            <CleanParchmentButton onPress={() => { cleanParchment(); } }>
                                <ClearParchmentText>Clean Parchment</ClearParchmentText>
                            </CleanParchmentButton>
                        {/* </ImageBackground> */}
                    </View>
                    </>
                    
                )}

                {/* Cuando Sale de pergamino Sucio para CREAR POCION */}
                {isCleaned && !isPotionCreated && (
                    <>
                    <ImageBackground source={require(bgImageClean)} style={styles.container}> 
                    {/* 
                        Sacar modal de creacion de pociones, darle al boton cuando esten los dos ingredientes, hacer una comprobacion 
                        y cambiar de modal con el boton.  
                    */}
                    <CreatePotions>AAAA</CreatePotions>
                        <CreatePotionButton onPress={() => { potionCreation()}}>
                            <CreatePotionButtonText>Create Potion</CreatePotionButtonText>
                        </CreatePotionButton>
                    </ImageBackground>
                    </>
                )}

                    {/* Cuando EL pergamino Esta LIMPIO y la Pocion esta creada */}
                {isCleaned && isPotionCreated && (
                    <>
                    <ImageBackground source={require(bgImageClean)} style={styles.container}> 
                
                        <CleanParchmentButtonReturn onPress={() => { returnButton()}}>
                            <ClearParchmentText>Return2</ClearParchmentText>
                        </CleanParchmentButtonReturn>
                        
                    </ImageBackground>
                    </>
                )}
            </Modal>

    </View>
    )
}

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
  top: 120px;
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
  top: 5px;
`

const CleanParchmentButton = styled.TouchableOpacity`
  top: 220px;
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882;
`

const CleanParchmentButtonReturn = styled.TouchableOpacity`
  top: -200px;
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882;
`

const View = styled.View`
    flex: 1;

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

const Text = styled.Text `
    bottom: 100px;
    color: white;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Parchment;