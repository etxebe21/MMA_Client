import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image, Text, ToastAndroid, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../axios/axiosInstance';
import { Context } from '../context/Context';
import { socket } from '../socket/socketConnect';
import Icon from 'react-native-vector-icons/FontAwesome';

import Image_graves from '../assets/wallpaper_graves.png';
import Image_tombClosed from '../assets/TumbaCerrada.png';
import Image_tombOpened from '../assets/TumbaAbierta.png';

const Graves = ({returnButton}) => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  
  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);
  const { userGlobalState, setUserGlobalState } = useContext(Context);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  useEffect(() => {
    getMaterialsFromDatabase();
    getID();
    console.log(userId);
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
  
      // Actualizar el campo 'found' del material antes de llamar a foundedMaterial
      material.found = true;
  
      console.log('material recogido', material);
      foundedMaterial(material); 
  };
}
  const getMaterialsFromDatabase = async () => {
    try {
      const materialsData = await axiosInstance.get('https://mmaproject-app.fly.dev/api/materials');
  
      const materials = materialsData.data.data;
      //console.log('MATERIAAAAAAAA', materials)
      console.log('Material:', materials[0]._id);
      setMaterialsGlobalState(materials);
      console.log('ENTRA', materialsGlobalState);
      
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
        setMaterialsGlobalState(updatedMaterials);
        console.log('Materiales guardados en MaterialsGlobalState', updatedMaterials);
        
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

      setMaterialsGlobalState(updatedMaterials);

       // Incluir la imagen del usuario en selectedArtifact
       selectedMaterial.userImage = userImage;
  
      // Emitir el evento 'clientEvent' al servidor con los datos actualizados del artefacto
      socket.emit('updateMaterial', { selectedMaterial });
      
      socket.on('responseMaterial', (responseData) => {
      console.log('Material modificadoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:', responseData);
      setMaterialsGlobalState(responseData);
      });
      
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
    setInventory([]); 
  };

  const foundedMaterial = async (material) => {
    try {
      const updatedInventory = inventory.concat(material);
  
      const newData = {
        inventory: updatedInventory,
      };
  
      const response = await axiosInstance.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${userId}`, newData);
  
      console.log('Usuario actualizado:', response.data);
      const updatedUser = response.data.data;
      setUserGlobalState(updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const returnButtonInternal = () => {
    // Llama a la función proporcionada por las props para cerrar el modal
    returnButton();
  };
  
return (
  
  <MainContainer>
    <ImageBackground source={Image_graves} style={{width: '100%', marginTop: '-55%' }}>
      <MainContainer2>
        
        <TextStyled> LAS CUATRO TUMBAS </TextStyled>

          <GravesMainContainer>
            <GravesView >
            {materialsGlobalState != null &&
              materialsGlobalState.slice(0, 2).map((material) => (
                <Square
                  key={material._id}
                  onPress={() => handleSquareClick(material)}
                  disabled={material.found || inventory.includes(material)}
                >
                  <Image source={material.found || inventory.includes(material) ? Image_tombOpened : Image_tombClosed} style={styles.image} />
                </Square>
              ))}
            </GravesView>

            <GravesView2>
            {materialsGlobalState != null &&
              materialsGlobalState.slice(2, 4).map((material) => (
                <Square
                  key={material._id}
                  onPress={() => handleSquareClick(material)}
                  disabled={material.found || inventory.includes(material)}
                >
                  <Image source={material.found || inventory.includes(material) ? Image_tombOpened : Image_tombClosed} style={styles.image} />
                </Square>
              ))}
            </GravesView2>
          </GravesMainContainer>
  
          <CloseButton onPress={returnButtonInternal}>
            <Icon name="arrow-circle-left" size={50} color= '#888'/>
          </CloseButton>

          <ResetButton onPress={restablecerValores}>
            <Icon name="trash" size={50} color=  '#888' />
          </ResetButton>

      </MainContainer2>
      
    </ImageBackground>
  </MainContainer>
);
}

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainContainer2 = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Square = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -4%;
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  background-color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0)' : 'transparent')};
  height: 65%;
  width: 40%;
`;

const styles = StyleSheet.create({
  image: {
    width: '120%',
    height: '120%',
    resizeMode: 'cover',
  },
});

const GravesMainContainer = styled.View`
  justify-content: center;
  align-items: center;
  top: 25%;
  height: 80%;
  width: 100%;
`;

const GravesView = styled.View`
  padding: 2px;
  display: flex;
  flex-direction: row;
  top: 30%;
  height: 25%;
  width: 65%;
  justify-content: space-between;
  align-content: center;
  marginLeft:-1%;
`;

const GravesView2 = styled.View`
  display: flex;
  align-content: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
  height: 30%;
  width: 90%;
  top: 10%;
`;

const CloseButton = styled.TouchableOpacity`
  position: 'absolute';            
  bottom:-5%;
  marginLeft: -65%;
`
const ResetButton = styled.TouchableOpacity`
  position: 'absolute';            
  bottom: 1%;
  marginLeft: 60%;
`
const TextStyled = styled.Text`
  font-size: 30px;
  color: #999;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px black;
  left: 2%;
  bottom: -30%;
`;

export default Graves;