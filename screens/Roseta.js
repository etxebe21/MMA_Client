import React from "react";
import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from 'react-native'

const bgImage = require('../assets/roseta.png');


const Roseta = () => { 

    return(
        <View>
            <BackgroundImage source= {bgImage}></BackgroundImage>
        </View>
    )


}

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

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  resizeMode: cover;
  justify-content: center;
  opacity:0.8
  `
export default Roseta;