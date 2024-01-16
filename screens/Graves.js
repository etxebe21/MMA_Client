import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Graves = () => {
  const [inventory, setInventory] = useState([]);

  const handleSquareClick = (component) => {
    setInventory((prevInventory) => [...prevInventory, component]);
  };

  return (
    <View style={{ flex: 1 }}>
    {/* Sección superior */}
    <View style={{ flex: 0.5, flexDirection: 'row' }}>
      <Square onPress={() => handleSquareClick('Componente 1')}>
        <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
      </Square>

      <Square onPress={() => handleSquareClick('Componente 2')}>
        <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
      </Square>
    </View>

    {/* Sección inferior */}
    <View style={{ flex: 0.5, flexDirection: 'row' }}>
      <Square onPress={() => handleSquareClick('Componente 3')}>
        <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
      </Square>

      <Square onPress={() => handleSquareClick('Componente 4')}>
        <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
      </Square>
    </View>
  </View>
);
};


const Square = styled(TouchableOpacity)`
  width: 130px;
  height: 150px;
  margin: 35px;
  border: 2px solid black;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

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