import React , {useState, useEffect} from "react";
import styled from "styled-components/native";
import { Modal , StyleSheet,Image} from "react-native";
import axios from "axios";

const Mortimer = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function getUsersFromDatabase() {
        try {
          const url = 'https://mmaproject-app.fly.dev/api/users';
          
          const response = await axios.get(url);
          const users = response.data.data;
          setUsers(users);
          console.log('Usuarios:', users);
          console.log(users[2].email);
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
        }
      }
  
      getUsersFromDatabase();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text>ACÓLITOS</Text>
        {users.map((data) => (
          <UserContainer key={data.picture}>
            <Avatar source={{ uri: data.picture }}/>
            <NameText>{data.username}</NameText>
          </UserContainer>
        ))}
      </View>
    );
  };
  
const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100px;
  border: #4c2882;
  bottom: -40px;
  backgroundColor: #D9A9C9;
`;

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
const Text = styled.Text `
  bottom: -17px;
  color: #4c2882;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const NameText = styled.Text `
  margin-left: 15px;
  color: #4c2882;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  margin-left: 10px;
  padding:1px;
  border-radius: 35px;
  border: #4c2882;
  borderWidth: 3px;
`
export default Mortimer;