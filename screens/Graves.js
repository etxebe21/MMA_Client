import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image, Text, ToastAndroid, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../axios/axiosInstance';
import { Context } from '../context/Context';
import { socket } from '../socket/socketConnect';

import descansoAcolitoImage from '../assets/wallpaper_profile.png';
import graveImage from '../assets/La_Hermandad_Icon.png';

const Graves = () => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  const [localMaterials, setLocalMaterials] = useState([]); // Nuevo estado local
  const [initialMaterials, setInitialMaterials] = useState([]);

  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);
  const { artifactsGlobalState, setArtefactsGlobalState } = useContext(Context);
    const { userGlobalState, setUserGlobalState } = useContext(Context);


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
    setInitialMaterials(localMaterials);
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
  
      console.log('material recogido', material);
      foundedMaterial(material); // Llamamos a foundedMaterial después de que material se haya definido
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

  const restablecerValores = () => {
    setInventory([]); // Restablecer el inventario
    setLocalMaterials(initialMaterials); // Restablecer los materiales locales
  };

  const foundedMaterial = async (material) => {
    try {
      const updatedInventory = [...inventory, material];
  
      const newData = {
        inventory: updatedInventory,
      };
  
      const response = await axiosInstance.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${userId}`, newData);
  
      // Actualizar el estado local con la respuesta del servidor (si es necesario)
      setUserGlobalState((prevUserGlobalState) => ({
        ...prevUserGlobalState,
        insideTower: !prevUserGlobalState.insideTower,
      }));
  
      // Actualizar el estado local del inventario
      setInventory(updatedInventory);
  
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };
  

return (
  <ImageBackground source={descansoAcolitoImage} style={{ flex: 1 }}>
  <TextStyled> LAS CUATRO TUMBAS </TextStyled>
    <StyledView style={{ flex: 1, justifyContent: 'space-between'  }}>
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
      {localMaterials != null &&
        localMaterials.slice(0, 2).map((material) => (
          <Square
            key={material._id}
            onPress={() => handleSquareClick(material)}
            disabled={material.found || inventory.includes(material)}
          >
            <Image source={graveImage} style={styles.image} />
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
            <Image source={graveImage} style={styles.image} />
          </Square>
        ))}
      </StyledView>
    </StyledView>
    
        <Buttons onPress={restablecerValores}>
          <ButtonsText>RESET</ButtonsText>
        </Buttons>
      
  </ImageBackground>
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
flex: 1;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`;

const ButtonsText = styled.Text`
  fontSize: 28px;
  font-family: 'Tealand';
  color: #4c2882; 
  align-self: center;
  top:17px;
`
const Buttons = styled.TouchableOpacity`
  background: #A3A2A2;
  opacity: 0.95;
  width: 180px;
  height: 65px;
  align-self: center;
  border-radius: 30px;
  border: #0B0B0B;
  bottom:10px;
  background-color:#ffffff
`
const TextStyled = styled.Text`
  font-size: 30px;
  color: purple;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
  left: 10%;
  bottom: -2%;
`;
export default Graves;