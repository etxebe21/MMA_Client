import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet, Text, ToastAndroid } from "react-native";
import axios from 'axios';

const Graves = () => {
  return (
  <View >
    <GravesText> PRUEBA </GravesText>
  </View>
    
  )
}

const View = styled.View`
  background-color: rgba(255,255,255,1)
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%;
`

const GravesText = styled.Text`
  color: white;
  font-family: Tealand;
  text-shadow: 3px 3px 4px black;
  font-size: 20px;
  margin-top: 1%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Graves