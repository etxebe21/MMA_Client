import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../axios/axiosInstance';
import { Context } from '../context/Context';
import { socket } from '../socket/socketConnect';
import io from 'socket.io-client';

const Graves = () => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);

  useEffect(() => {
    console.log(inventory);
    getMaterialsFromDatabase();
  }, [inventory]);

  useEffect(() => {
    getMaterialsFromDatabase();
    getID();
    console.log(userId);
    console.log(materialsGlobalState);
  }, [])

  const handleSquareClick = async (material) => {
    
    if (material && material._id) {
      setInventory((prevInventory) => {
        if (prevInventory.length < 4 && !prevInventory.some(item => item._id === material._id)) {
          const newInventory = [...prevInventory, material];
          updateFoundedMaterial(material);
          return newInventory;
        }
        return prevInventory;
      });
    }
  };
  
  const getMaterialsFromDatabase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/materials';
  
      const response = await axiosInstance.get(url);
  
      const materials = response.data.data;
      console.log('Material:', materials[0]._id);
      //console.log('Datos de materiales obtenidos:', materials);
      // materials.forEach(material => {
      //   console.log('Material:', material._id);
      // });
  
      setMaterialsGlobalState(materials);
      console.log(materialsGlobalState);
    } catch (error) {
      console.error('Error al obtener datos de materiales:', error);
    }
  };
  
  const updateFoundedMaterial = async (material) => {
    try {
      const selectedMaterial = { 
        found: !material.found, 
        who: userId,
        id: material._id,
        userImage: '',
      };
  
      // Emitir el evento 'clientEvent' al servidor con los datos actualizados del artefacto
      socket.emit('updateMaterial', { selectedMaterial });
      
      // socket.on('responseMaterial', (responseData) => {
      //   console.log('Material modificado:', responseData);

      // });
      
      ToastAndroid.showWithGravity('Material recogido', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      console.error('Error al actualizar los datos del material:', error);
    }
  }

    const getID = async () => {
      try {
        const userId = await AsyncStorage.getItem('userID')
        setuserId(userId);
       
        return jsonValue != null ? JSON.parse(jsonValue) : null;
  
      } catch (e) {
      }
    };

// // Agregar la propiedad 'image' a cada objeto en el array 'materials'
// const materialsWithImages = materialsGlobalState.map((material) => ({
//   ...material,
//   image: require('../assets/descansoAcolito.png'),
// }));

return (
  <StyledView style={{ flex: 1 }}>
    <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
      {Array.isArray(materialsGlobalState) && materialsGlobalState.slice(0, 2).map((material) => (
        <Square
          key={material._id}
          onPress={() => handleSquareClick(material)}
          disabled={inventory.includes(material)}
        >
          <Image image={material.image} style={styles.image} />
        </Square>
      ))}
    </StyledView>

    <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
      {Array.isArray(materialsGlobalState) && materialsGlobalState.slice(2, 4).map((material) => (
        <Square
          key={material._id}
          onPress={() => handleSquareClick(material)}
          disabled={inventory.includes(material)}
        >
          <Image image={material.image} style={styles.image} />
        </Square>
      ))}
    </StyledView>
  </StyledView>
);

  
}
const Square = styled(TouchableOpacity)`
  flex: 1;
  margin: 35px;
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