import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Splash from './components/Splash';
import LoginModal from './components/LoginModal';
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
import Geolocation from './screens/Geolocation';
import { Context } from './context/Context';
import GeolocationMortimer from './screens/GeoMortimer';
import axios from 'axios';

const App = () => {

  //STATES
  const Tab = createMaterialTopTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [role, setRole] = useState(null);
  const [globalState, setGlobalState] = useState({dinero: 20, fatigue: 40});
  
  const [userGlobalState, setUserGlobalState] = useState();
  const [usersGlobalState, setUsersGlobalState] = useState(null);
  const [artifactsGlobalState, setArtefactsGlobalState] = useState();
console.log("app" , artifactsGlobalState)

 const getArtifactsFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      const response = await axios.get(url);
      const artifactsData = response.data.data;
  
      // Actualizar los artefactos con la información de las imágenes del usuario
      const updatedArtifacts = await Promise.all(
        artifactsData.map(async (artifact) => {
          if (artifact.found) {
            const userImage = await getUserImageById(artifact.who);
            return { ...artifact, userImage };
          }
          return artifact;
        })
      );
     
      setArtefactsGlobalState(updatedArtifacts);
      
      console.log('Artefactos:', artifactsGlobalState);
    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    }
  };
   // función para obtener la imagen del usuario por su ID
   const getUserImageById = async (userId) => {
    try {
      const user = await axios.get(`https://mmaproject-app.fly.dev/api/users/${userId}`);
      const userPicture = user.data.data.picture;
      console.log(userPicture);
      return userPicture; // Devolvemos la URL de la imagen del usuario

  } catch (error) {
    console.error('Error al obtener la imagen del usuario:', error);
  }
};

  //GLOBAL STATES
  const handleGlobalState = (data) => {
    setGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  
  }

const handleUserGlobalState = (data) => {
  setUserGlobalState(globalState =>  ({
    ...globalState,
    ...data
    }));
  }

const handleUsersGlobalState = (data) => {
  setUsersGlobalState(globalState =>  ({
    ...globalState,
    ...data
    }));
  }

  const handleArtefactsGlobalState = (data) => {
    setArtefactsGlobalState(globalState =>  ({
      ...globalState,
      ...data
    }));
  
  }


  //Datos iniciales email role e id
  const getInitialData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const role = await AsyncStorage.getItem('userRole');
      const id = await AsyncStorage.getItem('userID');

      setRole(role);
      return { email, role, id };
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  //Para cargar por primera vez todos los datos necesaios
  useEffect(() => {
    getInitialData();
    getArtifactsFromDataBase()
  }, []);

  // El use effect se llama cuando el argumento, en este caso useGlobalState, se cambia.
  useEffect(() => {
    
    // console.log(userGlobalState.username);
    // console.log(usersGlobalState);
    console.log(artifactsGlobalState);

  },[userGlobalState, usersGlobalState, artifactsGlobalState])


  // Maneja el login
  const handleLogin = async () => {
    setRole(role);
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };

  //Renderiza los iconos del navegador
  const renderTabIcon = (route, role, color) => {
    let iconName;

    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Qr':
        iconName = role === 'ACÓLITO' ? 'qr-code-2' : null;
        break;

      case 'ScanQr':
        iconName = role === 'JACOB' ? 'qr-code-scanner' : null;
        break;

      case 'Mortimer':
      case 'Villano':
        iconName = role === 'MORTIMER' || role === 'VILLANO' ? 'people' : null;
        break;
      case 'Torreon':
        iconName = 'castle';
        break;
      case 'Profile':
      case 'ProfileMortimer':
      case 'ProfileVillano':
        iconName = 'person';
        break;
      case 'GeolocationUser':
      case 'GeolocationMortimer':
        iconName = role === 'ACÓLITO' || role === 'MORTIMER' ? 'map' : null;
        break;
      case 'roseta':
  

      default:
        iconName = null;
    }

    return iconName && <Icon name={iconName} size={26} color={color} />;
  };


  //renderiza las pestañas de navegacion
  const renderTabScreens = () => {
    switch (role) {
      case 'ACÓLITO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Qr" component={Qr} />
            <Tab.Screen name="Torreon" component={Torreon} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="GeolocationUser" component={Geolocation} />
          </>
        );
      case 'JACOB':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="ScanQr" component={ScanQr} />
          </>
        );
      case 'MORTIMER':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Mortimer" component={Mortimer} />
            <Tab.Screen name="ProfileMortimer" component={ProfileMortimer} />
            <Tab.Screen name="GeolocationMortimer" component={GeolocationMortimer} />
          </>
        );
      case 'VILLANO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Villano" component={Villano} />
            <Tab.Screen name="ProfileVillano" component={ProfileVillano} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Context.Provider value = {{
      globalState, userGlobalState, usersGlobalState, artifactsGlobalState,
      handleGlobalState, handleUserGlobalState, handleUsersGlobalState, handleArtefactsGlobalState,
      setUserGlobalState, setUsersGlobalState, setArtefactsGlobalState,
      
      }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Splash />
          {!isAuthenticated && <LoginModal onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />}
          {isAuthenticated && (
            <>
              <Header />
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    swipeEnabled: true,
                    tabBarStyle: { backgroundColor: '#C8A2C8' },
                    tabBarIndicatorStyle: { backgroundColor: "#4c2882" },
                    tabBarActiveTintColor: '#4c2882',
                    tabBarInactiveTintColor: '#913595',
                    tabBarShowLabel: false,
                    tabBarShowIcon: true,
                    tabBarIcon: ({ focused, color }) => renderTabIcon(route, role, color),
                  })}
                >
                  {renderTabScreens()}
                </Tab.Navigator>
              </NavigationContainer>
            </>
          )}
        </View>
      </SafeAreaProvider>
    </Context.Provider>
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