import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { Modal, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from "../components/ProgressBar";
import { StyledSlider } from "../components/Slider";
import { Alert } from "react-native";
import { Context } from "../context/Context";

const Villano = () => {

  // GLOBALES
  const { userGlobalState,   handleUserGlobalState }    = useContext(Context);
  const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);

  // LOCALES
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateTimer, setUpdateTimer] = useState(null);

  // Constantes para cambios de estado
  const [isCegueraEnabled, setIsCegueraEnabled] = useState();
  const [isHambrunaEnabled, setIsHambrunaEnabled] = useState(null);
  const [isLocuraEnabled, setIsLocuraEnabled] = useState();
  const [isMiedoEnabled, setIsMiedoEnabled] = useState();
  const [isParalisisEnabled, setIsParalisisEnabled] = useState();
  const [isPsicosisEnabled, setIsPsicosisEnabled] = useState();

  // Images
  const Image_disseasesIcon = require('../assets/Icon_Disseas.jpeg') 


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

  const desseasModal = () => {
    console.log("Pulsado boton de Envenenamiento")
  }
  
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
      // console.log('id usuario seleccionado', selectedUser._id);

      // Realiza una solicitud PATCH al servidor para actualizar los datos del usuario
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${selectedUser._id}`, selectedUser);
      const updatedUser = response.data;
      // Maneja la respuesta del servidor 
      // console.log('Datos del usuario actualizados:', updatedUser);

      // getUsersFromDatabase();

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

  if (usersGlobalState === null || usersGlobalState === undefined)
  return null;

  return (
    
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/wallpaper_profile.png')}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
          <HeaderText>ACOLITOS</HeaderText>
          {usersGlobalState.map((user) => (
              <TouchableOpacity key={user.picture} onPress={() => handleUserPress(user)}>
                <UserContainer>

                  <AvatarContainer>
                    <Avatar source={{ uri: user.picture }} />
                    <StatusIndicator isInsideTower={user.insideTower} />
                  </AvatarContainer>

                  <NameContainer>
                    <NameText>{user.username}</NameText>
                  </NameContainer>

                  <CenteredIconContainer>
                    {user.resistencia < 20 && ( <Image source={require('../assets/iconTired.png')} /> )}
                  </CenteredIconContainer>


                </UserContainer>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ImageBackground>


      {selectedUser && (
        <Modal visible={modalVisible}>
          <ModalContent>
            <ImageBackground source={require("../assets/wallpaper_profile.png")} style={styles.imageBackground}>

              <AvatarBox>

                <CloseButton onPress={() => setModalVisible(false)}>
                  <Icon name="times" size={50} color="#4c2882" />
                </CloseButton>

                <DetailAvatarContainer>
                  <DetailAvatar source={{ uri: selectedUser.picture }} />
                  <MarcoFoto source={require("../assets/marcoEpico.png")} />
                </DetailAvatarContainer>

                <UserLevelMarco>
                  <UserTextLevel> {selectedUser.level}</UserTextLevel>
                </UserLevelMarco>

                <UserTextBackground>
                  <UserText>{selectedUser.username}</UserText>
                </UserTextBackground>
              </AvatarBox>

              <Statsbackground>
                <ProgressBarRow>
                  <ProgressBarColumn>
                    <ProgressBarTitle>LEVEL:   {selectedUser.level}</ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.level / 20} />
                    <ProgressBarTitle>HITPOINTS:   {selectedUser.hitPoints}</ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.hitPoints / 100} />
                    <ProgressBarTitle>STRENGTH: {selectedUser.fuerza}  </ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.fuerza / 100} />
                    <ProgressBarTitle>GOLD:  {selectedUser.dinero}</ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.dinero / 100} />
                  </ProgressBarColumn>

                  <ProgressBarColumn>
                    <ProgressBarTitle>TIRED: {selectedUser.cansancio} </ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.cansancio / 100} />
                    <ProgressBarTitle>RESISTENCE: {selectedUser.resistencia} </ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.resistencia / 100} />
                    <ProgressBarTitle>AGILITY:  {selectedUser.agilidad}</ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.agilidad / 100} />
                    <ProgressBarTitle>INTELLIGENCE: {selectedUser.inteligencia}</ProgressBarTitle>
                    <StyledProgressBar progress={selectedUser.inteligencia / 100} />
                  </ProgressBarColumn>
                </ProgressBarRow>
                
                <DisseasButton onPress={() => desseasModal()}>
                  <Image source={Image_disseasesIcon} style={styles.disseasIcon} />
                </DisseasButton>


              </Statsbackground>
            </ImageBackground>

          </ModalContent>
        </Modal>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  ModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8A2C8',
  },
  disseasIcon: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: '100%',
    height: '100%'
  },
  imageBackground: {
    width: '100%'
  }
});

const DisseasButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  width:  ${Dimensions.get('window').height * 0.12}px;
  height: ${Dimensions.get('window').height * 0.10}px;
`;


const CenteredIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.65}px;
  top: ${Dimensions.get('window').height * 0.07}px;

`

const View = styled.View`
  flex: 1;
  background: #C8A2C8;
`

const UserText = styled.Text`
  top: 5%; 
  color: rgba(137, 59, 255,1)
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
`

const UserTextBackground = styled.View`
  background-color: rgba(255,255,255, 0.8);
  border-radius: 10px;
`

const AvatarBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  
  border-color: transparent;
  height: 30%;
  width:100%;
`

const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 30px;
`

const DetailAvatarContainer = styled.View`
  justify-content: center;
  align-items: center; 
  display: flex;
`

const MarcoFoto = styled.Image`
  position: absolute;
  top: -38%;
  width: ${Dimensions.get('window').width * 0.36}px;
  height: ${Dimensions.get('window').height * 0.14}px;
`;

const NameText = styled.Text`
  margin-left: 5px;
  color: #4c2882;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.3px;
  font-family: 'Tealand';
`

const HeaderText = styled.Text`
  margin-top: 5%;
  margin-bottom: 5%;
  color: #4c2882;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
  font-family: 'Tealand';
`

const Avatar = styled.Image`
  width: 43%;
  height: 80px;
  border-radius: 40px;
  border-color: #4c2882;
  border-width: 3px;
`

const UserLevelMarco = styled.View`
  align-self: center;
  border:3px;
  border-radius:20px;
  border-color: rgb(124, 44, 245 );
  height: 40px;
  width:40px;
  left:   10%;
  margin-top: -13%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const UserTextLevel = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-left: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AvatarContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-left: -8%;
`

const Extra = styled.View`
  flex: 1;
  justify-content: flex-end; 
  align-items: flex-end;
  margin-right: 5%;
  margin-top: 1%;
`

const CircularProgressWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;

`

const UserContainer = styled.View`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 60px;
  margin-bottom: 5%;
  height: 110px;
  border: #4c2882;
  background-color: rgba(255, 255, 255, 0.5);
`

const StatusIndicator = styled.View`
  width: 17px;
  height: 17px;
  border-radius: 15px;
  margin-left: -18px;
  bottom: -26px;
  background-color: ${(props) => (props.isInsideTower ? '#10D24B' : 'red')};
  border: #4c2882;
`

const ImageTired = styled.Image`
  width: 72.2px;
  height: 70px;
  border-radius: 35px; 
  top:-4px;
`

const NameContainer = styled.View`
  justify-content: center;
  align-items: start;
  display: flex; 
  margin-left: -10%;
  width: 45%;
`


const ModalContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9a9c9;
`

const DetailAvatar = styled.Image`
  width: 105px;
  height: 101px;
  border-radius: 90px;
  margin-left: 1%;
  top: -25px;

`

const CloseButton = styled.TouchableOpacity`
  position: 'absolute';            
  marginLeft: 300px;
`

const ProgressBarRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ProgressBarTitle = styled.Text`
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  margin-left: 8%;
  display: flex;
`

const ProgressBarColumn = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
`

const Statsbackground = styled.ImageBackground`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 70%;
  width: 100%;
`

const Rest = styled.TouchableOpacity`
  flex-direction: row; 
  height: 60px;
  width: 120px;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-radius: 40px;
  background-color: gray;
  opacity: 0.7;
  left: 25%;
  top: 5%;
`

const RestText = styled.Text`
  font-size: 20px;
  text-align: center;
  align-self: center;
`

export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
}))``;


export default Villano;