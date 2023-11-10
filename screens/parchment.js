// Pantalla de papiro 

import React, { useState, useRef } from "react";
import { ImageBackground, StyleSheet } from 'react-native'
import { Modal } from "react-native-paper";
import { Image } from "react-native-svg";
import styled from "styled-components/native";
import { CreatePotions, CreatePotionsParch } from "./CreatePotions";

const bgImageDirty = require("../assets/pergaminoEncriptado.png");
const bgImageClean = '../assets/pergaminoNOEncriptado.png';

const Parchment = ({towerBoolean}) => {
    const [isCleaned, setIsCleaned] = useState(false);     // Booleana pergamino
    const [isPotionCreated, setIsPotionCreated] = useState(false);     // Booleana pergamino
    const [isPotionModalVisible, setIsPotionModalVisible] = useState(false);

    // Funcion de limpieza de pergamino
    const cleanParchment        = () => { setIsCleaned(true) };

    const returnButton          = () => { 
        setIsCleaned(false); 
        setIsPotionCreated(false);
    };

    const potionCreation        = () => { 
        setIsPotionCreated(true);
        setIsCleaned(true); 
    };

    return(
    
    <View>
            <Modal visible = {towerBoolean} >

                {/* Cuando El pergamino Esta SUCIO */}
                {!isCleaned && (
                    <>
                    <View>
                        {/* <Image source={bgImageDirty}>  </Image> */}
                        <ImageBackground source={bgImageDirty} style={{ width: '100%', height: '100%' }}>
                            <CleanParchmentButton onPress={() => { cleanParchment(); } }>
                                <ClearParchmentText>Clean Parchment</ClearParchmentText>
                            </CleanParchmentButton>
                        </ImageBackground>
                    </View>
                    </>
                    
                )}

                {/* Cuando Sale de pergamino Sucio para CREAR POCION */}
                {isCleaned && !isPotionCreated && (
                    <>
                    <ViewPotion>
                        <CreatePotionsParch setIsPotionCreated={setIsPotionCreated}/>
                        {/* <CreatePotionButton onPress={() => { setIsPotionCreated(true) }}>
                            <CreatePotionButtonText>Create Potion</CreatePotionButtonText>
                        </CreatePotionButton> */}
                    </ViewPotion>
                        
                    </>
                )}

                    {/* Cuando EL pergamino Esta LIMPIO y la Pocion esta creada */}
                {isCleaned && isPotionCreated && (
                    <>
                    {/* <ImageBackground source={require(bgImageClean)} style={styles.container}>  */}
                
                        <CleanParchmentButtonReturn onPress={() => { returnButton()}}>
                            <ClearParchmentText>Potion. OK, volver</ClearParchmentText>
                        </CleanParchmentButtonReturn>
                        
                    {/* </ImageBackground> */}
                    </>
                )}
            </Modal>

    </View>
    )
}

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

const ImageParchment = styled.View`


`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
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