import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import styled from "styled-components/native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Splash from './components/Splash';
import LoginModal from './components/LoginModal';
import { Modal } from "react-native";
import Qr from './screens/Qr';
import Villano from './screens/Villano';
import Angelo from './screens/Angelo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@react-native-firebase/auth';
import ScanQr from './screens/ScanQr';
import Torreon from './screens/Torreon';
import Mortimer from './screens/Mortimer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from './screens/Geolocation';
import { Context } from './context/Context';
import GeolocationMortimer from './screens/GeoMortimer';
import SocketListener from './socket/socketEvents';
import { socket } from './socket/socketConnect';
import axiosInit from './axios/axiosInstance';

const App = () => {

  //STATES
  const Tab = createMaterialTopTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [role, setRole] = useState(null);
  const [globalState, setGlobalState] = useState({ dinero: 20, fatigue: 40 });
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userGlobalState, setUserGlobalState] = useState();
  const [usersGlobalState, setUsersGlobalState] = useState(null);
  const [artifactsGlobalState, setArtefactsGlobalState] = useState();
  const [materialsGlobalState, setMaterialsGlobalState] = useState();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [pendingTextGlobalState, setPendingTextGlobalState] = useState(null);
  const [inventorySlot, setInventorySlot] = useState([]);
  const [modalEthaziumVisible, setEthaziumModalVisible] = useState(false);
  const [modalRottingVisible, setRottingModalVisible] = useState(false);
  const [modalEpicVisible, setEpicModalVisible] = useState(false);
  const [modalMarrowVisible, setMarrowModalVisible] = useState(false);
  const [selectingUser, setSelectingUser] = useState();

  //GLOBAL STATES
  const handleGlobalState = (data) => {
    setGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  const handleUserGlobalState = (data) => {
    setUserGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  const handleUsersGlobalState = (data) => {
    setUsersGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  const handleArtefactsGlobalState = (data) => {
    setArtefactsGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }
  const handleMaterialsGlobalState = (data) => {
    setMaterialsGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  const handleUserSelected = (data) => {
    setSelectingUser(globalState => ({
      ...globalState,
      ...data
    }));
  }

  const handleInventorySlot = (data) => {
    setInventorySlot(globalState => ({
      ...globalState,
      ...data
    }));
  }

  //Para cargar por primera vez todos los datos necesaios
  useEffect(() => {
    if (userGlobalState != null) {
      setRole(userGlobalState.role);
    }
  }, [userGlobalState]);

  //Para cargar por primera vez todos los datos necesaios
  useEffect(() => {
    getInitialData();
    if (isAuthenticated) {
      console.log("Conexion con Socket En cliente Mediante Auth correcta")
      socket.onAny((event, ...args) => setCurrentEvent({ event, value: args[0] }));
      return () => {
        socket.removeAllListeners();
      };
    }
  }, [isAuthenticated]);

  //AXIOS INTERCEPTORS
  useEffect(() => {
    axiosInit();
  }, []);

  // El use effect se llama cuando el argumento, en este caso useGlobalState, se cambia.
  useEffect(() => {

    // console.log(userGlobalState.username);
    // console.log(usersGlobalState);
    // console.log(artifactsGlobalState);
  }, [userGlobalState, usersGlobalState, artifactsGlobalState, materialsGlobalState])

  // useEffect para manejar la apertura automática del modal Ethazium
  useEffect(() => {

    const rottingUser = userGlobalState?.rotting_plague

    if (rottingUser && usersGlobalState) {
      openRottingModal();

      const timeoutId = setTimeout(() => {
        closeRottingModal();
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [userGlobalState, usersGlobalState]);

  // useEffect para manejar la apertura automática del modal Ethazium
useEffect(() => {
  const ethaziumUser = userGlobalState?.ethazium;

  if (ethaziumUser && usersGlobalState) {
    openEthaziumModal();

    const timeoutId = setTimeout(() => {
      closeEthaziumModal();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }
}, [userGlobalState, usersGlobalState]);

// useEffect para manejar la apertura automática del modal Ethazium
useEffect(() => {
  // Verifica que el usuario actual tenga epic igual a true
  const epicUser = userGlobalState?.epic_weakness;

  if (epicUser && usersGlobalState) {
    openEpicModal();

    const timeoutId = setTimeout(() => {
      closeEpicModal();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }
}, [ userGlobalState, usersGlobalState]);

// useEffect para manejar la apertura automática del modal Ethazium
useEffect(() => {
 
  const marrowUser = userGlobalState?.marrow_apocalypse;
  
  if (marrowUser && usersGlobalState) {
    openMarrowModal();

    const timeoutId = setTimeout(() => {
      closeMarrowModal();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }
}, [userGlobalState, usersGlobalState]);

const openEthaziumModal = () => {
  setEthaziumModalVisible(true);
};

const closeEthaziumModal = () => {
  setEthaziumModalVisible(false);
};

const openRottingModal = () => {
  setRottingModalVisible(true);
};

const closeRottingModal = () => {
  setRottingModalVisible(false);
};

const openMarrowModal = () => {
  setMarrowModalVisible(true);
};

const closeMarrowModal = () => {
  setMarrowModalVisible(false);
};

const openEpicModal = () => {
  setEpicModalVisible(true);
};

const closeEpicModal = () => {
  setEpicModalVisible(false);
};

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

  // Maneja el login
  const handleLogin = async () => {
    setRole(role);3
    setIsAuthenticated(true);
    setLoginModalVisible(false);
    setIsLoggedIn(false);
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
      case 'Angelo':
        iconName = role === 'MORTIMER' || role === 'ANGELO' || role === 'VILLANO' ? 'people' : null;
        break;
      case 'Torreon':
        iconName = 'castle';
        break;
      case 'Profile': iconName = 'person';
        break;
      case 'GeolocationUser':setRottingModalVisible
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
            <Tab.Screen name="GeolocationMortimer" component={GeolocationMortimer} />
          </>
        );
      case 'VILLANO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Villano" component={Villano} />
          </>
        );
      case 'ANGELO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Villano" component={Angelo} />
          </>
        );
      default:            
        return null;
    }
  };

  return (
    <Context.Provider value={{
      globalState, userGlobalState, usersGlobalState, artifactsGlobalState, pendingTextGlobalState, materialsGlobalState, inventorySlot,selectingUser,
      handleGlobalState, handleUserGlobalState, handleUsersGlobalState, handleArtefactsGlobalState, handleMaterialsGlobalState, handleInventorySlot,handleUserSelected,
      setUserGlobalState, setUsersGlobalState, setArtefactsGlobalState, setPendingTextGlobalState, setMaterialsGlobalState, setInventorySlot,setSelectingUser,

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
                    tabBarStyle: { backgroundColor: '#000000' },
                    tabBarIndicatorStyle: { backgroundColor: "#B01AFF", },
                    tabBarActiveTintColor: 'rgba(146, 3, 240, 1.0)',
                    tabBarInactiveTintColor: 'rgba(146, 3, 240, 0.55)',
                    tabBarShowLabel: false,
                    tabBarShowIcon: true,
                    tabBarIcon: ({ focused, color }) => renderTabIcon(route, role, color),
                  })}
                >
                  {renderTabScreens()}
                </Tab.Navigator>
              </NavigationContainer>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEthaziumVisible}
                onRequestClose={closeEthaziumModal}
            >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('./assets/ethaziumAcolit.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>YOU HAVE BEEN INFECTED BY THE ETHAZIUM CURSE</CloseText>
                    </View>
                  </ImageBackground>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRottingVisible}
                onRequestClose={closeRottingModal}
            >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('./assets/ethaziumed.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>YOU HAVE BEEN INFECTED BY ROTTING_PLAGUE</CloseText>
                    </View>
                  </ImageBackground>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEpicVisible}
                onRequestClose={closeEpicModal}
            >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('./assets/epicweakness.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>YOU HAVE BEEN INFECTED BY EPIC_WEAKNESS</CloseText>
                    </View>
                  </ImageBackground>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMarrowVisible}
                onRequestClose={closeMarrowModal}
            >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('./assets/marrow.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>YOU HAVE BEEN INFECTED BY MARROW_APOCALYPSE</CloseText>
                    </View>
                  </ImageBackground>
                </View>
            </Modal>
              {/* <Modals/> */}
              
            </>
          )}
        </View>
      </SafeAreaProvider>
      <SocketListener currentSocketEvent={currentEvent} />
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

  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CloseText = styled.Text`
  color: darkgreen;
  font-size: 40px;
  flex-direction: row;
  bottom: 65%;
  font-family: 'Tealand';
  text-shadow: 3px 3px 8px white;
`;

export default App;