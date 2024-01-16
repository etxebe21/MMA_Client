import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components/native";
import { ImageBackground, StyleSheet, Text, ToastAndroid } from "react-native";
import { StyledProgressBar } from '../components/ProgressBar';
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect';
import { Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Inventory from "./Inventory";

const Profile = () => {

  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  const { usersGlobalState, setUsersGlobalState } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [modalRestVisible, setModalRestVisible] = useState(false);
  const [inventoryVisible, setInventoryVisible] = useState(false)

  const [initialAtributes, setInitialAtributes] = useState({
    resistencia: 0,
    agilidad: 0,
    cansancio: 0,
    fuerza: 0
  });

  const userId = userGlobalState._id;

  useEffect(() => {
    setInitialAtributes({
      resistencia: userGlobalState.resistencia,
      agilidad: userGlobalState.agilidad,
      cansancio: userGlobalState.cansancio,
      fuerza: userGlobalState.fuerza
    });

    // Guardar los valores iniciales en AsyncStorage
    AsyncStorage.setItem('initialAtributes', JSON.stringify({
      resistencia: userGlobalState.resistencia,
      agilidad: userGlobalState.agilidad,
      cansancio: userGlobalState.cansancio,
      fuerza: userGlobalState.fuerza
    }));
  }, []);

  useEffect(() => {
    // console.log("RESISTENCIA", userGlobalState.resistencia)
    if (userGlobalState.resistencia >= 20) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [userGlobalState]);

  //Recogemos id del asyncStorage
  useEffect(() => {
    getIdFromAsyncStorage();

  }, [usersGlobalState])

  const getIdFromAsyncStorage = async () => {
    const storedId = await AsyncStorage.getItem('userID');
    // console.log(storedId);

    if (Array.isArray(usersGlobalState)) { // Verificar si usersGlobalState es un array
      const foundUser = usersGlobalState.find(user => user._id === storedId);
      handleUserGlobalState(foundUser);
    }
  };


  const inventoryButton = () => {
    console.log("boton pulsado");
    setInventoryVisible(true);
  };

  const restAcolite = () => {
    openRestModal();
    const userMaxStat = userGlobalState.maxStat;
    // console.log(userMaxStat);
    socket.emit('resetUserAtributes', userGlobalState._id, userMaxStat);
    setTimeout(() => {
      closeRestModal();
    }, 4000);

  };

  const restStats = () => {
    socket.emit('resetUserAtributes', { userId, initialAtributes });

    openRestModal();

    const handleUserAttributes = (responseData) => {
      // console.log('usuario actual recibido desde el servidor:', responseData);
      handleUserGlobalState(responseData);
      ToastAndroid.showWithGravity('Atributos restablecidos', ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    // Suscribirse al evento solo una vez
    socket.once('receiveUserAtributes', handleUserAttributes);

    // Establecer un temporizador para cerrar la modal después de cierto tiempo
    const timeout = setTimeout(() => {
      closeRestModal();
      socket.off('receiveUserAtributes', handleUserAttributes);
    }, 5000);

    // Limpiar el temporizador al desmontar el componente o realizar cambios
    return () => clearTimeout(timeout);
  };

  const openRestModal = () => {
    setModalRestVisible(true);
  };

  const closeRestModal = () => {
    setModalRestVisible(false);
  };
  return (

    <View >
      {inventoryVisible && (
        <Inventory/>
      )}
      {!inventoryVisible && (

        <ImageBackground source={require("../assets/wallpaper_profile.png")} style={styles.imageBackground}>
          {userGlobalState && (
            <Content>
              <AvatarBox>
                <RestButton onPress={restAcolite}>
                  <ImageTired source={require('../assets/TiredBed.png')} />
                </RestButton>

                <GoProfile onPress={inventoryButton}>
                  <ProfileImage source={require('../assets/anime.jpg')} />
                </GoProfile>

                <DetailAvatar source={{ uri: userGlobalState.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
                <MarcoFoto source={require("../assets/marcoEpico.png")} />
                <UserLevelMarco>
                  <UserTextLevel> {userGlobalState.level}</UserTextLevel>
                </UserLevelMarco>

                <UserText>{userGlobalState.username}</UserText>
              </AvatarBox>

              <Statsbackground>
                <ProgressBarRow>
                  <ProgressBarColumn>
                    <ProgressBarTitle>LEVEL: {userGlobalState.level}</ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.level / 20} />
                    <ProgressBarTitle>HITPOINTS: {userGlobalState.hitPoints}</ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.hitPoints / 100} />
                    <ProgressBarTitle>STRENGTH: {userGlobalState.fuerza}  </ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.fuerza / 100} />
                    <ProgressBarTitle>GOLD: {userGlobalState.dinero}</ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.dinero / 100} />
                  </ProgressBarColumn>

                  <ProgressBarColumn>
                    <ProgressBarTitle>TIRED: {userGlobalState.cansancio} </ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.cansancio / 100} />
                    <ProgressBarTitle>RESISTENCE: {userGlobalState.resistencia} </ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.resistencia / 100} />
                    <ProgressBarTitle>AGILITY: {userGlobalState.agilidad}</ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.agilidad / 100} />
                    <ProgressBarTitle>INTELLIGENCE: {userGlobalState.inteligencia}</ProgressBarTitle>
                    <StyledProgressBar progress={userGlobalState.inteligencia / 100} />
                  </ProgressBarColumn>
                </ProgressBarRow>
              </Statsbackground>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalRestVisible}
                onRequestClose={closeRestModal}
              >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('../assets/descansoAcolito.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>RESTING...</CloseText>
                    </View>
                  </ImageBackground>
                </View>
              </Modal>
            </Content>

          )}

          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => setModal(false)}
          >
            <View style={styles.modalContainer}>
              <ImageBackground source={require("../assets/tiredAcolite.png")} style={styles.imageBackground}>
                <View style={styles.modalContent}>
                  <ResText>¡TU RESISTENCIA ES MUY BAJA!</ResText>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </ImageBackground>
      )}

    </View>

  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBackground: {
    flex: 1,
    width: '100%',
    height: '300%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ""
  }
});

const Content = styled.View`
  heigth: 100%;
  width: 100%;
`
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%;
`
const ImageTired = styled.Image`
border-radius:40px;
height:40px;
width: 55px;
left:5px;
`

const ProfileImage = styled.Image`
height:100%;
width: 100%;
border-radius:50px;
`

const Statsbackground = styled.ImageBackground`
  height: 64%;
  overflow: hidden;
  justify-content: flex-start;
  border:3px; 
  border-color: pink;
`
const UserText = styled.Text`
  color: white;
  font-family: Tealand;
  text-shadow: 3px 3px 4px black;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserLevelMarco = styled.View`
  align-self: center;
  border:3px;
  border-radius:50px;
  border-color: rgb(124, 44, 245 );
  height: 20%;
  width:  13%;
  left:   10%;
  margin-top: -13%;
  background-color: rgba(255, 255, 255, 0.7);
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
const DetailAvatar = styled.Image`
  align-self: center;
  top:-15%;
`
const AvatarBox = styled.View`
  border: 3px;
  border-color: white;
  height: 36%;
  padding:5%
  display: flex;
  justify-content: center;
  align-items: center;
`
const MarcoFoto = styled.Image`
  width:  42%;
  height: 65%;
  border-radius: 100px;
  margin-top: -32%;
  top:-10%
`
export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
  marginRight: 125,
  top: 10
}))``;

const ProgressBarRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px
  justify-content: space-around;
  display: flex;
`;

const ProgressBarColumn = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  top:25px;
`;

const ProgressBarTitle = styled.Text`
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  right:15px;
  font-family: 'Tealand';
`;

const RestButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px; 
  left: 20px; 
  background: #A3A2A2;
  opacity: 0.65;
  width: 63px;
  height: 50px;
  border-radius: 30px;
  border: #0B0B0B;
  background-color: rgba(255, 255, 255, 0.2);
`;


const GoProfile = styled.TouchableOpacity`
  position: flex-end; 
  left: 35%; 
  background: #A3A2A2;
  opacity: 0.65;
  width: 63px;
  height: 60px;
  border-radius: 50px;
  border: purple;
  background-color: rgba(255, 255, 255, 0.5);
`;

const CloseText = styled.Text`
  color: #3498db;
  font-size: 60px;
  flex-direction: row;
  top:40%;
`;

const ResText = styled.Text`
  color:  #ff3333;
  font-size: 35px;
  bottom:20%;
  text-align: center; 
`;

export default Profile;