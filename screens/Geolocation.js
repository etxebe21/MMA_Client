import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, PermissionsAndroid, Alert, ImageBackground, Image, View,ActivityIndicator,Animated } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Roseta from './Roseta';
import { Context } from '../context/Context';
import MapStyle from '../components/MapStyle.json'
import io, { Socket } from 'socket.io-client';

const GeolocationUser = () => {

  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  const { artifactsGlobalState, setArtefactsGlobalState} = useContext(Context);

  //const [artifactsGlobalStat, handleArtefactsGlobalState] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState([]);
  const [search, setSearches] = useState([]);
  const [showButton, setShowButton] = useState();
  const [collectedArtifacts, setCollectedArtifacts] = useState();
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  const [showPendingText, setShowPendingText] = useState(false);
  const [userId, setuserId] = useState([]);
  const [mapVisible, setMapVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const img = require("../assets/geofondo.png")

  useEffect(() => {
    
    // Crea una conexión al servidor de Socket.io al montar el componente
    const newSocket = io('https://mmaproject-app.fly.dev'); // Reemplaza con la URL de tu servidor Socket.io

    // Escucha eventos desde el servidor
    newSocket.on('connect', () => {
      console.log('Conectado al servidor MMA de Socket.io');
    });
    setSocket(newSocket);

    // Enviar datos al servidor con el evento 'clientEvent'
    newSocket.emit('clientEvent', { data: 'Información a enviar al servidor' });

    // Escuchar la respuesta del servidor al evento 'responseEvent'
    newSocket.on('responseEvent', (responseData) => {
      console.log('Respuesta desde el servidor:', responseData);
    });
    newSocket.on('new_user', (level) => {
      console.log('Datos recibidos desde el servidor:', level);
    });

    // // Establece la instancia del socket en el estado
    setSocket(newSocket);

    newSocket.on('updateArtifacts',() => {
      console.log('Datos recibidos desde el servidor:', );
    });
    setSocket(newSocket);
    // Limpia la instancia del socket al desmontar el componente
    return () => {
      newSocket.disconnect(); // Desconecta el socket al desmontar el componente
    };
    
  }, []);

   // Función para emitir eventos al servidor
   const emitEventServer = () => {
    if (socket) {
      console.log("PULSADOOOO")
// Emitir un evento 'clientEvent' con datos al servidor
socket.emit('clientEvent', { message: 'Hola desde el cliente' });

  }
  };


  useEffect(() => {
    if (showPendingText) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,  // Ajusta la fricción para cambiar la velocidad de la animación
        tension: 40, // Ajusta la tensión para cambiar la velocidad de la animación
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 0,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [showPendingText, scaleAnim]);

   //EFFECT INICIAL
   useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization();
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED || Platform.OS === 'ios') {
            Geolocation.watchPosition(
              position => {
                setUserLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                console.log(latitude)
                sendLocationToServer(latitude, longitude);
              },
              (error) => {
                console.error('Error al obtener la ubicación:', error);
              },
              { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000, distanceFilter: 1 }
            );
          } else {
            console.log('Permiso de ubicación denegado');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
  //   const sendLocationToServer = async (latitude, longitude) => {
  //     try {
  //       // Envía la ubicación al servidor con alguna identificación del acólito
  //       await axios.patch(`https://mmaproject-app.fly.dev/api/users/updateUsers/${userId}`, {
  //         latitude,
  //         longitude
  //       });
  //       console.log("LATITUUUUD", latitude);
  //     } catch (error) {
  //       console.error('Error al enviar la ubicación al servidor:', error);
  //     }
  //   };
    
  getSearchesFromDataBase();
  requestLocationPermission();
  //   //getAndSendUserLocation();
  }, []);

  useEffect(() => {
    const getID = async () => {
      try {
        const userId = await AsyncStorage.getItem('userID')
        setuserId(userId);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        
      } catch (e) {
      }
    };

  getID();
  }, []); 

  //CUANDO recoges un artefacto se llama a este effect
  useEffect(() => {
    if (collectedArtifacts === 4) {
      setShowAnotherButton(true);
      setShowButton(false);
    } else {
      setShowAnotherButton(false);
    }
  }, [collectedArtifacts]);

  // Función para contar los artefactos encontrados
 const countFoundArtifacts = () => {
  const foundArtifacts = 4;
  console.log(foundArtifacts.length)
  return foundArtifacts.length;
};

//Actualizar el estado de visibilidad del botón
useEffect(() => {
  const foundCount = countFoundArtifacts();
  setShowAnotherButton(foundCount === 4);
  setShowButton(foundCount < 4);
}, [artifactsGlobalState]);

  // Dentro del efecto para cargar los artefactos
  useEffect(() => {
    const loadArtifacts = async () => {
      try {
        const artifactsData = await axios.get('https://mmaproject-app.fly.dev/api/artifacts');
        const artifacts = artifactsData.data.data;
    
        // Actualizar los artefactos con la imagen del usuario
        const updatedArtifacts = await Promise.all(
          artifacts.map(async (artifact) => {
            if (artifact.found) {
              const userImage = await getUserImageById(artifact.who);
              return { ...artifact, userImage };
            }
            return artifact;
          })
        );
    
        setArtefactsGlobalState(updatedArtifacts);
      } catch (error) {
        console.error('Error al cargar los artefactos:', error);
      }
    };
    
    // Llamada a la función para cargar los artefactos
    loadArtifacts();
    
  }, []);


  useEffect(() => {
    const checkIfUserNearMarker = (latitude, longitude) => {
      artifactsGlobalState.forEach((artifact) => {
        if (!artifact.found) {
          const distance = calculateDistance(latitude, longitude, artifact.latitude, artifact.longitude);
          console.log(distance);
          if (distance < 8500) {
            console.log('Estás cerca del marcador:', artifact.name);
            setShowButton(true); // Establece el estado del botón a true si el usuario está cerca del artefacto
            setSelectedArtifact(artifact);
          } else {
            setShowButton(false); // Si no está cerca, oculta el botón
          }
        }
      });
    };

    if (userLocation) {
      checkIfUserNearMarker(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation, artifactsGlobalState]); // 

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  };
  
  const updateFoundedArtifact = async (artifact) => {
    try {
      const selectedArtifact = { found: !artifact.found , who: userId }; // Invertir el estado de 'found'
      setSelectedArtifact(selectedArtifact);
      console.log("ARTEFACTO SELECCIONADO", selectedArtifact);
      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch( `https://mmaproject-app.fly.dev/api/artifacts/updateArtifact/${artifact._id}`, selectedArtifact );
      const updatedArtifact = response.data;
  
      // Obtener la imagen del usuario actual
      const userImage = await getUserImageById(userId);
  
      // Actualizar el estado de artefactos localmente con la imagen del usuario que lo recogió
      const updatedArtifacts = artifactsGlobalState.map(art => {
        if (art._id === updatedArtifact._id) {
          return { ...updatedArtifact, userImage }; // Actualizar el artefacto recién recolectado con la nueva imagen
        } else if (art.found) {
          // Mantener la información de la imagen de usuario para los artefactos previamente recolectados
          return { ...art, userImage: art.userImage };
        }
        return art;
      });
  
      setArtefactsGlobalState(updatedArtifacts);
      // Incrementar collectedArtifacts al recoger un artefacto
      setCollectedArtifacts(prevCount => prevCount + 1);
  
      // Muestra un mensaje de confirmación
      Alert.alert(
        "Artefacto Encontrado",
        "Los datos del artefacto han sido actualizados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {}, // No recargar los artefactos después de presionar "OK" para mantener las imágenes de usuario
          },
        ],
        { cancelable: false }
      );
  
    } catch (error) {
      console.error('Error al actualizar los datos del artefacto:', error);
    }
  };
  
  
  const getSearchesFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/searches';
      const response = await axios.get(url);
      const searches = response.data.data;
      setSearches(searches);
      console.log(searches[0].state);
  
      if (searches[0].state === 'pending' || searches[0].state === 'null') {
        Alert.alert(
          'BUSQUEDA PENDIENTE',
          '  ',
          [
            {
              text: 'OK',
              onPress: () => closeModal(),
            },
          ],
          { cancelable: false }
        );
      } if(searches[0].state === 'completed'){
        Alert.alert(
          'BUSQUEDA VALIDADA',
          '',
          [
            {
              text: 'OK',
              onPress: () => openModal(),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error al obtener búsquedas:', error);
    }
  };
  
  

  const updateSearch = async (search) => {
    try {
      console.log('busqueda:', search);
      const finishedSearch = { state: "pending" }; 
      console.log('modificar estado state', finishedSearch);
      console.log('ID de la busqueda :', search[0]._id);
  
      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/searches/updateSearch/${search[0]._id}`, finishedSearch);
      const updatedSearch = response.data;
      console.log('Datos busqueda actualizados:', updatedSearch);
      
      setShowPendingText(true);
      setShowAnotherButton(false); // Ocultar el botón 'Check'
  
      getArtifactsFromDataBase();
      getSearchesFromDataBase();
    } catch (error) {
      console.error('Error al actualizar busqueda:', error);
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

const openModal = () => {
  setShowModal(true);
  setMapVisible(false);
};

const closeModal = () => {
  setShowModal(false);
  setMapVisible(true);
};

const updateSearchAndArtfifacts = () => {
getSearchesFromDataBase();
};

// Lógica para obtener la ubicación del acólito y enviarla al servidor
const getAndSendUserLocation = async () => {
  try {
    // Obtener la ubicación del dispositivo del acólito (usando Geolocation o alguna librería similar)
    const location = await getUserLocation();
    console.log("ubicacion", location)
    // // Enviar la ubicación al servidor con alguna identificación del acólito
    // await axios.post('https://tu-servidor.com/api/actualizar-ubicacion-acolito', {
    //   userId: 'identificador_del_acolito',
    //   ubicacion: location,
    // });

    console.log('Ubicación enviada correctamente.');
  } catch (error) {
    console.error('Error al enviar la ubicación:', error);
  }
};
const getUserLocation = async () => {
  try {
    const location = await new Promise((resolve, reject) => {
      Geolocation.watchPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
      );
    });

    console.log("UBICACION", location);

    return location;
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    return null;
  }
};



  return (

    
    <Container>
      
      
      {mapVisible && artifactsGlobalState && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: 43.30972753944833,
          longitude: -2.002748937230638,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        customMapStyle={MapStyle}
      >

        {artifactsGlobalState &&
          artifactsGlobalState
            .filter(artifact => !artifact.found) // Filtrar solo artefactos no encontrados
            .map((artifact, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: artifact.latitude,
                  longitude: artifact.longitude,
                }}
                title={artifact.name}
                description={artifact.description || ''}
              >
                {/* Contenedor del marcador con imagen */}
                <View style={styles.markerImageContainer}>
                  <Image
                    source={{ uri: artifact.image }}
                    style={styles.roundedMarkerImage}
                  />
                </View>
              </Marker>
            ))}
      </MapView>
      )}

      <BackgroundImage source={img}>
        
        {showButton && (
          <Buttons onPress={() => updateFoundedArtifact(selectedArtifact)}>
            <ButtonsText>RECOGER</ButtonsText>
          </Buttons>
        )}

        { showAnotherButton && !showPendingText && (
          <>
          <SendButton onPress={() => updateSearch(search) }>
            <ButtonsText>CHECK</ButtonsText>
          </SendButton>

          <UpdateButton onPress={emitEventServer()}>
            <ButtonsText>UPDATE</ButtonsText>
          </UpdateButton>
          </>
        )}

              <View>
        {showPendingText && (
        <>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <PendingText style={styles.pendingText}>PENDING</PendingText>
            <ActivityIndicator size="large" color="#3498db" animating={true} />
          </Animated.View>
        </>
      )}
        </View>

  {!showPendingText && (
    <>
      <Title>ARTIFACTS</Title>
      <View style={styles.artifactsContainer}>
        {artifactsGlobalState && artifactsGlobalState.slice(0, 4).map((artifact, index) => (
          <View key={index} style={styles.artifactUserContainer}>
            <View style={styles.artifactContainer}>
              <Image
                source={{ uri: artifact.image }}
                style={[
                  styles.roundedArtifactImage,
                  { opacity: artifact.found ? 1 : 0.4 },
                ]}
              />
            </View>
            {artifact.found && artifact.userImage && (
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: artifact.userImage }}
                  style={styles.roundedUserImage}
                />
              </View>
            )}
          </View>
        ))}
      </View>
      <UpdateButton onPress={emitEventServer}>
            <ButtonsText>UPDATE</ButtonsText>
          </UpdateButton>
    </>
  )}

  <Modal visible={showModal} onDismiss={() => setShowModal(true)} contentContainerStyle={styles.modalContainer}>
    <Roseta />
    <UpdateButton onPress={getSearchesFromDataBase}>
            <ButtonsText>UPDATE</ButtonsText>
          </UpdateButton>
  </Modal>

  </BackgroundImage>
    </Container>
    
  );
};

const styles = StyleSheet.create({
  markerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedMarkerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  artifactsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    bottom: 20
  },
  artifactContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  roundedArtifactImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userImageContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedUserImage: {
    width: 35, // Tamaño deseado de la imagen del usuario
    height:35,
    borderRadius: 17.5, // Mitad del tamaño deseado para hacerlo redondo
    borderWidth: 1, // Puedes ajustar el grosor y el color del borde si lo deseas
    borderColor: '#4c2882',
    top: 27,
    marginLeft: 33
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Color de fondo del modal
  },
});

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  resizeMode: cover;
  justify-content: center;
  opacity:0.8
  `
const Buttons = styled.TouchableOpacity`
  background: #A3A2A2;
  opacity: 0.95;
  width: 180px;
  height: 65px;
  align-self: center;
  border-radius: 30px;
  border: #0B0B0B;
  bottom:25px;
  background-color:#ffffff
  `
const ButtonsText = styled.Text`
  fontSize: 28px;
  font-family: 'Tealand';
  color: #4c2882; 
  align-self: center;
  top:17px;
  `
const SendButton = styled.TouchableOpacity`
background: #A3A2A2;
opacity: 0.95;
width: 180px;
height: 65px;
align-self: center;
border-radius: 30px;
border: #0B0B0B;
bottom:25px;
background-color:#ffffff
`
const Container = styled.View`
  flex: 1;
  `
const Title = styled.Text`
font-size: 40px; 
align-self:center;
color:#49CFDF;
font-family: 'Tealand';
bottom:20px;
text-shadow: 2px 2px 7px black;
`
const PendingText = styled.Text`
  fontSize: 65px;
  font-family: 'Creepster';
  color: #49CFDF; 
  align-self: center;
  top: -30px;
  `
const UpdateButton = styled.TouchableOpacity`
background: #A3A2A2;
opacity: 0.95;
width: 180px;
height: 65px;
align-self: center;
border-radius: 30px;
border: #0B0B0B;
bottom:25px;
background-color:#ffffff
`

export default GeolocationUser;