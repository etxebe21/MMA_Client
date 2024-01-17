import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);

    return (
        <ImageBackground
            source={require('../assets/wallpaper_inventory.png')}
            style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', width: '100%', height: '100%' }}
        >
            <StyledView>
                <TextStyled>
                    Entramos en inventario
                </TextStyled>

                <Row1>
                    <Square>
                        <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                    </Square>
                    <Square>
                        <Image source={require('../assets/cansado.jpeg')} style={styles.image} />
                    </Square>
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
  width: 95%;
  height: 10px;
`;

const Square = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

`;

const TextStyled = styled.Text`
  font-size: 25px;
  color: black;
`;

const StyledView = styled.View`
  flex: 1;
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
