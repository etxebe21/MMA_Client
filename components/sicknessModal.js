import React from "react"
import { View, Text } from "react-native";
import styled from "styled-components/native";

const SicknessModal = ({ }) => {

    return(
        
            <View>
                <DisseasText>¡Elige el envenenamiento!</DisseasText>
            </View>
        
    )
}

const DisseasText = styled.Text`
  top: 5%; 
  color: rgba(137, 59, 255,1)
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
`


export default SicknessModal;


