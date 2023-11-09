import { ImageBackground, StyleSheet } from 'react-native'
import styled from "styled-components/native";
import Parchment from "./Parchment";
import React, { useState, useEffect } from "react";


const bgImage = '../assets/fondoTorreon.png';

const Torreon = () => {
    
    // Aqui coge el dato de si esta o no en el torreon (Lo he puesto a true todo el rato)
    const [isInTower, setIsInTower] = useState(); 

    useEffect(() => { 
        setIsInTower(true) }, []); 


    return(
    
    <View>
     <ImageBackground source={require(bgImage)} style={styles.container}>    
        <Parchment towerBoolean={isInTower}/> 
        </ImageBackground>
    </View>
    )
}

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