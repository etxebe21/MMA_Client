import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);

    return (
        <StyledView>
            <TextStyled>
                Entramos en inventario
            </TextStyled>
            <Row>
                <Square disabled={true}>
                    <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                </Square>
                <Square>
                    <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                </Square>
            </Row>
            <Row>
                <Square>
                    <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                </Square>
                <Square>
                    <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                </Square>
            </Row>
        </StyledView>
    );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;  
`;

const Square = styled.View`
  flex: 1;
  margin: 10px;
  border: 2px solid black;
  opacity: 1};
`;

const TextStyled = styled.Text`
  font-size: 25px;
  color: black;
`;

const StyledView = styled.View`
  background-color: purple;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Inventory;