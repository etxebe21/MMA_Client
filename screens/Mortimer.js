import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Modal, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

const Mortimer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const thumb = require('../assets/yeti.jpg');

  useEffect(() => {
    async function getUsersFromDatabase() {
      try {
        const url = 'https://mmaproject-app.fly.dev/api/users';

        const response = await axios.get(url);
        const users = response.data.data;
        setUsers(users);
        console.log('Usuarios:', users);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    getUsersFromDatabase();
  }, []);

  const acolitos = users.filter(user => user.role === "ACÓLITO");

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // const handleEditUser = (user) => {
  //   setEditedUser(user);
  //   setSelectedUser(user);
  //   setEditModalVisible(true);
  // };


  const handleLevelChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, level:Math.round(newValue)  }));
  };

  const handleHitPointsChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, hitPoints: Math.round(newValue) }));
  };

  const handleFuerzaChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, fuerza: Math.round(newValue) }));
  };

  const handleDineroChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, dinero: Math.round(newValue) }));
  };

  const handleCansancioChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, cansancio: Math.round(newValue) }));
  };

  const handleResistenciaChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, resistencia: Math.round(newValue) }));
  };

  const handleAgilidadChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, agilidad: Math.round(newValue) }));
  };

  const handleInteligenciaChange = (newValue) => {
    setSelectedUser((prevState) => ({ ...prevState, inteligencia: Math.round(newValue) }));
  };

  const handleEditUserConfirm = async () => {
    try {
      console.log('id usuario seleccionado', selectedUser._id);

      const updatedUserData = {

        username: selectedUser.username,
        level: selectedUser.level,
        hitPoints: selectedUser.hitPoints,
        fuerza: selectedUser.fuerza,
        dinero: selectedUser.dinero,
        cansancio: selectedUser.cansancio,
        resistencia: selectedUser.resistencia,
        agilidad: selectedUser.agilidad,
        inteligencia: selectedUser.inteligencia,
        ceguera: selectedUser.ceguera,
        hambruna: selectedUser.hambruna,
        locura: selectedUser.locura,
        miedo: selectedUser.miedo,
        parálisis: selectedUser.parálisis,
        psicosis: selectedUser.psicosis,
        role: selectedUser.role
      };

      // Realiza una solicitud PATCH al servidor para actualizar los datos del usuario
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${selectedUser._id}`, updatedUserData);
      const updatedUser = response.data;
      // Maneja la respuesta del servidor 
      console.log('Datos del usuario actualizados:', updatedUser);
      // Cierra el modal de edición
      closeEditModal();
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <Text>ACÓLITOS</Text>
        {acolitos.map((data) => (
          <TouchableOpacity key={data.picture} onPress={() => handleUserPress(data)}>
            <UserContainer>
              <AvatarContainer>
                <Avatar source={{ uri: data.picture }} />
                <StatusIndicator isInsideTower={data.insideTower} />
              </AvatarContainer>
              <NameText>{data.username}</NameText>
            </UserContainer>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedUser && (
        <Modal visible={modalVisible}>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <ModalContent>
            <DetailAvatar source={{ uri: selectedUser.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
            
            <UserText>{selectedUser.username}</UserText>
            <Text>LEVEL: {selectedUser.level} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.level} minimumValue={0} maximumValue={20} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleLevelChange}
            />
             <Text>HITPOINTS: {selectedUser.hitPoints} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.hitPoints} minimumValue={0} maximumValue={50} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleHitPointsChange}
            />
             <Text>FUERZA: {selectedUser.fuerza} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.fuerza} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleFuerzaChange}
            />
            <Text>DINERO: {selectedUser.dinero} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.dinero} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleDineroChange}
            />
            <Text>CANSANCIO: {selectedUser.cansancio} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.cansancio} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleCansancioChange}
            />
            <Text>RESISTENCIA: {selectedUser.resistencia} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.resistencia} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleResistenciaChange}
            />
            <Text>AGILIDAD: {selectedUser.agilidad} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.agilidad} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleAgilidadChange}
            />
            <Text>INTELIGENCIA: {selectedUser.inteligencia} </Text>
            <Slider style={{ width: 300, height: 40 }} value = {selectedUser.inteligencia} minimumValue={0} maximumValue={100} minimumTrackImage = {1}  maximumTrackImage={50}  thumbTintColor= "#913595" minimumTrackTintColor="#4c2882" maximumTrackTintColor="#0087FF" onValueChange={handleInteligenciaChange}
            />
            
            <Text>Ceguera: {selectedUser.ceguera ? "Sí" : "No"}</Text>
            <Text>Hambruna: {selectedUser.hambruna ? "Sí" : "No"}</Text>
            <Text>Locura: {selectedUser.locura ? "Sí" : "No"}</Text>
            <Text>Miedo: {selectedUser.miedo ? "Sí" : "No"}</Text>
            <Text>Parálisis: {selectedUser.parálisis ? "Sí" : "No"}</Text>
            <Text>Psicosis: {selectedUser.psicosis ? "Sí" : "No"}</Text>
            <Text>Role: {selectedUser.role}</Text>
            <Text>Torreón: {selectedUser.insideTower ? "Sí" : "No"}</Text>

            <CloseButton onPress={() => setModalVisible(false)}>
              <ButtonText>Close</ButtonText>
            </CloseButton>
          </ModalContent>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8A2C8',
  },
});

const View = styled.View`
  flex: 1;
  background: #C8A2C8;
`
const Text = styled.Text`
  bottom: -15px;
  color: #4c2882;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const UserText = styled.Text`
  top: -10px;
  color: #4c2882;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const NameText = styled.Text`
  margin-left: 15px;
  color: #4c2882;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  margin-left: 10px;
  padding:1px;
  border-radius: 40px;
  border-color: #4c2882;
  border-width: 3px;
`
const AvatarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 110px;
  border: #4c2882;
  bottom: -40px;
  background-color: #d9a9c9;
`
const StatusIndicator = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-left: -15px;
  bottom: -20px;
  background-color: ${(props) => (props.isInsideTower ? '#10D24B' : 'red')};
  border: #4c2882;
`
const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #d9a9c9;
  height:1100px;
`
const DetailAvatar = styled.Image`
  width: 90px;
  height: 90px;
  padding:1px;
  border-radius: 45px;
  border-color: #4c2882;
  border-width: 3px;
  top: -25px;
`
const CloseButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -25px;
    margin-left: -10px;
    width: 42%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`
const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const EditButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: 30px;
    width: 42%;
    height: 55px;
    margin-left: 190px;
    border-radius: 60px;
    align-self: center;
`


// const ConfirmButton = styled.TouchableOpacity`
//     background-color: #4c2882;
//     padding: 10px 20px;
//     bottom: 30px;
//     width: 42%;
//     height: 55px;
//     margin-left: 180px;
//     border-radius: 60px;
//     align-self: center;
// `
export default Mortimer;