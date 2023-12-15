import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LoginModal from "../components/LoginModal";
import { Modal, StyleSheet, ImageBackground } from "react-native";
import { Context } from "../context/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [role, setRole] = useState(role);
  const { userGlobalState, handleUserGlobalState } = useContext(Context);

  useEffect(() => {
    // Configura Google Sign-In solo una vez al cargar el componente
    GoogleSignin.configure({
      webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
    });
    getRoleFromAsyncStorage();
  }, []);


  const handleLogin = () => {

    setIsAuthenticated(true);
    setRole(role);
    setLoginModalVisible(false);
  };

  const getRoleFromAsyncStorage = async () => {
    const storedRole = await AsyncStorage.getItem('userRole');
    // console.log(storedRole);
    setRole(storedRole);

  };
  async function onSignOutButtonPress() {
    try {
      // console.log(userGlobalState.username);
      await GoogleSignin.revokeAccess(); // Revoca el acceso de Google
      await GoogleSignin.signOut(); // Cierra sesión de Google
      await auth().signOut(); // Cierra sesión de Firebase (si estás utilizando Firebase)
      setRole(null); // Actualiza el estado del usuario autenticado
      // console.log('Cerró sesión de Google');
      // console.log("role" ,role);
      setIsAuthenticated(false);
      setLoginModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>

      {!isAuthenticated && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isLoginModalVisible}
          onRequestClose={() => {
            setLoginModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <LoginModal onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />
          </View>
        </Modal>
      )}

      {isAuthenticated && (
        <>
          <ImageBackground source={require("../assets/wallpaper_home.jpeg")} style={styles.container}>

              <Text>{role}</Text>

            <SignOutButton onPress={onSignOutButtonPress}>
              <ButtonText>Sign Out</ButtonText>
            </SignOutButton>
          </ ImageBackground>
        </>)}
    </View>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  },
});


const View = styled.View`
    flex: 1;
    background: #000000;

`
const Text = styled.Text`
    color: purple;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const SignOutButton = styled.TouchableOpacity`
    background-color: rgba(232, 0, 0 , 0.6);
    justify-content: center;
    width: 50%;
    height: 7%;
    margin-top: 130%;
    border-radius: 60px;
    align-self: center;
`
const ButtonText = styled.Text`
    color: rgba(255,255,255,1);
    font-size: 20px;
    text-align: center;
`

export default Home