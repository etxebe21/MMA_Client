import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Modal, ScrollView, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { axiosInstance } from '../axios/axiosInstance';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Context } from "../context/Context";

const Inventory = () => {

  // GLOBALES
  const { materialsGlobalState, setMaterialsGlobalState } = useContext(Context);

  // LOCALES
  const [profileInventory, setProfileInventory] = useState(materialsGlobalState);
  const [profileEquipment, setProfileEquipment] = useState(Array(4).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [item, setItem] = useState();
  const [inventoryIndex, setInventoryIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [firstItem, setFirstItem] = useState();

  // Images routes
  const Image_background = require('../assets/wallpaper_inventory.png');
  const Image_siluette = require('../assets/siluette.png');


  useEffect(() => {
    console.log("El Estado global Seteado")
    console.log(materialsGlobalState)
    // getMaterials();
  }, [materialsGlobalState]);

  useEffect(() => {
    const arrayIsFull = profileEquipment.every((element) => element !== null);

    if (arrayIsFull) {
      setIsModalVisible(true);
    }
  }, [profileEquipment]);

  useEffect(() => {
   setDescriptionModal(true)
  }, [firstItem]);

  const removeEquipment = () => {

    setProfileInventory((prevProfileInventory) => {
      const newArray = [...prevProfileInventory];
      console.log("entramos");
      if (inventoryIndex < newArray.length) {
        newArray.splice(inventoryIndex, 1);
      }

      return newArray;
    });
  };

  const moveMats = (item, position) => {
    setItem(item);
    setInventoryIndex(position);
    setDescriptionIndex((prevIndex) => prevIndex + 1);
    console.log(descriptionIndex, descriptionModal)
    if (descriptionIndex === 1 && descriptionModal === false) {
      setFirstItem(item);
      console.log("Entramos");
      setDescriptionIndex(0);
    }
    else if (descriptionIndex > 1)
    {
      setDescriptionIndex(0);
    }
   

  };

  const moveMats1 = (position) => {
    if (item !== null && position >= 0) {
      setProfileEquipment((prevProfileEquipment) => {
        const newArray = [...prevProfileEquipment];

        if (position < newArray.length && newArray[position] !== null) {
          ToastAndroid.showWithGravity('Ya hay un objeto equipado', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          newArray[position] = item;
          removeEquipment();
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }

        return newArray;
      });
      setItem(null);
    }
  };


  const closeModal = () => {
    setIsModalVisible(false);
  }

  return (

    <ImageBackground
      source={Image_background}
      style={styles.background}
    >
      <StyledView>
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

        {descriptionModal && (

          <Modal
            animationType="slide"
            transparent={true}
            visible={descriptionModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.smallModalContent}>
                <CloseButton1 onPress={() => closeModal()}>
                  <Icon name="times" size={60} color="#4c2882" />
                </CloseButton1>
                {firstItem != null || firstItem != undefined (
                  <Image source={firstItem[0].image} style={styles.image} />
                )}
                <ShowText>
                  
                </ShowText>
              </View>
            </View>
          </Modal>
        )}

        {!isModalVisible && (

          <CajaMateriales>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {profileInventory.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => moveMats(item, index)}>
                  <Square>
                    {item != null && (
                      <Image source={{ uri: item.image }} style={styles.image} />
                    )}
                  </Square>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
                source={require('../assets/fondoViejaEscuela.png')}
                style={styles.imageBackgrounds}
              >
                <View style={styles.modalContent}>
                  <CloseButton onPress={() => closeModal()}>
                    <Icon name="times" size={60} color="#4c2882" />
                  </CloseButton>
                </View>
                <ShowText>
                  <ModalText>VIAJANDO A LA </ModalText>
                  <ModalText>VIEJA ESCUELA</ModalText>

                </ShowText>
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
  margin: 2px;
  border: 3px solid purple;
  height:97px;
  width:100px;
  border-radius: 15px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const TextStyled = styled.Text`
  font-size: 25px;
  color: purple;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
`;


const ModalText = styled.Text`
  font-size: 35px;
  color: purple;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
`;

const CloseButton = styled.TouchableOpacity`
  position: 'absolute';            
  marginLeft: 80%;
  marginTop: 10%;
  align-items:center;
`
const CloseButton1 = styled.TouchableOpacity`
  position: 'absolute';            
  marginLeft: 70%;
  align-items:center;
`

const ShowText = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  // background-color: pink;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 13,
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

  descriptionBackgrounds: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBackgrounds: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'absolute',
    top: 10,
  },

  smallModalContent: {
    backgroundColor: 'rgba(170, 161, 170, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '70%',
    height: '60%',
    marginTop: 200,
    left:90,
    
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
  border-radius: 15px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Breastplate = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  border-radius: 15px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
`;

const Gloves = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  border-radius: 15px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Trousers = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  border: 3px solid purple;
  height:80px;
  border-radius: 15px;
  width:80px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;


export default Inventory;