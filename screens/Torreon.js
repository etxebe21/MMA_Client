import { ImageBackground, StyleSheet } from 'react-native'
import styled from "styled-components/native";
import Parchment from "./parchment";
import React, { useState, useEffect, useContext } from "react";
import { CreatePotions, CreatePotionsParch } from './CreatePotions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/Context';

const bgImage = '../assets/wallpaper_tower.png';

const Torreon = () => {
    
    const { userGlobalState, handleUserGlobalState } = useContext(Context) 

    // Aqui coge el dato de si esta o no en el torreon (Lo he puesto a true todo el rato)
    const [isInTower, setIsInTower] = useState(); 
    const [isEnteringTower, setIsEnteringTower] = useState(false);
    const [botonTowerVisible, setBotonTowerVisible] = useState(true);

    const ocultarBoton = () => { setBotonTowerVisible(false) };
    
    const enteringTowerButton = () => { setIsEnteringTower(true); ocultarBoton(); setIsInTower(false)};


    useEffect(() => { 
        setIsInTower(true) 
    }, []); // Lo deberia de poner segun el get del usuario que hagamos tras scaneo


    return(
    
    <View>
        <ImageBackground source={require(bgImage)} style={styles.container}> 
            {isInTower && (   
                <>
                <Text>Press the door</Text>
                {botonTowerVisible && <EnterTowerButton onPress={() => { enteringTowerButton()} }>
                                </EnterTowerButton> }
                        {/* <EnterTowerButtonText> Enter Tower </EnterTowerButtonText> */}
                </>
            )}

            {isEnteringTower && (
            <ViewPotion>
                <Parchment towerBoolean={isEnteringTower}/> 
                {/* <CreatePotionsParch  /> */}
            </ ViewPotion>
                
            )}
        </ImageBackground>
    </View>
    )
}

const Entry = styled.Text`
  fontSize: 25px;
  color: #ffffff; 
  align-self: center;
  top: 5px;
  left:40px;
  font-weight: bold;
  font-family: 'Tealand';
`
const EnterTowerButtonText = styled.Text`
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  top: 5px;
`

const EnterTowerButton = styled.TouchableOpacity`
  width: 100%;
  height: 20%;
  margin-top: 80%;
  align-items: center;
  border-radius: 100px;
  border: #4c2882;
  opacity: 0;
  backgroundcolor: #DDDDDD;
`

const View = styled.View`
    flex: 1;
    background: #000000;
`

const ViewPotion = styled.View`
    backgroundcolor: #000000;
    height: 100%;
    width:  100%
`

const Text = styled.Text `
    color: white;
    font-size: 24px;
    font-weight: bold;
    font-family: Creepster
    letter-spacing: -0.3px;

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
    },

    arrowIcon: {
        position: 'absolute', 
        right: 95,
        top: 280, 
    },
})


export default Torreon;