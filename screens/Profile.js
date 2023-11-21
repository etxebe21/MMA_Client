import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyledProgressBar } from "../components/ProgressBar";
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
          }, []); // El efecto se ejecutará solo una vez, al montar el componente
          
    return(
    
        <View >
    {user && (
       <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <DetailAvatar source={{ uri: user.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
        <UserText>{user.username}</UserText>

        <Icon name="github-alt" marginLeft= {140} color= 'blue'  top= {50} />
        <Text top={50}>LEVEL: {user.level}</Text>
        <StyledProgressBar progress={user.level/20} marginTop= {45}/>

        <Icon name="legal" style={iconStyles}/>
        <Text>HITPOINTS: {user.hitPoints} </Text>
        <StyledProgressBar progress={user.hitPoints/100} marginTop= {15}/>

        <Icon name="hand-rock-o" style={iconStyles} />
        <Text>STRENGTH: {user.fuerza} </Text>
        <StyledProgressBar progress={user.fuerza/100} marginTop= {15}/>

        <Icon name="money" style={iconStyles}/>
        <Text>GOLD: {user.dinero} </Text>
        <StyledProgressBar progress={user.cansancio/100} marginTop= {15}/>

        <Icon name="github-alt" style={iconStyles}/>
        <Text>FATIGUE: {user.cansancio}</Text>
        <StyledProgressBar progress={user.cansancio/100} marginTop= {15}/>

        <Icon name="bomb" style={iconStyles}/>
        <Text>RESISTENCE: {user.resistencia} </Text>
        <StyledProgressBar progress={user.resistencia/100} marginTop= {15}/>

        <Icon name="motorcycle" style={iconStyles} />
        <Text>AGILITY: {user.agilidad} </Text>
        <StyledProgressBar progress={user.agilidad/100} marginTop= {15}/>

        <Icon name="info" style={iconStyles}/>
        <Text>INTELLIGENCE: {user.inteligencia} </Text>
        <StyledProgressBar progress={user.inteligencia/100} marginTop= {15}/>
        
        
        
    </ScrollView>
    )}
    </View>
    )
}
  
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
  const UserText = styled.Text`
    top: 30px;
    color: #4c2882;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
  const DetailAvatar = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border-color: #4c2882;
    border-width: 3px;
    top: 25px;
    align-self: center
  `
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
export default Profile;