import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Graves = () => {
  const [inventory, setInventory] = useState([]);

  const handleSquareClick = (component) => {
    setInventory((prevInventory) => {
      if (prevInventory.length < 4 && !prevInventory.includes(component)) {
        return [...prevInventory, component];
      }
      return prevInventory;
    });
  };

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);


  return (
    <StyledView style={{ flex: 1 }}>
      {/* Sección superior */}
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
        <Square onPress={() => handleSquareClick('Componente 1')} disabled={inventory.includes('Componente 1')}>
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>

        <Square onPress={() => handleSquareClick('Componente 2')} disabled={inventory.includes('Componente 2')}>
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>
      </StyledView>

      {/* Sección inferior */}
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
        <Square onPress={() => handleSquareClick('Componente 3')} disabled={inventory.includes('Componente 3')}>
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>

        <Square onPress={() => handleSquareClick('Componente 4')} disabled={inventory.includes('Componente 4')}>
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>
      </StyledView>
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

const StyledView = styled.View`
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