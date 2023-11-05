import React , {useState, useEffect} from "react";
import styled from "styled-components/native";
import { Modal , StyleSheet, TouchableOpacity, TextInput as RNTextInput} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";

const Mortimer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(selectedUser || {});



  useEffect(() => {
    async function getUsersFromDatabase() {
      try {
        const url = 'https://mmaproject-app.fly.dev/api/users';
        
        const response = await axios.get(url);
        const users = response.data.data;
        setUsers(users);
        console.log('Usuarios:', users);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    getUsersFromDatabase();
  }, []);

  const acolitos = users.filter(user => user.role === "ACÓLITO");
 
  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
    setSelectedUser(user);
    setEditModalVisible(true);

  };
  
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  
  const handleEditUserConfirm = async () => {
    try {
      // Realiza una solicitud PUT al servidor para actualizar los datos del usuario
      const response = await axios.put(`https://mmaproject-app.fly.dev/api/users/${selectedUser._id.toString()}`, editedUser);

      // Maneja la respuesta del servidor según tus necesidades
      console.log('Datos del usuario actualizados:', response.data);
      // Cierra el modal de edición
      closeEditModal();
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <Text>ACÓLITOS</Text>
        {acolitos.map((data) => (
          <TouchableOpacity key={data.picture} onPress={() => handleUserPress(data)}>
            <UserContainer>
              <AvatarContainer>
                <Avatar source={{ uri: data.picture }} />
                <StatusIndicator isInsideTower={data.insideTower} />
              </AvatarContainer>
              <NameText>{data.username}</NameText>
            </UserContainer>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedUser && (
          <Modal visible={modalVisible}>
            <ModalContent>
              <Avatar source={{ uri: selectedUser.picture }} style={{width: 90, height: 90, borderRadius:45}}/>
              <Text>{selectedUser.username}</Text>
              <Text>Level: {selectedUser.level}</Text>
              <Text>Hitpoints: {selectedUser.hitPoints}</Text>
              <Text>Fuerza: {selectedUser.fuerza}</Text>
              <Text>Dinero: {selectedUser.dinero}</Text>
              <Text>Cansancio: {selectedUser.cansancio}</Text>
              <Text>Fuerza: {selectedUser.fuerza}</Text>
              <Text>Resistencia: {selectedUser.resistencia}</Text>
              <Text>Agilidad: {selectedUser.agilidad}</Text>
              <Text>Inteligencia: {selectedUser.inteligencia}</Text>
              <Text>Ceguera: {selectedUser.ceguera ? "Sí" : "No"}</Text>
              <Text>Hambruna: {selectedUser.hambruna ? "Sí" : "No"}</Text>
              <Text>Locura: {selectedUser.locura ? "Sí" : "No"}</Text>
              <Text>Miedo: {selectedUser.miedo ? "Sí" : "No"}</Text>
              <Text>Parálisis: {selectedUser.parálisis ? "Sí" : "No"}</Text>
              <Text>Psicosis: {selectedUser.psicosis ? "Sí" : "No"}</Text>
              <Text>Role: {selectedUser.role}</Text>
              <Text>Torreón: {selectedUser.insideTower ? "Sí" : "No"}</Text>
                    
              <CloseButton onPress={() => setModalVisible(false)}>
                <ButtonText>Close</ButtonText>
              </CloseButton>
              <EditButton onPress={() => handleEditUser(selectedUser)}>
                <ButtonText>Editar</ButtonText>
              </EditButton>
            </ModalContent>
          </Modal>
      )}

      {selectedUser && (
        <Modal visible={editModalVisible}>
          <EditModalContent>
          <InputRow>
            <Label>Username</Label>
            <TextInput
              value={editedUser.username || ''} // Usa el valor actual del usuario o cadena vacía si no existe
              onChangeText={(text) => setEditedUser({ ...editedUser, username: text })}
            /> 
          </InputRow>
          <InputRow>
            <Label>Level:</Label>
            <TextInput
              value={String(editedUser.level)}
              onChangeText={(text) => setEditedUser({ ...editedUser, level: text })}
            />
          </InputRow>
          <InputRow>
            <Label>Hitpoints:</Label>
            <TextInput
              value={String(editedUser.hitPoints)}
              onChangeText={(text) => setEditedUser({ ...editedUser, hitPoints: text})}
            />
          </InputRow>
                    <InputRow>
            <Label>Fuerza:</Label>
            <TextInput
              value={String(editedUser.fuerza)}
              onChangeText={(text) => setEditedUser({ ...editedUser, fuerza: text })}
            />
          </InputRow>

          <InputRow>
            <Label>Dinero:</Label>
            <TextInput
              value={String(editedUser.dinero)}
              onChangeText={(text) => setEditedUser({ ...editedUser, dinero: text })}
            />
          </InputRow>

          <InputRow>
            <Label>Cansancio:</Label>
            <TextInput
              value={String(editedUser.cansancio)}
              onChangeText={(text) => setEditedUser({ ...editedUser, cansancio: text })}
            />
          </InputRow>

          <InputRow>
            <Label>Resistencia:</Label>
            <TextInput
              value={String(editedUser.resistencia)}
              onChangeText={(text) => setEditedUser({ ...editedUser, resistencia: text })}
            />
          </InputRow>

          <InputRow>
            <Label>Agilidad:</Label>
            <TextInput
              value={String(editedUser.agilidad)}
              onChangeText={(text) => setEditedUser({ ...editedUser, agilidad: text })}
            />
          </InputRow>

          {/* <InputRow>
            <Label>Inteligencia:</Label>
            <TextInput
              placeholder="Inteligencia"
              keyboardType="numeric"
              value={String(editedUser.inteligencia)}
              onChangeText={(text) => setEditedUser({ ...editedUser, inteligencia: parseInt(text, 10) })}
            />
          </InputRow>
          <InputRow>
            <Label>Ceguera:</Label>
            <TextInput
              placeholder="Ceguera"
              keyboardType="numeric"
              value={editedUser.ceguera ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, ceguera: text === "1" })}
            />
          </InputRow>

          <InputRow>
            <Label>Hambruna:</Label>
            <TextInput
              placeholder="Hambruna"
              keyboardType="numeric"
              value={editedUser.hambruna ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, hambruna: text === "1" })}
            />
          </InputRow>

          <InputRow>
            <Label>Locura:</Label>
            <TextInput
              placeholder="Locura"
              keyboardType="numeric"
              value={editedUser.locura ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, locura: text === "1" })}
            />
          </InputRow>

          <InputRow>
            <Label>Miedo:</Label>
            <TextInput
              placeholder="Miedo"
              keyboardType="numeric"
              value={editedUser.miedo ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, miedo: text === "1" })}
            />
          </InputRow>

          <InputRow>
            <Label>Parálisis:</Label>
            <TextInput
              placeholder="Parálisis"
              keyboardType="numeric"
              value={editedUser.parálisis ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, parálisis: text === "1" })}
            />
          </InputRow>

          <InputRow>
            <Label>Psicosis:</Label>
            <TextInput
              placeholder="Psicosis"
              keyboardType="numeric"
              value={editedUser.psicosis ? "1" : "0"}
              onChangeText={(text) => setEditedUser({ ...editedUser, psicosis: text === "1" })}
            />
          </InputRow> */}

          <InputRow>
            <Label>Role:</Label>
            <TextInput
              placeholder="Role"
              value={editedUser.role}
              onChangeText={(text) => setEditedUser({ ...editedUser, role: text })}
            />
          </InputRow>
            <CloseButton onPress={closeEditModal}>
              <ButtonText>Cancelar</ButtonText>
            </CloseButton>
            <ConfirmButton onPress={handleEditUserConfirm}>
              <ButtonText>Confirmar</ButtonText>
            </ConfirmButton>
          </EditModalContent>
        </Modal>
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
  bottom: -17px;
  color: #4c2882;
  font-size: 22px;
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
const StatusIndicator = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-left: -15px;
  bottom: -20px;
  background-color: ${(props) => (props.isInsideTower ? '#10D24B' : 'red')};
  border: #4c2882;
`
const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #d9a9c9;
`
const CloseButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -30px;
    width: 50%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`
const ButtonText = styled.Text `
  color: #FFFFFF;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;  
`
const EditButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -30px;
    width: 50%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`
const EditModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #d9a9c9;
`
const TextInput = styled(RNTextInput)`
  width: 50%;
  height: 40px;
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #4c2882;
  border-radius: 5px;
  font-size: 16px;
  color: #4c2882;
`;
const ConfirmButton = styled.TouchableOpacity`
    background-color: #4c2882;
    padding: 10px 20px;
    bottom: -30px;
    width: 50%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`
const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #4c2882;
  margin-right: 10px;
`;
export default Mortimer;