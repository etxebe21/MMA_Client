import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
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
      console.log('Usuario encontrado:', user);
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
      <ImageBackground source={require("../assets/wallpaperProfile.png")} style={styles.imageBackground}>
      {user && (
        <Content>
          <AvatarBox>
              
              <DetailAvatar source={{ uri: user.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <MarcoFoto source={require("../assets/marcoEpico.png")}/>
              
              <UserLevelMarco>
                <UserTextLevel> {user.level}</UserTextLevel>
              </UserLevelMarco>
              
              <UserText>{user.username}</UserText>
          </AvatarBox>


          <Statsbackground
          
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


export default Profile;