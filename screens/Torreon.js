import { ImageBackground, StyleSheet } from 'react-native'
import styled from "styled-components/native";
import Parchment from "./Parchment";
import React, { useState, useEffect } from "react";


const bgImage = '../assets/fondoTorreon.png';

const Torreon = () => {
    
    // Aqui coge el dato de si esta o no en el torreon (Lo he puesto a true todo el rato)
    const [isInTower, setIsInTower] = useState(); 
    const [isEnteringTower, setIsEnteringTower] = useState(false);
    const [botonTowerVisible, setBotonTowerVisible] = useState(true);

    const ocultarBoton = () => { setBotonTowerVisible(false) };
    
    const enteringTowerButton = () => { setIsEnteringTower(true); ocultarBoton(); };


    useEffect(() => { 
        setIsInTower(true) 
    }, []); // Lo deberia de poner segun el get del usuario que hagamos tras scaneo


    return(
    
    <View>
     <ImageBackground source={require(bgImage)} style={styles.container}> 
        {isInTower && (   
            <>
            {botonTowerVisible && <EnterTowerButton onPress={() => { enteringTowerButton()} }>
                    <EnterTowerButtonText> Enter Tower </EnterTowerButtonText>
                </EnterTowerButton> }
                <Parchment towerBoolean={isInTower && isEnteringTower}/> 
            </>
        )}
        </ImageBackground>
    </View>
    )
}

const EnterTowerButtonText = styled.Text`
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  top: 5px;
`

const EnterTowerButton = styled.TouchableOpacity`
  top: 220px;
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

const Text = styled.Text `
    bottom: -8px;
    color: #4c2882;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const TorreonView = styled.View`
    bottom: -50px;
    width: 350px;
    height: 420px;
    align-self: center;
    background: #4c2882;
    border-radius: 30px; 
` 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    }
})


export default Torreon;