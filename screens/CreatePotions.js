import React from "react";
import styled from "styled-components/native";
import IngredientesScreen from "../components/Ingredients";
import { ImageBackground, StyleSheet } from 'react-native'

const bgImage = '../assets/wallpaper_potionCreation.png';


const CreatePotionsParch = ({setIsPotionCreated}) => {

    return(
        
        <View>
            <ImageBackground source={require(bgImage)}  style={styles.potionContainer}>             
                <TitleText> CREATE POTIONS </TitleText>
                <IngredientesScreen setIsPotionCreated={setIsPotionCreated}></IngredientesScreen>
            </ImageBackground>
        </View>
    )
}

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
    heigth: '100%';
`

const TitleText = styled.Text`
    bottom: -13px;
    color: #C8A2C8;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;
    font-family: 'Tealand';

`

const styles = StyleSheet.create({
    potionContainer: {
        width: '100%', 
        height: '100%',
        backgroundColor: 'red'  
      },

})


export {
    CreatePotionsParch
}