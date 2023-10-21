import React from "react";
import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from 'react-native'

const bgImage = '../assets/wallpaper_potionCreation3.png';

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
    heigth: 100%;
`

const Text = styled.Text `
    bottom: 350;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
    
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


const CreatePotions = () => {

    return(
        
        < View>
            <ImageBackground source={require(bgImage)} style={styles.container}>
                    
                    <Text> CREATE POTIONS </Text>

            </ImageBackground>
        </View>
    )
}



export default CreatePotions;