import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { Modal, StyleSheet, ActivityIndicator, ToastAndroid, TouchableOpacity, Dimensions, ImageBackground, Text } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from "../components/ProgressBar";
import { Context } from "../context/Context";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { socket } from '../socket/socketConnect';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreatePotions } from "./CreatePotions";


const Mortimer = () => {

  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  const { usersGlobalState, setUsersGlobalState } = useContext(Context);
  const {selectingUser, setSelectingUser} = useContext(Context);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [potionSection, setPotionSection] = useState(false);



  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const storedId = AsyncStorage.getItem('userID');

  useEffect(() => {
    if (usersGlobalState != null && selectedUser != null) {
      usersGlobalState.forEach((element) => {
        if (element._id === selectedUser._id) {
          setSelectedUser(element);
        }
      });
    }
    else return;
  }, [usersGlobalState, selectedUser]);

  useEffect(() => {
    console.log("Entramos");
    setSelectingUser(selectedUser);
  }, [selectedUser])

  useEffect(() => {
    console.log(selectingUser);
  }, [selectingUser])


  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const getColorForResistencia = (resistence) => {
    if (resistence >= 70) {
      return 'green';
    } else if (resistence >= 40) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const showPotionSection = () => {
    setPotionSection(true);
  }

  const updateRest = (data) => {

    setLoading(true);

    const tiredData = {
      id: data._id,
      tired: data.resistencia + 20,
    };

    data.resistencia = tiredData.tired;
    setSelectedUser(data);
    // console.log(tiredData);
    socket.emit('RestStat', tiredData, storedId);
    ToastAndroid.showWithGravity('STAT TIRED HAS AUMENTED', ToastAndroid.SHORT, ToastAndroid.CENTER);
    setLoading(false);

  };

  if (usersGlobalState === null || usersGlobalState === undefined)
    return null;

  return (


    <View style={styles.container}>

      {potionSection && (
        <CreatePotions setPotionSection={setPotionSection}/>
      )}

      {!potionSection && (

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

                  <CenteredSicknessIconContainer>
                    {(user.rotting_plague || user.epic_weakness || user.marrow_apocalypse) && (
                      <CursedImage source={require('../assets/sickness.jpeg')} />
                    )}
                  </CenteredSicknessIconContainer>

                  <CenteredCursedIconContainer>
                    {(user.ethazium) && (
                      <CursedImage source={require('../assets/ethaziumed.png')} />
                    )}
                  </CenteredCursedIconContainer>


                  <Extra>
                    <ImageTired source={require('../assets/cansado.jpeg')} />
                    <CircularProgressWrapper>
                      <AnimatedCircularProgress
                        size={70}
                        width={6}
                        fill={user.resistencia}
                        tintColor={getColorForResistencia(user.resistencia)}
                        backgroundColor="black"
                      />
                    </CircularProgressWrapper>
                  </Extra>

                </UserContainer>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ImageBackground>
      )}


      {selectedUser && !potionSection && (
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
                {selectedUser.resistencia <= 20 && (

                  <Rest onPress={() => updateRest(selectedUser)}>
                    {loading && (
                      <ActivityIndicator size="small" color="#3498db" animating={true} />
                    )}

                    <Text style={styles.image}>Rest</Text>
                  </Rest>
                )}

                <HealDisease onPress={showPotionSection}>
                  <PotionSection source={require('../assets/potionSec.png')} />
                  <Text style={styles.image}>Potion Section</Text>
                </HealDisease>

              </Statsbackground>
            </ImageBackground>

          </ModalContent>
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
  image: {
    alignItems: 'center',
    color: 'orange',
    fontSize: 17,
    fontFamily: 'Tealand'
  }
});

const CenteredSicknessIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.27}px;
  top: ${Dimensions.get('window').height * 0.08}px;
`
const CenteredIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.65}px;
  top: ${Dimensions.get('window').height * 0.07}px;
`
const CenteredCursedIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.27}px;
  top: ${Dimensions.get('window').height * 0.02}px;
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
const PotionSection = styled.Image`
border-radius:40px;
height:100%;
width: 100%;
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
  margin-left: -10%;
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
  width: 66px;
  height: 66px;
  border-radius: 33px; 
  top:-4px;
`
const NameContainer = styled.View`
  justify-content: center;
  align-items: start;
  display: flex; 
  margin-left: 1%;
  width: 30%;
`
const ModalContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9a9c9;
  width:100%;
  height:100%;
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
  flex-direction: row;
  justify-content: space-around;
  width:100%;
  top:-7%;
`
const ProgressBarTitle = styled.Text`
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  right:15px;
`
const ProgressBarColumn = styled.View`
  align-items: center;
`
const Statsbackground = styled.ImageBackground`
  height: 70%;
  width: 100%;
  overflow: hidden;
  display:flex; 
  justify-content: center;
  align-items: center;
  border:3px; 
  border-color: black;
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
  left: 20%;
`
const HealDisease = styled.TouchableOpacity`
  position:absolute; 
  height: 60px;
  width: 120px;
  border: 2px;
  border-radius: 40px;
  background-color: gray;
  opacity: 0.7;
  left: 5%;
  top: 77%;
`
const CursedImage = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`

export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
}))``;

export default Mortimer;