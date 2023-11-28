import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(user);

  const getUserFromDatabase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/users/';
      const response = await axios.get(url);
      const users = response.data.data;
      setUsers(users);
      // Obtén el ID del usuario guardado en AsyncStorage
      const storedUserId = await AsyncStorage.getItem('userID');

      // Filtra los usuarios para encontrar el que coincide con el ID guardado en AsyncStorage
      const user = users.find(user => user._id === storedUserId);
      // console.log('Usuario encontrado:', user);
      setUser(user);

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };
  useEffect(() => {
    getUserFromDatabase();
  }, []); 

  return (

    <View >
      {user && (
          <Content>
          <AvatarBox>
            <AdditionalImageBackground
              source={require("../assets/bosque.jpg")}
            >
            <Marco
            source={require("../assets/marco.png")}
            >
              <DetailAvatar source={{ uri: user.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <UserLevelMarco>
              <UserTextLevel> {user.level}</UserTextLevel>
              </UserLevelMarco>
            </Marco>
              <UserText>{user.username}</UserText>
            </AdditionalImageBackground>
          </AvatarBox>


          <Statsbackground
          source={require("../assets/city.jpg")}
          >
          <ProgressBarRow>       
            <ProgressBarColumn>
              <ProgressBarTitle>LEVEL:   {user.level}</ProgressBarTitle>
              <StyledProgressBar progress={user.level / 20} />
              <ProgressBarTitle>HITPOINTS:   {user.hitPoints}</ProgressBarTitle>
              <StyledProgressBar progress={user.hitPoints / 100} />
              <ProgressBarTitle>STRENGTH: {user.fuerza}  </ProgressBarTitle>
              <StyledProgressBar progress={user.fuerza / 100} />
              <ProgressBarTitle>GOLD:  {user.dinero}</ProgressBarTitle>
              <StyledProgressBar progress={user.dinero / 100} />
            </ProgressBarColumn>

            <ProgressBarColumn>
              <ProgressBarTitle>TIRED: {user.cansancio} </ProgressBarTitle>
              <StyledProgressBar progress={user.cansancio / 100} />
              <ProgressBarTitle>RESISTENCE: {user.resistencia} </ProgressBarTitle>
              <StyledProgressBar progress={user.resistencia / 100} />
              <ProgressBarTitle>AGILITY:  {user.agilidad}</ProgressBarTitle>
              <StyledProgressBar progress={user.agilidad / 100} />
              <ProgressBarTitle>INTELLIGENCE: {user.inteligencia}</ProgressBarTitle>
              <StyledProgressBar progress={user.inteligencia / 100} />
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