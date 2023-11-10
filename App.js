import 'react-native-gesture-handler';
import React , {useState, useEffect} from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { CreatePotions }from './screens/CreatePotions';
import Splash from './components/Splash';
import Login from './screens/Login';
import Qr from './screens/Qr';
import ProfileMortimer from './screens/ProfileMortimer';
import Villano from './screens/Villano';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@react-native-firebase/auth';
import ScanQr from './screens/ScanQr';
import Torreon from './screens/Torreon';
import Mortimer from './screens/Mortimer';
import ProfileVillano from './screens/ProfileVillano';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App =  () => {
  const Tab = createMaterialTopTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {

    const getData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        console.log(email); 
        const role = await AsyncStorage.getItem('userRole');
        console.log(role);
        const id = await AsyncStorage.getItem('userID')
        setRole(role); // Almacena el rol del usuario en el estado
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        
      } catch (e) {
        // error reading value
      }
      console.log('Done get.')
    };

  getData();
  }, []); 


  const handleLogin = async () => {
    // Realiza la lógica de autenticación
    setRole(role);
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };

  return(
    <SafeAreaProvider>
      <View style = {{ flex: 1}}>
      <Splash/>
        {!isAuthenticated && (
          // <Modal
          //     animationType="slide"
          //     transparent={false}
          //     visible={isLoginModalVisible}
          //     onRequestClose={() => {
          //       setLoginModalVisible(false); 
          //     }}
          //   >
          //    <View style={styles.modalContainer}>
          //    <Login onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />
          //     </View>
          //   </Modal>
          // )}
          // {isAuthenticated && ( 
              <>
            <Header/>  
        
          <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route}) => ({
                  swipeEnabled: true,
                  tabBarStyle: { backgroundColor:'#C8A2C8'}, 
                  tabBarIndicatorStyle: {backgroundColor: "#4c2882",},
                  tabBarActiveTintColor: '#4c2882',
                  tabBarInactiveTintColor: '#913595',
                  tabBarShowLabel: false,
                  tabBarShowIcon: true,
                tabBarIcon: ({focused, color,}) => {
                  let iconName;
                  if(route.name === 'Home' & role === 'ACÓLITO') iconName = 'home'

                else if(route.name === 'Home' & role === 'JACOB') iconName = 'home'
                else if (route.name === 'Qr' && role === 'ACÓLITO') iconName = 'qr-code-2';
                else if (route.name === 'ScanQr' && role === 'JACOB') iconName = 'qr-code-scanner';
                else if (route.name === 'Mortimer' && role === 'MORTIMER') iconName = 'people';
                else if (route.name === 'Villano' && role === 'VILLANO') iconName = 'people';
                // else if(route.name === 'CreatePotions') iconName = 'bolt'
                else if(route.name === 'Torreon') iconName = 'castle';
                else if(route.name === 'Profile') iconName = 'person';
                else if (route.name === 'ProfileMortimer' && role === 'MORTIMER') iconName = 'person';
                else if (route.name === 'ProfileVillano' && role === 'VILLANO') iconName = 'person';


                else if(route.name === 'readQR') iconName = 'qr-code-2'

                return <Icon name = {iconName} size={26} color={color} />
                  },
              })}
            >
            
            {role === 'ACÓLITO' && <Tab.Screen name = "Home" component={Home} />}
            {role === 'JACOB' && <Tab.Screen name = "Home" component={Home} />}
            {role === 'MORTIMER' && <Tab.Screen name = "Mortimer" component={Mortimer} />}
            {role === 'VILLANO' && <Tab.Screen name = "Villano" component={Villano} />}
            {role === 'ACÓLITO' && <Tab.Screen name = "Qr" component={Qr} />}
            {role === 'JACOB' && <Tab.Screen name = "ScanQr" component={ScanQr} />}
            {/* {role === 'ACÓLITO' && <Tab.Screen name = "CreatePotions" component={CreatePotions} />} */}
            {role === 'ACÓLITO' && <Tab.Screen name = "Torreon" component={Torreon} />}
            {role === 'ACÓLITO' && <Tab.Screen name = "Profile" component={Profile} />}
            {role === 'MORTIMER' && <Tab.Screen name = "ProfileMortimer" component={ProfileMortimer} />}

            {/* <Tab.Screen name = "readQR" component={ScanQr} /> */}

          
        

            </Tab.Navigator>
          </NavigationContainer>
          </>
            )}
       </View>
</SafeAreaProvider>
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


export default App