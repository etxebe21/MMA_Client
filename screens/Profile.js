import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from "../context/Context";

const Profile = () => {

  const {userGlobalState,   handleUserGlobalState}  = useContext(Context);

  useEffect(() => {

  }, []); 

  return (

    <View >
      {userGlobalState && (
          <Content>
          <AvatarBox>
            <AdditionalImageBackground
              source={require("../assets/bosque.jpg")}
            >
            <Marco
            source={require("../assets/marco.png")}
            >
              <DetailAvatar source={{ uri: userGlobalState.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <UserLevelMarco>
              <UserTextLevel> {userGlobalState.level}</UserTextLevel>
              </UserLevelMarco>
            </Marco>
              <UserText>{userGlobalState.username}</UserText>
            </AdditionalImageBackground>
          </AvatarBox>


          <Statsbackground
          source={require("../assets/city.jpg")}
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
          </Statsbackground>
        </Content>

      )}
    </View>
  )
}

const Content = styled.View`
  padding: 20px;
`;

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #d9a9c9;
    height: auto; 
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
  width: 360px;
  height: 165px;
  overflow: hidden;
  justify-content: flex-end; 
`;

const Statsbackground = styled.ImageBackground`
  height:410px;
  overflow: hidden;
  justify-content: flex-end;
  border:3px; 
`;
const UserText = styled.Text`
    top: -5px;
    color: #4c2882;
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 0.5px;
    align-self: center; 
  `
const UserLevelMarco = styled.View`
top: -5px;
color: black;
align-self: center;
border:3px;
border-radius:50px;
height:50px;
width:50px;
left:50px;
background-color:gray;
`
  const UserTextLevel = styled.Text`
    color: black;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 0px;
    align-self: center;
    position: absolute;
    text-align:center;
  `
const DetailAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 45px;
    border-width: 3px;
    align-self: center
    top:27px;
  `
const AvatarBox = styled.View`
  border: 3px;
  color: 'black';
  width:366px;
  height:170px;
  `

const Marco = styled.ImageBackground`
  width:150px;
  height:150px;
  align-self: center;
  top:20px;
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


export default Profile;