import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect';


const Profile = () => {

  const {userGlobalState,   handleUserGlobalState}  = useContext(Context);

  useEffect(() => {
    console.log("Puntos de salud: " + userGlobalState.hitPoints);
  }, [userGlobalState]); 

  const updateUserStats = () => {
    console.log("Pulsado boton de change stats");
    const cambioPrueba = {hitPoints: 40, _id: "6548b41cc846522bc401e1cf"};
    socket.emit("changeStat", cambioPrueba._id, cambioPrueba.hitPoints);
  }

  return (

    <View >
      <ImageBackground source={require("../assets/wallpaper_profile.png")} style={styles.imageBackground}>
      {userGlobalState && (
        <Content>
          <AvatarBox>
              
              <DetailAvatar source={{ uri: userGlobalState.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <MarcoFoto source={require("../assets/marcoEpico.png")}/>
              
              <UserLevelMarco>
                <UserTextLevel> {userGlobalState.level}</UserTextLevel>
              </UserLevelMarco>
              
              <UserText>{userGlobalState.username}</UserText>
          </AvatarBox>


          <Statsbackground
          
          >
          <ProgressBarRow>       
            <ProgressBarColumn>
              <ProgressBarTitle>LEVEL:   {userGlobalState.level}</ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.level / 20} />
              <ProgressBarTitle>HITPOINTS:   {userGlobalState.hitPoints}</ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.hitPoints / 100} />
              <ProgressBarTitle>STRENGTH: {userGlobalState.fuerza}  </ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.fuerza / 100} />
              <ProgressBarTitle>GOLD:  {userGlobalState.dinero}</ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.dinero / 100} />
            </ProgressBarColumn>

            <ProgressBarColumn>
              <ProgressBarTitle>TIRED: {userGlobalState.cansancio} </ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.cansancio / 100} />
              <ProgressBarTitle>RESISTENCE: {userGlobalState.resistencia} </ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.resistencia / 100} />
              <ProgressBarTitle>AGILITY:  {userGlobalState.agilidad}</ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.agilidad / 100} />
              <ProgressBarTitle>INTELLIGENCE: {userGlobalState.inteligencia}</ProgressBarTitle>
              <StyledProgressBar progress={userGlobalState.inteligencia / 100} />
            </ProgressBarColumn>
          </ProgressBarRow>

          <SendButton onPress={() => updateUserStats()}>
              <ButtonsText>Change stats</ButtonsText>
          </SendButton>
          </Statsbackground>
        </Content>

      )}
      </ImageBackground>
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
  
  
});

const Content = styled.View`
  heigth: 100%;
  width: 100%;

`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100%; 
  width: 100%;
`
const Text = styled.Text`
    bottom: -15px;
    color: #4c2882;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
const AdditionalImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  margin-top: -40%;
  justify-content: center; 
`

const Statsbackground = styled.ImageBackground`
  height: 60%;
  overflow: hidden;
  justify-content: flex-end;
  border:3px; 
  border-color: pink;
`
const UserText = styled.Text`
  color: white;
  font-family: Tealand;
  text-shadow: 3px 3px 4px black;
  font-size: 20px;
  margin-top: 1%;
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
height: 25%;
width:  13%;
left:   13%;
margin-top: -13%;
background-color: rgba(255, 255, 255, 0.9);
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
`

const AvatarBox = styled.View`
  border: 3px;
  border-color: white;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

`

const Marco = styled.ImageBackground`
  width:  150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MarcoFoto = styled.Image`
  width:  150px;
  height: 150px;
  border-radius: 100px;
  margin-top: -32%;
`

const AdditionalImage = styled.Image`
  width: 360px;
  height:170px;
  right:3px;
`;


export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
  marginRight: 125,
  top: 10
}))``;

const iconStyles = {
  marginLeft: 140,
  color: 'blue',
  top: 10
};

const ProgressBarRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ProgressBarColumn = styled.View`
  align-items: center;
  top:-50px;
`;

const ProgressBarTitle = styled.Text`
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  right:15px;
`;

const SendButton = styled.TouchableOpacity`
background: #A3A2A2;
opacity: 0.95;
width: 180px;
height: 65px;
align-self: center;
border-radius: 30px;
border: #0B0B0B;
bottom:25px;
background-color:#ffffff
`

const ButtonsText = styled.Text`
  fontSize: 28px;
  font-family: 'Tealand';
  color: #4c2882; 
  align-self: center;
  top:17px;
  `


export default Profile;