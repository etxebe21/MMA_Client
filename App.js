import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';


const App = () => {

  //STATES
  const Tab = createMaterialTopTabNavigator();
  // const Tab = createBottomTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [role, setRole] = useState(null);
  const [globalState, setGlobalState] = useState({ dinero: 20, fatigue: 40 });
  const [currentModal, setCurrentModal] = useState(null);

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
  const [rottingUserPrev, setRottingUserPrev] = useState();
  const [epicUserPrev, setEpicUserPrev] = useState();
  const [ethaziumUserPrev, setEthaziumUserPrev] = useState();
  const [marrowUserPrev, setMarrowUserPrev] = useState();


  const [enableModalEthazium, setEnableModalEthazium] = useState(false);
  const [enableEpicWeak, setEnableEpicWeak] = useState(false);
  const [enableRottingPlague, setEnableRottingPlague] = useState(false);
  const [enableMarrow, setEnableMarrow] = useState(false);

  const [disableModalEthazium, setDisableModalEthazium] = useState(true);
  const [disableEpicWeak, setDisableEpicWeak] = useState(true);
  const [disableRottingPlague, setDisableRottingPlague] = useState(true);
  const [disableMarrow, setDisableMarrow] = useState(true);




  const timerIdRef = useRef(null);

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


  //ETHAZIUM
  useEffect(() => {
    if (userGlobalState != undefined) {
      if (userGlobalState.ethazium === true && disableModalEthazium === true) {
        setDisableModalEthazium(false);
        setTimeout(() => {
          setEnableModalEthazium(false);
        }, 4000);

      }

      //MARROW
      else if (userGlobalState.marrow_apocalypse === true && disableMarrow === true) {
        setEnableMarrow(true);
        setDisableMarrow(false);

        setTimeout(() => {
          setEnableMarrow(false);
        }, 4000);
      }

      //WEAK
      else if (userGlobalState.epic_weakness === true && disableEpicWeak === true) {
        setEnableEpicWeak(true);
        setDisableEpicWeak(false);

        setTimeout(() => {
          setEnableEpicWeak(false);
        }, 4000);
      }

      //ROTTING
      else if (userGlobalState.rotting_plague === true && disableRottingPlague === true) {
        setEnableRottingPlague(true);
        setDisableRottingPlague(false);
        console.log("entramoooooooooos");

        setTimeout(() => {
          setEnableRottingPlague(false);
        }, 4000);
      }

      //Si no entra en ningun if significa que no hay ninguna enfermedad por tanto todo tiene que estar deshabilitado
      else {
        if (userGlobalState.ethazium === false) {
          setDisableModalEthazium(true);
        }

        //MARROW
        else if (userGlobalState.marrow_apocalypse === true && disableMarrow === true) {
          setDisableMarrow(true);
        }

        //WEAK
        else if (userGlobalState.epic_weakness === true && disableEpicWeak === true) {
          setDisableEpicWeak(true);

        }

        //ROTTING
        else if (userGlobalState.rotting_plague === true && disableRottingPlague === true) {
          setDisableRottingPlague(true);
        }
      }
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

  useEffect(() => {
    const rottingUser = userGlobalState?.rotting_plague;
    const ethaziumUser = userGlobalState?.ethazium;
    const epicUser = userGlobalState?.epic_weakness;
    const marrowUser = userGlobalState?.marrow_apocalypse;

    const openAndCloseModal = (modalFunction, isOpen) => {
      // Cerrar el modal actual si existe
      closeAllModals();
      // Abrir el modal correspondiente
      modalFunction(isOpen);
      // Cerrar el modal después de 4 segundos
      const id = setTimeout(() => {
        modalFunction(false);
        closeAllModals();
      }, 3000);
      // Actualizar el ID del temporizador usando useRef
      timerIdRef.current = id;
    };

    // Verificar y abrir el modal según el estado de cada atributo del usuario
    if (rottingUser && !rottingUserPrev) {
      closeAllModals();
      openAndCloseModal(openRottingModal, true);
    } else if (ethaziumUser && !ethaziumUserPrev) {
      closeAllModals();
      openAndCloseModal(openEthaziumModal, true);
    } else if (epicUser && !epicUserPrev) {
      closeAllModals();
      openAndCloseModal(openEpicModal, true);
    } else if (marrowUser && !marrowUserPrev) {
      closeAllModals();
      openAndCloseModal(openMarrowModal, true);
    } else {
      // Cerrar todos los modales si ningún atributo es verdadero
      closeAllModals();
    }

    // Guardar el estado actual para la próxima comparación
    setRottingUserPrev(rottingUser);
    setEthaziumUserPrev(ethaziumUser);
    setEpicUserPrev(epicUser);
    setMarrowUserPrev(marrowUser);

    // Limpia el temporizador si el componente se desmonta o si hay un cambio en los estados de usuario
    return () => clearTimeout(timerIdRef.current);
  }, [userGlobalState, rottingUserPrev, ethaziumUserPrev, epicUserPrev, marrowUserPrev]);


const closeAllModals1 = () => {
    closeRottingModal();
    closeEthaziumModal();
    closeEpicModal();
    closeMarrowModal();
  };

  const closeAllModals = () => {
    closeRottingModal();
    closeEthaziumModal();
    closeEpicModal();
    closeMarrowModal();
  };

  const closeEthaziumModal = () => {
    //console.log('Closing Ethazium modal');
    setEthaziumModalVisible(false);
  };

  const closeRottingModal = () => {
    //console.log('Closing Rotting modal');
    setRottingModalVisible(false);
  };

  const closeEpicModal = () => {
    //console.log('Closing Epic modal');
    setEpicModalVisible(false);
  };

  const closeMarrowModal = () => {
    //console.log('Closing Marrow modal');
    setMarrowModalVisible(false);
  };

  const openEthaziumModal = () => {
    console.log('OPening Ethazium modal');
    setEthaziumModalVisible(true);
  };

  const openRottingModal = () => {
    console.log('OPening Rotting modal');
    setRottingModalVisible(true);
  };

  const openMarrowModal = () => {
    console.log('Opening Marrow modal');
    setMarrowModalVisible(true);
  };

  const openEpicModal = () => {
    console.log('Opening Epic modal');
    setEpicModalVisible(true);
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
    setRole(role);
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };

  //Renderiza los iconos del navegador
  const renderTabIcon = (route, role, color) => {
    let iconName;
    let iconSize = 30
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
      case 'GeolocationUser': setRottingModalVisible
      case 'GeolocationMortimer':
        iconName = role === 'ACÓLITO' || role === 'MORTIMER' ? 'map' : null;
        break;
      case 'roseta':


      default:
        iconName = null;
    }

    return iconName && (
      <View style={ styles.iconsStyle }>
        <Icon name={iconName} size={iconSize} color={color} />
      </View>
    );
  };


  //renderiza las pestañas de navegacion
  const renderTabScreens = () => {
    switch (role) {
      case 'ACÓLITO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Qr" component={Qr} options={{ headerShown: false }} />
            <Tab.Screen name="Torreon" component={Torreon} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Tab.Screen name="GeolocationUser" component={Geolocation} options={{ headerShown: false }} />
          </>
        );
      case 'JACOB':
        return (
          <>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="ScanQr" component={ScanQr} options={{ headerShown: false }} />
          </>
        );
      case 'MORTIMER':
        return (
          <>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Mortimer" component={Mortimer} options={{ headerShown: false }} />
            <Tab.Screen name="GeolocationMortimer" component={GeolocationMortimer} options={{ headerShown: false }}  />
          </>
        );
      case 'VILLANO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Villano" component={Villano} options={{ headerShown: false }} />
          </>
        );
      case 'ANGELO':
        return (
          <>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Villano" component={Angelo} options={{ headerShown: false }} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Context.Provider value={{
      globalState, userGlobalState, usersGlobalState, artifactsGlobalState, pendingTextGlobalState, materialsGlobalState, inventorySlot, selectingUser,
      handleGlobalState, handleUserGlobalState, handleUsersGlobalState, handleArtefactsGlobalState, handleMaterialsGlobalState, handleInventorySlot, handleUserSelected,
      setUserGlobalState, setUsersGlobalState, setArtefactsGlobalState, setPendingTextGlobalState, setMaterialsGlobalState, setInventorySlot, setSelectingUser,

    }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Splash />
          {!isAuthenticated && <LoginModal onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />}
          {isAuthenticated && (
            <>
              {/* <Header /> */}
              <NavigationContainer>
              <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarStyle: {
                      backgroundColor: 'rgba(20, 20, 20, 1)',
                      borderTopWidth: 0, 
                      borderRadius: 20,
                      position: 'absolute', 
                      display: 'flex',
                      marginLeft: 2,
                      left: 20,
                      right: 20,
                      bottom: 25,
                      height: 60, 
                    },
                    tabBarIndicatorStyle: { backgroundColor: "#FFFFFF",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '4%',
                    width: 25,  
                    borderRadius: 4,
                    top: 50,
                  },
                    tabBarActiveTintColor: 'rgba(255, 255, 255, 1.0)',
                    tabBarInactiveTintColor: 'rgba(146, 3, 240, 0.7)',
                    tabBarShowLabel: false,
                    tabBarShowIcon: true,
                    tabBarIcon: ({ focused, color }) => renderTabIcon(route, role, color),
                  })}
                >
                  {renderTabScreens()}
                </Tab.Navigator>
              </NavigationContainer>

              {enableModalEthazium && (
                <Modal
                  animationType="slide"
                  transparent={true}
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
              )}
              {enableRottingPlague && (
                <Modal
                  animationType="slide"
                  transparent={true}
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
              )}

              {enableEpicWeak && (
                <Modal
                  animationType="slide"
                  transparent={true}
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
              )}
              {enableMarrow && (

                <Modal
                  animationType="slide"
                  transparent={true}
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
              )}

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
  iconsStyle: {
    height: 40, 
    width: 40, 
    marginLeft: -10,
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'flex',
  }
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