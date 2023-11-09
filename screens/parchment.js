// Pantalla de papiro 

import React, { useState, useRef } from "react";
import { ImageBackground, StyleSheet } from 'react-native'
import { Modal } from "react-native-paper";
import styled from "styled-components/native";

const bgImageDirty = '../assets/pergaminoEncriptado.png';
const bgImageClean = '../assets/pergaminoNOEncriptado.png';

const Parchment = ({towerBoolean}) => {
    const [isCleaned, setIsCleaned] = useState(false);     // Booleana pergamino
    
    // Funcion de limpieza de pergamino
    const cleanParchment = () => { setIsCleaned(true) };

    const returnButton = () => { setIsCleaned(false) };
    


    return(
    
    <View>
            <Modal visible = {towerBoolean} >
                
                {/* Cuando El pergamino Esta SUCIO */}
                {!isCleaned && (
                <ImageBackground source={require(bgImageDirty)} style={styles.container}> 
                    <CleanParchmentButton onPress={() => { cleanParchment()}}>
                        <ClearParchmentText>Clean Parchment</ClearParchmentText>
                    </CleanParchmentButton>
                </ImageBackground>
                )}
                <>

                {/* Cuando EL pergamino Esta LIMPIO */}
                {isCleaned && (
                <ImageBackground source={require(bgImageClean)} style={styles.container}> 
                    <CleanParchmentButtonReturn onPress={() => { returnButton()}}>
                        <ClearParchmentText>Return</ClearParchmentText>
                    </CleanParchmentButtonReturn>
                </ImageBackground>
                    )}
                    </>
            </Modal>

    </View>
    )
}


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

const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Parchment;