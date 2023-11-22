import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Alert, ImageBackground, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GeolocationUser = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [searches, setSearches] = useState([]);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [collectedArtifacts, setCollectedArtifacts] = useState(4);
  const [showAnotherButton, setShowAnotherButton] = useState(false);

  const img = require("../assets/geofondo.png")
  const userImage = require("../assets/newPotion.png")
  const markerLocation = { latitude: 43.25320406434306, longitude: -2.019308098147169 };

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


  const checkIfUserNearMarker = (latitude, longitude) => {
    console.log(latitude, longitude);
    artifacts.forEach((artifact) => {
      if (!artifact.found) {
        const distance = calculateDistance(latitude, longitude, artifact.latitude, artifact.longitude);
        console.log(distance);
        if (distance < 3500) {
          console.log('Estás cerca del marcador:', artifact.name);

          setShowButton(true);

        }
        else setShowButton(false);
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

      // console.log('Artefactos:', artifacts);
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
            onPress: () => {
            },
          },
        ],
        { cancelable: false }
      );

      getArtifactsFromDataBase();
    } catch (error) {
      console.error('Error al actualizar los datos del artefacto:', error);
    }
  };
  
   // Función para contar los artefactos encontrados
   const countFoundArtifacts = () => {
    const foundArtifacts = artifacts.filter((artifact) => artifact.found);
    return foundArtifacts.length;
  };

  // Actualizar el estado de visibilidad del botón
  useEffect(() => {
    const foundCount = countFoundArtifacts();
    setShowFinishButton(foundCount === 4);
  }, [artifacts]);

  // Renderizado condicional del botón para finalizar la búsqueda
  const renderFinishButton = () => {
    if (showFinishButton) {
      return (
        <Button
          title="FINISH"
          onPress={() => { updateSearch()}}
        />
      );
    }
    return null;
  };
  
  const getSearchesFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/searches';
      const response = await axios.get(url);
      const searches= response.data.data;
      setSearches(searches);
      
      console.log('BUsquedas:', searches);
    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    }
  }; 

  const updateSearch = async (search) => {
    try {
      console.log('busqueda:', search);
      const finishedSearch= { state: "finished"}; 
      console.log( 'modificar estado state' ,finishedSearch);
      console.log('ID de la busqueda :', search._id);
  
      // Realiza una solicitud PATCH al servidor para actualizar el estado 'found' del artefacto
      const response = await axios.patch( `https://mmaproject-app.fly.dev/api/searches/updateSearch/${search._id}`, finishedSearch );
      const updatedSearch = response.data;
      console.log('Datos busqueda actualizados:', updatedSearch);

      // Muestra un mensaje de confirmación
      Alert.alert(
        "Artefacto Encontrado",
        "Los datos del artefacto han sido actualizados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {
            },
          },
        ],
        { cancelable: false }
      );
      
      getSearchesFromDataBase();
    } catch (error) {
      console.error('Error al actualizar los datos del artefacto:', error);
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

          <Buttons onPress={() => updateFoundedArtifact()}>
            <ButtonsText>RECOGER</ButtonsText>
          </Buttons>
        )}

        {showAnotherButton && (
          <SendButton onPress={() => updateFoundedArtifact()}>
            <ButtonsText>CHECK</ButtonsText>
          </SendButton>
        )}

        <Title>Artifacts</Title>
        <View style={styles.artifactsContainer}>
          {artifacts.slice(0, 4).map((artifact, index) => (
            <View key={index} style={styles.artifactContainer}>
              <Image
                source={{ uri: artifact.image }}
                style={[styles.roundedArtifactImage, { opacity: artifact.found ? 1 : 0.4 }
                ]} />
            </View>
          ))}
        </View>

        {renderFinishButton()}
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
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  roundedArtifactImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
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
  top:10px;
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
export default GeolocationUser;