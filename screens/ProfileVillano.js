import React , {useState, useEffect, useContext} from "react";
import styled from "styled-components/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Modal, StyleSheet} from "react-native";
import LoginModal from "../components/LoginModal";
import { Context } from "../context/Context";

const ProfileVillano = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [role, setRole] = useState(null);
    const {globalState, handleGlobalState} = useContext(Context);

    useEffect(() => {
        // Configura Google Sign-In solo una vez al cargar el componente
        GoogleSignin.configure({
            webClientId: '769950438406-pm146gcnl6923e2nivi7ledskljt423l.apps.googleusercontent.com',
        });      
    }, []);

    const handleLogin = () => {
       
        setIsAuthenticated(true);
        setRole(role);
        setLoginModalVisible(false);
      };

    const setStamina = () => {
        globalState.fatigue = 100;
    };

    async function onSignOutButtonPress() {
        try {
            await GoogleSignin.revokeAccess(); // Revoca el acceso de Google
            await GoogleSignin.signOut(); // Cierra sesión de Google
            await auth().signOut(); // Cierra sesión de Firebase (si estás utilizando Firebase)
            setRole(null); // Actualiza el estado del usuario autenticado
            // console.log('Cerró sesión de Google');
            // console.log("role" ,role);
            setLoginModalVisible(true);
            setIsAuthenticated(false);
        
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <View>

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
            <Text>VILLANO</Text>
            {/* <SetButton  onPress={() => setStamina()}> 
                <Text> Stamina </Text>
            </SetButton>  */}
            <SignOutButton onPress={onSignOutButtonPress} setLoginModalVisible={setLoginModalVisible}>
            <ButtonText>Sign Out</ButtonText>
            </SignOutButton>
        </>
           )}          
        </View>  
    )
}


const SetButton = styled.TouchableOpacity`
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  justify-content: center;
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