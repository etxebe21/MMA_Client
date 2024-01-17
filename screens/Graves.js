import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../axios/axiosInstance';
import { Context } from '../context/Context';
import { socket } from '../socket/socketConnect';

import descansoAcolitoImage from '../assets/descansoAcolito.png';

const Graves = () => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  const [localMaterials, setLocalMaterials] = useState([]); // Nuevo estado local

  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);
  const { artifactsGlobalState, setArtefactsGlobalState } = useContext(Context);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  useEffect(() => {
    getMaterialsFromDatabase();
    getID();
    console.log(userId);
  }, [])

  useEffect(() => {
    console.log(localMaterials);
  }, [localMaterials]);
  
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
      const materialsData = await axiosInstance.get('https://mmaproject-app.fly.dev/api/materials');
  
        const materials = materialsData.data.data;
        console.log('MATERIAAAAAAAA', materials)
        console.log('Material:', materials[0]._id);
      //setMaterialsGlobalState(materials);
      setLocalMaterials(materials); 
      //setArtefactsGlobalState(materials);
        // Actualizar los artefactos con la imagen del usuario
        const updatedMaterials = await Promise.all(
          materials.map(async (material) => {
            if (material.found) {
              const userImage = await getUserImageById(material.who);
              return { ...material, userImage };
            }
            return material;
          })
        );
        // setMaterialsGlobalState(updatedMaterials);
        console.log('Materiales guardados en localMaterials', localMaterials);
        //console.log('Materiales guardados en globalState', artifactsGlobalState);

    } catch (error) {
      console.error('Error al obtener datos de materiales:', error);
    }
  };
  
  const updateFoundedMaterial = async (material) => {
    try {
      const selectedMaterial = { 
        found: true, 
        who: userId,
        id: material._id,
        userImage: '',
      };
  
      // Emitir el evento 'clientEvent' al servidor con los datos actualizados del artefacto
      socket.emit('updateMaterial', { selectedMaterial });
      
      // socket.on('responseMaterial', (responseData) => {
      // console.log('Material modificado:', responseData);
      // });
      console.log('Materiales guardados en globalState', localMaterials)
      
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


  // función para obtener la imagen del usuario por su ID
  const getUserImageById = async (userId) => {
    try {
        const user = await axiosInstance.get(`https://mmaproject-app.fly.dev/api/users/${userId}`);
  
        const userPicture = user.data.data.picture;
        console.log('Recibimos imagen de usuario que recoje artefacto');
        return userPicture; // Devolvemos la URL de la imagen del usuario
    } catch (error) {
      console.error('Error al obtener la imagen del usuario:', error);
    } 
  };

return (
  <StyledView style={{ flex: 1 }}>
    <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
    {localMaterials != null &&
      localMaterials.slice(0, 2).map((material) => (
        <Square
          key={material._id}
          onPress={() => handleSquareClick(material)}
          disabled={material.found || inventory.includes(material)}
        >
          <Image source={descansoAcolitoImage} style={styles.image} />
        </Square>
      ))}
    </StyledView>

    <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
    {localMaterials != null &&
      localMaterials.slice(2, 4).map((material) => (
        <Square
          key={material._id}
          onPress={() => handleSquareClick(material)}
          disabled={material.found || inventory.includes(material)}
        >
          <Image source={descansoAcolitoImage} style={styles.image} />
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
opacity: ${(props) => (props.disabled ? 0.3 : 1)};
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