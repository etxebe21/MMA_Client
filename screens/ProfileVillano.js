import React , {useState, useEffect} from "react";
import styled from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Login from "./Login";
import { Modal , StyleSheet} from "react-native";

const ProfileVillano = () => {
    const [user, setUser] = useState(null); // Agrega un estado para almacenar el usuario autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(true);
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        // Configura Google Sign-In solo una vez al cargar el componente
        GoogleSignin.configure({
            webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
        });      
    }, []);

    const handleLogin = () => {
       
        setIsAuthenticated(true);
        setUser(user);
        console.log("user", user);
        setRole(role);
        setLoginModalVisible(true);
      };

    async function onSignOutButtonPress() {
        try {
            await GoogleSignin.revokeAccess(); // Revoca el acceso de Google
            await GoogleSignin.signOut(); // Cierra sesión de Google
            await auth().signOut(); // Cierra sesión de Firebase (si estás utilizando Firebase)
            setRole(null); // Actualiza el estado del usuario autenticado
            setUser(null);
            console.log('Cerró sesión de Google');
            console.log("role" ,role);
            console.log("user", user);
            setLoginModalVisible(true);
            setIsAuthenticated(false);

        
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <View>
            <Text>VILLANO</Text>
            <SignOutButton onPress={onSignOutButtonPress}>{!isAuthenticated && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isLoginModalVisible}
                    onRequestClose={() => {
                    setLoginModalVisible(false); 
                    }}
                >
                <View style={styles.modalContainer}>
                <Login onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />
                    </View>
                </Modal>
                )}
                <ButtonText>Sign Out</ButtonText>
            </SignOutButton>
        </View>  
    )
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
const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const SignOutButton = styled.TouchableOpacity`
    background-color: #FF0000;
    padding: 10px 20px;
    bottom: -400px;
    width: 50%;
    height: 55px;
    border-radius: 60px;
    align-self: center;
`
const ButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;
`

export default ProfileVillano;