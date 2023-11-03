import React , {useState, useEffect} from "react";
import styled from "styled-components/native";
import { Modal , StyleSheet} from "react-native";
import axios from "axios";

const Mortimer = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function getUsersFromDatabase() {
        try {
          const url = 'https://mmaproject-app.fly.dev/api/users';
          const response = await axios.get(url);
          const users = response.data; 
          setUsers(users);
          console.log('Usuarios:', users);
          const email = users.email;
          console.log(email);
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
        }
      }
  
      getUsersFromDatabase();
    }, []); 
  
    return (
        <View style={styles.container}>
        <Text>ACÓLITOS</Text>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <Text key={user.picture}>{user.username}</Text> // Ajusta esto según las propiedades de tu objeto de usuario
          ))
        ) : (
          <Text>No hay usuarios disponibles.</Text>
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
  });
  
const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`
const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
export default Mortimer;