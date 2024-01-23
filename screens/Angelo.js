import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity, ToastAndroid} from "react-native";
import { ScrollView } from "react-native";
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect'

const Angelo = () => {

    const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acolitos, setAcolitos] = useState([]);

    useEffect(() => {
      setAcolitos(usersGlobalState.filter(user => user.role === "ACÓLITO"));
    }, [usersGlobalState]);

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
      const updatedAcolitos = acolitos.map(user =>
        user._id === ethaziData.id ? { ...user, ethazium: true } : user
      );
      setAcolitos(updatedAcolitos);

      socket.emit('Ethazium', ethaziData);
      ToastAndroid.showWithGravity('MALDICIÓN ETHAZIUM INVOCADA', ToastAndroid.SHORT, ToastAndroid.CENTER);

      // socket.on('ethaziumUser', (responseData) => {
      //   console.log('Usuario modificadoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:', responseData);
      //   });
  };
    
    return(

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                <HeaderText>ACÓLITOS</HeaderText>
                {acolitos.map((user) => (
                    <TouchableOpacity key={user.picture} onPress={() => handleUserPress(user)}>
                    <UserContainer>
                        <AvatarContainer>
                            <Avatar source={{ uri: user.picture }} />
                            <StatusIndicator isInsideTower={user.insideTower} />
                        </AvatarContainer>

                        <NameContainer>
                          <NameText>{user.username}</NameText>
                        </NameContainer>

                        <ImageEthaziumButton onPress={() => ethazium(user)}>
                          <ImageEthazium source={require('../assets/ethazium.png')} />
                        </ImageEthaziumButton>

                    </UserContainer>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    margin-left: -6%;
    color: #4c2882;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
  const HeaderText = styled.Text`
    bottom: 1%;
    color: #4c2882;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
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
    margin-left: -24%;
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
    top: 20%; 
    left: 80%; 
    width: 20%;
    height: 50%;
  `;

  const ImageEthazium = styled.Image`
    border-radius: 5px;
    border: green;
    height: 120%;
    width: 80%;
  `;

  const NameContainer = styled.View`
    justify-content: center;
    align-items: start;
    display: flex; 
    margin-left: -10%;
    width: 45%;
`

  export default Angelo;