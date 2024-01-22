import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { Modal, StyleSheet, TouchableOpacity} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";

const Angelo = () => {

    const { userGlobalState,   handleUserGlobalState }    = useContext(Context);
    const { usersGlobalState,  handleUsersGlobalState }   = useContext(Context);
  
    const [selectedUser, setSelectedUser] = useState(null);
    // const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const acolitos = usersGlobalState.filter(user => user.role === "ACÓLITO");

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
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
                    <NameText>{user.username}</NameText>
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
    margin-left: 15px;
    color: #4c2882;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
  const HeaderText = styled.Text`
    bottom: -15px;
    color: #4c2882;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
  `
  const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    margin-left: 10px;
    padding:1px;
    border-radius: 40px;
    border-color: #4c2882;
    border-width: 3px;
  `
  const AvatarContainer = styled.View`
    flex-direction: row;
    align-items: center;
  `
  const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    height: 110px;
    border: #4c2882;
    bottom: -40px;
    background-color: #d9a9c9;
  `

  export default Angelo;