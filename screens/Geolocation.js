import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Alert, ImageBackground, Image, View, TouchableOpacity,ActivityIndicator,Animated } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Modal } from 'react-native-paper';

const GeolocationUser = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifact, setSelectedArtifact] = useState([]);
  const [search, setSearches] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [collectedArtifacts, setCollectedArtifacts] = useState(4);
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  const [showPendingText, setShowPendingText] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const img = require("../assets/geofondo.png")
  const userImage = require("../assets/newPotion.png")
 
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
            console.log('Permiso de ubicación denegado');
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

  //cuando se modifica la posicion actual del usuario se llama a este efecto
  useEffect(() => {
    if (userLocation) {
      console.log(userLocation.latitude);
      checkIfUserNearMarker(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);


  //CUANDO recoges un artefacto se llama a este effect
  useEffect(() => {
    if (collectedArtifacts === 4) {
      setShowAnotherButton(true);
      setShowButton(false);
    } else {
      setShowAnotherButton(false);
    }
  }, [collectedArtifacts]);

  // Dentro del efecto para cargar los artefactos
  useEffect(() => {
    const loadArtifacts = async () => {
      try {
        const artifactsData = await axios.get('https://mmaproject-app.fly.dev/api/artifacts');
        const artifacts = artifactsData.data.data;
        console.log("ARTEFACTOS", artifacts);

        // Actualizar los artefactos con la imagen del usuario
        const updatedArtifacts = await Promise.all(
          artifacts.map(async (artifact) => {
            if (artifact.found) {
              const userImage = await getUserImageById(artifact.who);
              console.log("imagen del usuario", userImage);
              return { ...artifact, userImage };
            }
            return artifact;
          })
        );

        setArtifacts(updatedArtifacts);
      } catch (error) {
        console.error('Error al cargar los artefactos:', error);
      }
    };

    loadArtifacts();
  }, []);


  const checkIfUserNearMarker = (latitude, longitude) => {
    artifacts.forEach((artifact) => {
      if (!artifact.found) {
        const distance = calculateDistance(latitude, longitude, artifact.latitude, artifact.longitude);
        console.log(distance);
        if (distance < 3500) {
          console.log('Estás cerca del marcador:', artifact.name);
          setShowButton(true);
          setSelectedArtifact(artifact); // Almacena el artefacto seleccionado
        } else {
          setShowButton(false);
        }
      }
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  };

  const getArtifactsFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      const response = await axios.get(url);
      const artifacts = response.data.data;
      setArtifacts(artifacts);

      console.log('Artefactos:', artifacts);
    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    }
  };

  const updateFoundedArtifact = async (artifact) => {
    try {
      console.log('Artefacto seleccionado:', artifact);
      const selectedArtifact = { found: !artifact.found }; // Invertir el estado de 'found'
      console.log( 'modificar estado found' ,selectedArtifact);
      console.log('ID del artefacto encontrado:', artifact._id);
      setSelectedArtifact(selectedArtifact);

      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch( `https://mmaproject-app.fly.dev/api/artifacts/updateArtifact/${artifact._id}`, selectedArtifact );
      const updatedArtifact = response.data;
      console.log('Datos del artefacto actualizados:', updatedArtifact);

      // Muestra un mensaje de confirmación
      Alert.alert(
        "Artefacto Encontrado",
        "Los datos del artefacto han sido actualizados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {getArtifactsFromDataBase();},
          },
        ],
        { cancelable: false }
      );

      //getArtifactsFromDataBase();
    } catch (error) {
      console.error('Error al actualizar los datos del artefacto:', error);
    }
  };

  const getSearchesFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/searches';
      const response = await axios.get(url);
      const searches= response.data.data;
      setSearches(searches);
      
      console.log('BUsquedas:', searches);
    } catch (error) {
      console.error('Error al obtener busquedas:', error);
    }
  }; 

  const updateSearch = async (search) => {
    try {
      console.log('busqueda:', search);
      const finishedSearch= { state: "pending"}; 
      console.log( 'modificar estado state' ,finishedSearch);
      console.log('ID de la busqueda :', search[0]._id);
  
      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch( `https://mmaproject-app.fly.dev/api/searches/updateSearch/${search[0]._id}`, finishedSearch );
      const updatedSearch = response.data;
      console.log('Datos busqueda actualizados:', updatedSearch);

     
      setShowPendingText(true);
      setShowAnotherButton(false);
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


  return (
    <Container>
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

        {artifacts &&
          artifacts
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

      <BackgroundImage source={img}>
        
        {showButton && (
          <Buttons onPress={() => updateFoundedArtifact(selectedArtifact)}>
            <ButtonsText>RECOGER</ButtonsText>
          </Buttons>
        )}

        {showAnotherButton && (
          <SendButton onPress={() => updateSearch(search)}>
            <ButtonsText>CHECK</ButtonsText>
          </SendButton>
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
        {artifacts.slice(0, 4).map((artifact, index) => (
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
    </>
  )}


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
export default GeolocationUser;