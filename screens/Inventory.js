import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Modal } from 'react-native';
import styled from 'styled-components/native';
import { axiosInstance } from '../axios/axiosInstance';
import Profile from './Profile';

const Inventory = () => {

  // Images routes
  const Image_background = require('../assets/wallpaper_inventory.png');
  const Image_siluette = require('../assets/siluette.png');
  const [profileInventory, setProfileInventory] = useState(Array(4).fill(null));
  const [profileEquipment, setProfileEquipment] = useState(Array(4).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [item, setItem] = useState();
  const [inventoryIndex, setInventoryIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    const arrayIsFull = profileEquipment.every((element) => element !== null);

    if (arrayIsFull) {
      setIsModalVisible(true);
      console.log(isModalVisible);
    }
  }, [profileEquipment]);
  // Luego, puedes cambiar el estado para mostrar u ocultar el modal según tus necesidades
  // Ejemplo: setIsModalVisible(true) para mostrar el modal


  const getMaterials = async () => {
    try {
      const artifactsData = await axiosInstance.get('https://mmaproject-app.fly.dev/api/artifacts');
      console.log(artifactsData.data.data);
      const materials = artifactsData.data.data;

      const newProfileInventory = materials.map(element => ({ ...element }));
      setProfileInventory(newProfileInventory);
    } catch (error) {
      console.error("Error al obtener los materiales:", error);
    }
  }

  const moveMats = (item, position) => {
    // Lógica de eventos cuando se presiona un Square
    console.log('Square presionado:', item);
    setItem(item);
    setInventoryIndex(position);
    console.log(profileEquipment);
    // Agrega aquí cualquier otra lógica que desees ejecutar al presionar un Square
  };

  const moveMats1 = (position) => {
    if (item !== null && position >= 0) {
      setProfileEquipment((prevProfileEquipment) => {
        const newArray = [...prevProfileEquipment];

        // Verifica si la posición está dentro del rango del array
        if (position < newArray.length) {
          newArray[position] = item;
        } else {
          // Si la posición está fuera del rango, agrega el elemento al final
          newArray.push(item);
        }

        return newArray;
      });

      setCurrentIndex((prevIndex) => prevIndex + 1);
      setItem(null);
    }
  };

  return (

    <ImageBackground
      source={Image_background}
      style={styles.background}
    >
      <StyledView>
        {/* <TextStyled>
      Entramos en inventario
        </TextStyled> */}
        {!isModalVisible && (

          <EquipmentMainContainer>

            <TextStyled> Equipamiento </TextStyled>
            <ImageBackground source={Image_siluette} style={styles.siluette}>

              <EquipmentContainer>
                <Helmet onPress={() => moveMats1(0)}>
                  {profileEquipment.map((item, index) => (
                    index === 0 && item != null && (
                      <Image key={index} source={{ uri: item.image }} style={styles.image} />
                    )
                  ))}
                </Helmet>
                <Breastplate onPress={() => moveMats1(1)}>
                  {profileEquipment.map((item, index) => (
                    index === 1 && item != null && (
                      <Image key={index} source={{ uri: item.image }} style={styles.image} />
                    )
                  ))}
                </Breastplate>
                <Gloves onPress={() => moveMats1(2)}>
                  {profileEquipment.map((item, index) => (
                    index === 2 && item != null && (
                      <Image key={index} source={{ uri: item.image }} style={styles.image} />
                    )
                  ))}
                </Gloves>
                <Trousers onPress={() => moveMats1(3)}>
                  {profileEquipment.map((item, index) => (
                    index === 3 && item != null && (
                      <Image key={index} source={{ uri: item.image }} style={styles.image} />
                    )
                  ))}
                </Trousers>
              </EquipmentContainer>
            </ImageBackground>
          </EquipmentMainContainer>
        )}

        {!isModalVisible && (

          <CajaMateriales>
            {/* Aquí habrá un ScrollView para los materiales */}
            {profileInventory.map((item, index) => (
              <Square>
                <TouchableOpacity key={index} onPress={() => moveMats(item, index)}>
                  {item != null && (
                    <Image source={{ uri: item.image }} style={styles.image} />
                  )}
                </TouchableOpacity>
              </Square>
            ))}
          </CajaMateriales>
        )}

        {isModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <View style={styles.modalContainer}>
              <ImageBackground
                source={require('../assets/descansoAcolito.png')}
                style={styles.imageBackground}
              >
                <View style={styles.modalContent}>
                  <TextStyled>RESTING...</TextStyled>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        )}
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

const StyledView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  // background-color: pink;
`;

const EquipmentContainer = styled.View`
  display: flex;
  align-items: left;
  justify-content: start;
  height: 90%;
  width: 100%;
  // background-color: blue;
`;

const EquipmentMainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 80%;
  width: 100%;
  // background-color: yellow;
`;


const Square = styled.View`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:100px;
  width:80 px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const TextStyled = styled.Text`
  font-size: 25px;
  color: purple;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
`;


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  siluette: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  imageBackgrounds: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ==============================================
//                Equipamiento
// ==============================================

// Este no tiene que ser un boton, tiene que ser una imagen de silueta 
const Siluette = styled.View`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 50%;
  width: 100%;
  background-color: pink;
`;

const Helmet = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Breastplate = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
`;

const Gloves = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Trousers = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;


export default Inventory;