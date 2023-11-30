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

const GeolocationUser = () => {

  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  const { artefactsGlobalState, setArtefactsGlobalState, handleArtefactsGlobalState} = useContext(Context);

  const [artifacts, setArtifacts] = useState(artefactsGlobalState);
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
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const img = require("../assets/geofondo.png")
 
  // // Función para contar los artefactos encontrados
  // const countFoundArtifacts = () => {
  //   const foundArtifacts = artifacts.filter((artifact) => artifact.found);
  //   return foundArtifacts.length;
  // };

  // Actualizar el estado de visibilidad del botón
  useEffect(() => {
    const countFoundArtifacts = async ()  => {

      // const foundArtifacts = artefactsGlobalState.filter((artifact) => artifact.found);
      // if(foundArtifacts.length !== null)
      // return foundArtifacts.length;
  
      // else
      return 4;
    };

    const foundCount = countFoundArtifacts();
    setShowAnotherButton(foundCount === 4);
    setShowButton(foundCount < 4);
  }, [artifacts]);


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
              },
              (error) => {
                console.error('Error al obtener la ubicación:', error);
              },
              { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000, distanceFilter: 1 }
            );
          } else {
            // console.log('Permiso de ubicación denegado');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getArtifactsFromDataBase();
    getSearchesFromDataBase();
    requestLocationPermission();
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

  // Checkea si la posicion del user esta dentro o no del radio del artefacto
  useEffect(() => {
    const checkIfUserNearMarker = (latitude, longitude) => {
      artefactsGlobalState.forEach((artifact) => {
        if (!artifact.found) {
          console.log("Entra en artifact !found");
          const distance = calculateDistance(latitude, longitude, artifact.latitude, artifact.longitude);
          console.log(distance);
          // Si esta cerca o no del artefacto
          if (distance < 8500) {
            console.log("distance: " , distance)
            console.log("Estas cerca del artefacto " , artifact.name);
            // Establece el estado del botón a true si el usuario está cerca del artefacto
            setShowButton(true); 
            setSelectedArtifact(artifact);
          } else {
            // Si no está cerca, oculta el botón
            setShowButton(false); 
          }
        }
      });
    };

    // Localizacion del usuario y actualizacion del mismo
    if (userLocation) {
      checkIfUserNearMarker(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation, artefactsGlobalState]); // 

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  };

  // Recoge los artefactos de la DB y los setea en el estado global de artefactos
  const getArtifactsFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      const response = await axios.get(url);
      setArtefactsGlobalState(response.data.data);
  
      // Actualizar los artefactos con la información de las imágenes del usuario
        const updatedArtifacts = await Promise.all(
          artefactsGlobalState.map(async (artifact) => {
            if (artifact.found) {
              const userImage = await getUserImageById(artifact.who);
              return { ...artifact, userImage };
            }
            return artifact;
          })
        );


      setArtifacts(updatedArtifacts);

    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    }
  };
  

  
  const updateFoundedArtifact = async (artifact) => {
    try {
      const selectedArtifact = { found: !artifact.found , who: userId }; // Invertir el estado de 'found'
      setSelectedArtifact(selectedArtifact);

      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch( `https://mmaproject-app.fly.dev/api/artifacts/updateArtifact/${artifact._id}`, selectedArtifact );
      setArtefactsGlobalState(response.data); // COMO SABEMOS CUAL HAY QUE ACTUALIZAR?!
  
      // Obtener la imagen del usuario actual
      const userImage = await getUserImageById(userId);
  
      // Actualizar el estado de artefactos localmente con la imagen del usuario que lo recogió
      const updatedArtifacts = artefactsGlobalState.map(art => {
        if (art._id === updatedArtifact._id) {
          return { ...updatedArtifact, userImage }; // Actualizar el artefacto recién recolectado con la nueva imagen
        } else if (art.found) {
          // Mantener la información de la imagen de usuario para los artefactos previamente recolectados
          return { ...art, userImage: art.userImage };
        }
        return art;
      });
  
      setArtifacts(updatedArtifacts);
      // getArtifactsFromDataBase();
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
      // console.log(searches[0].state);
  
      if (searches[0].state === 'pending' || searches[0].state === 'stopped') {
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
      const finishedSearch = { state: "pending" }; 
  
      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/searches/updateSearch/${search[0]._id}`, finishedSearch);
      const updatedSearch = response.data;
      
      // Oculta el botón 'Check'
      setShowAnotherButton(false);
      setShowPendingText(true);
  
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
      // console.log(userPicture);
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

const updateArtifactsAndSearch = () => {
  getArtifactsFromDataBase();
  getSearchesFromDataBase()
};

if (artefactsGlobalState === null)
  return null;

  return (

    
    <Container>
      
      
      {mapVisible && (
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
      >

        {artefactsGlobalState &&
          artefactsGlobalState.filter(artifact => !artifact.found).map((artifact, index) => (
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

        {showAnotherButton &&  !showPendingText &&(
          <SendButton onPress={() => updateSearch(search) }>
            <ButtonsText>CHECK</ButtonsText>
          </SendButton>
        )}

              <View>
        {showPendingText && (
        <>
          <UpdateButton onPress={getSearchesFromDataBase}>
            <ButtonsText>UPDATE</ButtonsText>
          </UpdateButton>

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
        {artefactsGlobalState.slice(0, 4).map((artifact, index) => (
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
      <UpdateButton onPress={updateArtifactsAndSearch}>
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