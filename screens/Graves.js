import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image, ToastAndroid} from 'react-native';
import { axiosInstance } from '../axios/axiosInstance';
import { Context } from '../context/Context';
import { socket } from '../socket/socketConnect';

const Graves = () => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  useEffect(() => {
    getMaterialsFromDatabase();
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
  
      // Obtener la imagen del usuario actual
      const userImage = await getUserImageById(userId);
  
      // Actualizar el estado de artefactos localmente con la imagen del usuario que lo recogió
      const updatedMaterials = materialsGlobalState.map(mat => {
        if (mat._id === material._id) {
          return { ...mat, found: !material.found, userImage }; // Actualizar el artefacto recién recolectado con la nueva imagen
        } else if (mat.found) {
          // Mantener la información de la imagen de usuario para los artefactos previamente recolectados
          return { ...mat, userImage: mat.userImage };
        }
        return mat;
      });
  
      // Establecer el nuevo estado global de los artefactos
      setMaterialsGlobalState(updatedMaterials);
  
      // Incluir la imagen del usuario en selectedArtifact
      selectedMaterial.userImage = userImage;
  
      // Emitir el evento 'clientEvent' al servidor con los datos actualizados del artefacto
      socket.emit('updateMaterial', { selectedMaterial });
      
      ToastAndroid.showWithGravity('Material recogido', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      console.error('Error al actualizar los datos del material:', error);
    }
  }
  
  // const saveMaterialToDatabase = async (material) => {
  //   try {
  //     const url = `https://mmaproject-app.fly.dev/api/materials/updateMaterial/${material._id}`;
      
  //     const response = await axiosInstance.patch(url, {
  //       found: !material.found, 
  //       who: userId, 
  //       id: material._id,
  //     });
  
  //     console.log('Estado del material modificado en BD', response.data);
  //   } catch (error) {
  //     console.error('Error al guardar en la base de datos:', error);
  //   }
  // };
  
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

// Agregar la propiedad 'image' a cada objeto en el array 'materials'
const materialsWithImages = materialsGlobalState.map((material) => ({
  ...material,
  image: require('../assets/descansoAcolito.png'),
}));

return (
  <StyledView style={{ flex: 1 }}>
    <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
      {Array.isArray(materialsGlobalState) && materialsGlobalState.slice(0, 2).map((material) => (
        <Square
          key={material._id}
          onPress={() => handleSquareClick(material)}
          disabled={inventory.includes(material)}
        >
          <Image source={material.image} style={styles.image} />
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
          <Image source={material.image} style={styles.image} />
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