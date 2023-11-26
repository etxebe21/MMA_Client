import React from "react";
import styled from "styled-components/native";
import IngredientesScreen from "../components/Ingredients";
import { ImageBackground, StyleSheet } from 'react-native'

const bgImage = '../assets/wallpaper_potionCreation3.png';

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
    heigth: '100%';
    top:-13px;
`

const Text = styled.Text `
    bottom: -13px;
    color: #C8A2C8;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;
    top: 20%; 
    
`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    },

    potionContainer: {
        top: '-20%',
        width: '100%', 
        height: '120%',  
      }
})




const CreatePotions = () => {

    return(
        <View>
            <ImageBackground source={require(bgImage)} style={styles.container}>             
                <Text> CREATE POTIONS </Text>
                <IngredientesScreen></IngredientesScreen>
            </ImageBackground>
        </View>
    )
}

const CreatePotionsParch = ({setIsPotionCreated}) => {

    return(
        
        <View>
            <ImageBackground source={require(bgImage)}  style={styles.potionContainer}>             
                <Text> CREATE POTIONS </Text>
                <IngredientesScreen setIsPotionCreated={setIsPotionCreated}></IngredientesScreen>
            </ImageBackground>
        </View>
    )
}


export {
    CreatePotions,
    CreatePotionsParch
}