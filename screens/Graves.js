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
        <Square
          onPress={() => handleSquareClick('Celestial Etherweave')}
          disabled={inventory.includes('Celestial Etherweave')}
        >
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>

        <Square
          onPress={() => handleSquareClick('Dragonheart Crystals')}
          disabled={inventory.includes('Dragonheart Crystals')}
        >
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>
      </StyledView>

      {/* Sección inferior */}
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
        <Square
          onPress={() => handleSquareClick('Sylvan Moonshard Essence')}
          disabled={inventory.includes('Sylvan Moonshard Essence')}
        >
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>

        <Square
          onPress={() => handleSquareClick('Abyssal Voidsteel Ingots')}
          disabled={inventory.includes('Abyssal Voidsteel Ingots')}
        >
          <Image source={require('../assets/descansoAcolito.png')} style={styles.image} />
        </Square>
      </StyledView>
    </StyledView>
  );
};

const Square = styled(TouchableOpacity)`
  flex: 1;
  margin: 30px;
  width: 100px;
  border: 2px solid black;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; 
  background-color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'transparent')}; 
  height: 200px; 
  width: 100px;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const StyledView = styled.View`
  background-color: rgba(255, 255, 255, 1);
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;


export default Graves;