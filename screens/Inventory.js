import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);


    return (
        <StyledView>
            <Text>
                Entramos en inventario
            </Text>
        </StyledView>
    );
};

const Square = styled(TouchableOpacity)`
  flex: 1;
  margin: 10px;
  border: 2px solid black;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; // Ajustar la opacidad si está deshabilitado
`;
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

const Text = styled.Text`
font-size:25px;
color: black;
`
const StyledView = styled.View`
  background-color: "red";
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

export default Inventory