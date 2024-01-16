import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);

    return (
        <ImageBackground
            source={require('../assets/modal_NonEncriptedParchment.png')}
            style={{resizeMode: 'cover', justifyContent: 'center'}}
        >
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
                <Siluete source={require('../assets/cansado.jpeg')} />
                <Row1>
                    <Square>
                        <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                    </Square>
                    <Square>
                        <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                    </Square>
                </Row1>
            </StyledView>
        </ImageBackground>
    );
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width:100%;
  height:25%;
  padding:2%;
`;

const Row1 = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
  height: 20%;
`;

const Square = styled.View`
  flex: 1;
  margin: 20px;
  border: 2px solid black;
  height:70px;
  width:60px;
`;

const TextStyled = styled.Text`
  font-size: 25px;
  color: black;
`;

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Siluete = styled.Image`
  height:40%;
  width: 30%;
`;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Inventory;
