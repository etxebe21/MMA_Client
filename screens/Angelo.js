import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity, ToastAndroid, Dimensions, ImageBackground} from "react-native";
import { ScrollView } from "react-native";
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect'

const Angelo = () => {

    const { usersGlobalState,  setUsersGlobalState }   = useContext(Context);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acolitos, setAcolitos] = useState([]);

    useEffect(() => {
    
      if (Array.isArray(usersGlobalState)) {
        console.log('Filtered Acolitos:', usersGlobalState.filter(user => user.role === "ACÓLITO"));
        setUsersGlobalState(usersGlobalState.filter(user => user.role === "ACÓLITO"));
      }
    }, []);
    
    const handleUserPress = () => {
        // setSelectedUser();
        // setModalVisible(true);
      };

    const ethazium = (data) => {
  
      if (data.ethazium) {
        return; }
    
      const ethaziData = {
        id: data._id,
        fuerza: Math.max(5, Math.ceil(data.fuerza * 0.6)),
        agilidad: Math.max(5, Math.ceil(data.agilidad * 0.6)),
        inteligencia: Math.max(5, Math.ceil(data.inteligencia * 0.6)),
        ethazium: true,
      };
      
      // Actualiza el estado local antes de emitir el evento
      const updatedAcolitos =  usersGlobalState.map(user =>
        user._id === ethaziData.id ? { ...user, ethazium: true } : user
      );
      setUsersGlobalState(updatedAcolitos);

      socket.emit('Ethazium', ethaziData);
      ToastAndroid.showWithGravity('MALDICIÓN ETHAZIUM INVOCADA', ToastAndroid.SHORT, ToastAndroid.CENTER);

      // socket.on('ethaziumUser', (responseData) => {
      //   console.log('Usuario modificadoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:', responseData);
      //   });
  };

  if (usersGlobalState === null || usersGlobalState === undefined)
    return null;
    
    return(

        <View style={styles.container}>
         <ImageBackground
          source={require('../assets/wallpaper_profile.png')}
          style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                <HeaderText>ACÓLITOS</HeaderText>
                
                {usersGlobalState !== undefined && usersGlobalState && usersGlobalState.map((user) => (
                    <TouchableOpacity key={user.picture} onPress={() => handleUserPress(user)}>
                    <UserContainer>
                        <AvatarContainer>
                            <Avatar source={{ uri: user.picture }} />
                            <StatusIndicator isInsideTower={user.insideTower} />
                        </AvatarContainer>

                        <NameContainer>
                           <NameText maxWidth={140}>{user.username}</NameText>
                        </NameContainer>

                        <CenteredSicknessIconContainer>
                          {(user.rotting_plague || user.epic_weakness || user.marrow_apocalypse) && (
                            <Image source={require('../assets/sickness.jpeg')} />
                          )}
                        </CenteredSicknessIconContainer>

                        <CenteredCursedIconContainer>
                          {(user.ethazium) && (
                            <CursedImage source={require('../assets/ethaziumed.png')} />
                          )}
                        </CenteredCursedIconContainer>

                        <ImageEthaziumButton onPress={() => ethazium(user)} isEthazium={user.ethazium} >
                          <ImageEthazium source={require('../assets/ethazium.png')} />
                        </ImageEthaziumButton>
                    </UserContainer>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C8A2C8',
    },
    container: {
      flex: 1,
      backgroundColor: '#C8A2C8',
    },
    modalText: {
      color: '#4c2882',
      fontSize: 22,
      fontWeight: 'bold',
      letterSpacing: -0.3,
      fontFamily: 'Tealand',
    },
  });

  const CenteredSicknessIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.68}px;
  top: ${Dimensions.get('window').height * 0.015}px;
`
  
const CenteredCursedIconContainer = styled.View`
  position: absolute;
  left: ${Dimensions.get('window').width * 0.68}px;
  top: ${Dimensions.get('window').height * 0.075}px;
`
  const View = styled.View`
    flex: 1;
    background: #C8A2C8;
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
  const NameText = styled.Text`
  margin-left: -6%;
  color: #4c2882;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;
  
  width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '100%')};
  overflow: hidden;
`;
const Avatar = styled.Image`
  width: 41%;
  height: 80px;
  border-radius: 40px;
  border-color: #4c2882;
  border-width: 3px;
`
const AvatarContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-left: -28%;
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
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-left: -15px;
  bottom: -20px;
  background-color: ${(props) => (props.isInsideTower ? '#10D24B' : 'red')};
  border: #4c2882;
`
const ImageEthaziumButton = styled.TouchableOpacity`
  position: absolute;
  top: 27%;
  left: 80%;
  width: 15%;
  height: 50%;
  border-radius: 55px;
  overflow: hidden;
  border: ${(props) => (props.isEthazium ? 'none' : 'green')};
  background-color: ${(props) => (props.isEthazium ? 'gray' : 'rgba(255, 255, 255, 0.8)')};
  opacity: ${(props) => (props.isEthazium ? 0.5 : 1)};
  border: darkgreen;
`;

const ImageEthazium = styled.Image`
height: 100%;
width: 100%;
border-radius: 5px;
border-width: 1px;
border-color: green;
`;

const NameContainer = styled.View`
  justify-content: center;
  align-items: start;
  display: flex; 
  margin-left: -10%;
  width: 45%;
`
const Image = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`
const CursedImage = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`

  export default Angelo;