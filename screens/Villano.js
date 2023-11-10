import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Modal, StyleSheet, TouchableOpacity} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from "../components/ProgressBar";
import { StyledSlider } from "../components/Slider";
import { Alert } from "react-native";


const Villano = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCegueraEnabled, setIsCegueraEnabled] = useState();
  const [isHambrunaEnabled, setIsHambrunaEnabled] = useState(null);
  const [isLocuraEnabled, setIsLocuraEnabled] = useState();
  const [isMiedoEnabled, setIsMiedoEnabled] = useState();
  const [isParalisisEnabled, setIsParalisisEnabled] = useState();
  const [isPsicosisEnabled, setIsPsicosisEnabled] = useState();
  const [updateTimer, setUpdateTimer] = useState(null);

  const acolitos = users.filter(user => user.role === "ACÓLITO");

  const getUsersFromDatabase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/users';
      const response = await axios.get(url);
      const users= response.data.data;
      setUsers(users);
      setSelectedUser(selectedUser);
      console.log('Usuarios:', users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    getUsersFromDatabase();
  }, [selectedUser]); 

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSliderChange = (newValue, attribute) => {

    if (updateTimer) {
      clearTimeout(updateTimer);
    }
  
    
    const newTimer = setTimeout(() => {
      setSelectedUser((prevState) => ({ ...prevState, [attribute]: Math.round(newValue) }));
    }, 300); 
  
    setUpdateTimer(newTimer);
  };
  
//sliders
  const handleHitPointsChange = (newValue) => {
    handleSliderChange(newValue, "hitPoints");
  };
  const handleFuerzaChange = (newValue) => {
    handleSliderChange(newValue, "fuerza");
  };
  const handleDineroChange = (newValue) => {
    handleSliderChange(newValue, "dinero");
  };

  //switches
  const toggleCeguera = () => {
    setIsCegueraEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      ceguera: !prevState.ceguera 
    }));
  };  
  const toggleHambruna = () => {
    setIsHambrunaEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      hambruna: !prevState.hambruna
    }));
  };
  const toggleLocura = () => {
    setIsLocuraEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      locura: !prevState.locura
    }));
  };
  
  const toggleMiedo = () => {
    setIsMiedoEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      miedo: !prevState.miedo
    }));
  };
  
  const toggleParalisis = () => {
    setIsParalisisEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      parálisis: !prevState.parálisis
    }));
  };
  
  const togglePsicosis = () => {
    setIsPsicosisEnabled(previousState => !previousState);
    setSelectedUser(prevState => ({
      ...prevState,
      psicosis: !prevState.psicosis
    }));
  };  
  
  const handleEditUserConfirm = async () => {
    try {
      console.log('id usuario seleccionado', selectedUser._id);

      // Realiza una solicitud PATCH al servidor para actualizar los datos del usuario
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${selectedUser._id}`, selectedUser);
      const updatedUser = response.data;
      // Maneja la respuesta del servidor 
      console.log('Datos del usuario actualizados:', updatedUser);

      getUsersFromDatabase();

     // Muestra un mensaje de confirmación
      Alert.alert(
        "Usuario Actualizado",
        "Los datos del usuario han sido actualizados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <HeaderText>ACÓLITOS</HeaderText>
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ModalContent>
              <CloseButton onPress={() => setModalVisible(false)}>
                <Icon name="times" size={50} color="#4c2882" />
              </CloseButton>
              <DetailAvatar source={{ uri: selectedUser.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <UserText>{selectedUser.username}</UserText>

              <Icon name="github-alt" size={20} color="blue" />
              <Text>LEVEL: {selectedUser.level}</Text>
              <StyledProgressBar progress={selectedUser.level/20} />
    

              <Icon name="legal" size={20} color="blue" />
              <Text>HITPOINTS: {selectedUser.hitPoints} </Text>
              <StyledSlider value={selectedUser.hitPoints} onValueChange={handleHitPointsChange}
              />

              <Icon name="hand-rock-o" size={20} color="blue" />
              <Text>STRENGTH: {selectedUser.fuerza} </Text>
              <StyledSlider value={selectedUser.fuerza} onValueChange={handleFuerzaChange}
              />

              <Icon name="money" size={20} color="blue" />
              <Text>GOLD: {selectedUser.dinero} </Text>
              <StyledSlider value={selectedUser.dinero} onValueChange={handleDineroChange}
              />

              <Icon name="github-alt" size={20} color="blue" />
              <Text>FATIGUE: {selectedUser.cansancio}</Text>
              <StyledProgressBar progress={selectedUser.cansancio/100} />

              <Icon name="bomb" size={20} color="blue" />
              <Text>RESISTENCE: {selectedUser.resistencia} </Text>
              <StyledProgressBar progress={selectedUser.resistencia/100} />

              <Icon name="motorcycle" size={20} color="blue" />
              <Text>AGILITY: {selectedUser.agilidad} </Text>
              <StyledProgressBar progress={selectedUser.agilidad/100} />

              <Icon name="info" size={20} color="blue" />
              <Text>INTELLIGENCE: {selectedUser.inteligencia} </Text>
              <StyledProgressBar progress={selectedUser.inteligencia/100} />
              
              <Text style={{ fontSize: 30, color: 'blue'}}>EFFECTS:</Text>
              <Text></Text>

              <Text>Ceguera: {selectedUser.ceguera ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={toggleCeguera}
              value={selectedUser.ceguera}
            />
               <Text>Hambruna: {selectedUser.hambruna ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={toggleHambruna}
              value={selectedUser.hambruna}
            />

            <Text>Locura: {selectedUser.locura ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={toggleLocura}              
              value={selectedUser.locura}
            />
            <Text>Miedo: {selectedUser.miedo ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={toggleMiedo}
              value={selectedUser.miedo}
            />

            <Text>Parálisis: {selectedUser.parálisis ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={toggleParalisis}
              value={selectedUser.parálisis}
            />

            <Text>Psicosis: {selectedUser.psicosis ? 'Sí' : 'No'}</Text>
            <Switch
              onValueChange={togglePsicosis}
              value={selectedUser.psicosis}
            />

              <ConfirmButton onPress={() => handleEditUserConfirm()}>
                <ButtonText>Confirm</ButtonText>
              </ConfirmButton>
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
  bottom: -5px;
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
const HeaderText = styled.Text`
  bottom: -15px;
  color: #4c2882;
  font-size: 22px;
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
  height:1350px;
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
  position: 'absolute';            
  top: -30px;
  marginLeft: 300px;
`
const ButtonText = styled.Text`
color: #FFFFFF;
font-size: 25px;
font-weight: bold;
letter-spacing: -0.3px;
align-self: center;  
`
export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
}))``;

const ConfirmButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -20px;
    width: 42%;
    height: 55px;
    margin-left: 0px;
    border-radius: 60px;
    align-self: center;
`
export default Villano;