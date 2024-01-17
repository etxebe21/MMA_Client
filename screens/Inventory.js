import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { axiosInstance } from '../axios/axiosInstance';
import Profile from './Profile';

const Inventory = () => {

  // Images routes
  const Image_background = require('../assets/wallpaper_inventory.png');
  const Image_siluette = require('../assets/siluette.png');
  const [profileInventory, setProfileInventory] = useState([]);
  const [profileEquipment, setProfileEquipment] = useState([]);
  const [item, setItem] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const moveMats = (item) => {
    // Lógica de eventos cuando se presiona un Square
    console.log('Square presionado:', item);
    setItem(item);

    // Agrega aquí cualquier otra lógica que desees ejecutar al presionar un Square
  };
  const moveMats1 = () => {
    console.log('Square presionado:');
    console.log(item);
    setProfileEquipment((prevProfileEquipment) => [...prevProfileEquipment, item]);
    console.log("INVENTARIOOOOOO");
    console.log(profileEquipment);

    setCurrentIndex((prevIndex) => prevIndex + 1);

  };
  useEffect(() => {
    console.log("PROFILE INVENTORY");
    console.log(profileInventory);
  }, [profileInventory]);

  useEffect(() => {
    getMaterials();
  }, []);
  return (
    <ImageBackground
      source={Image_background}
      style={styles.background}
    >
      <StyledView>
        {/* <TextStyled>
            Entramos en inventario
        </TextStyled> */}
        <EquipmentMainContainer>

          <TextStyled> Equipamiento </TextStyled>
          <ImageBackground source={Image_siluette} style={styles.siluette}>

            <EquipmentContainer>
              <Helmet onPress={() => moveMats1()}>
                {profileInventory.map((item, index) => (
                  index === 1 && (
                    <Image key={index} source={{ uri: item.image }} style={styles.image} />
                  )
                ))}
              </Helmet>
              <Breastplate onPress={() => moveMats1()}>
              </Breastplate>
              <Gloves onPress={() => moveMats1()}>
              </Gloves>
              <Trousers onPress={() => moveMats1()}>
              </Trousers>
            </EquipmentContainer>
          </ImageBackground>
        </EquipmentMainContainer>


        <CajaMateriales>
          {/* Aquí habrá un ScrollView para los materiales */}
          {profileInventory.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => moveMats(item)}>
              <Square>
                <Image source={{ uri: item.image }} style={styles.image} />
              </Square>
            </TouchableOpacity>
          ))}
        </CajaMateriales>

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
  }
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
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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
