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
        {/* <TextStyled>
            Entramos en inventario
        </TextStyled> */}

        <DivCentral>
          <TextStyled> Entramos dentro deeeeee </TextStyled>

          <CajaMateriales>
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
          </CajaMateriales>

        </DivCentral>
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

const CajaMateriales = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 95%;
  height: 100px;
  background-color: red;
`;

const DivCentral = styled.View`
  display: flex
  align-items: center
  justify-content: center;
  width: 95%;
  height: 50%;
  background-color: blue;
`;

const Div2 = styled.View`
  display: flex
  align-items: center
  justify-content: center;
  width: 95%;
  height: 40px;
  background-color: pink;
`;

const Div3 = styled.View`
  display: flex
  align-items: center
  justify-content: center;
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
  color: purple;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
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
