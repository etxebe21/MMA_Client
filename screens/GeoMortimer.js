import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Alert,ImageBackground, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GeolocationMortimer = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [searches, setSearches] = useState([]);
  const [showFinishButton, setShowFinishButton] = useState(false);

  const img = require("../assets/geofondo.png")
  const userImage = require("../assets/newPotion.png")

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              //console.log("Localización  actualizada: " , userLocation);

            },
            (error) => {
              console.error('Error al obtener la ubicación: ', error);
            },
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000 }
          );
          Geolocation.watchPosition(
            (position) => {
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              //console.log("Localización usuario actualizada: " , userLocation);
            },
            (error) => {
              console.error('Error al obtener la ubicación: ', error);
            },
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000, distanceFilter: 1}
          );
        } else {
          console.log('Permiso de ubicación denegado');
        }
      } catch (err) {
        console.warn(err);
      }
      console.log("Localización usuario actualizada: " , userLocation);

    };   
    
    getArtifactsFromDataBase();
    getSearchesFromDataBase();
    requestLocationPermission();
  }, []); 
  
  const getArtifactsFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      const response = await axios.get(url);
      const artifacts= response.data.data;
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
        showsUserLocation = {true}
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

        {/* {userLocation &&
          userLocation.latitude === artifact1.latitude &&
          userLocation.longitude === artifact1.longitude && (
            <Button
            title="Estás en la misma ubicación que el marcador"
            onPress={isUserNearMarker}
            />
            )} */}
            
        <BackgroundImage source={img}>
          <Title>Artifacts</Title>

          <View style={styles.artifactsContainer}>
          {artifacts.slice(0, 4).map((artifact, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => updateFoundedArtifact(artifact)}
              style={styles.artifactContainer}
            >
              <Image
                source={{ uri: artifact.image }}
                style={[
                  styles.roundedArtifactImage,
                  { opacity: artifact.found ? 1 : 0.4 },
                ]}
              />
            </TouchableOpacity>
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
const Container = styled.View`
  flex: 1;
`
const Artifact1 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-right:170px;
  margin-top:10px;
  border-radius:50px;
`
const Artifact2 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-left:200px;
  margin-top:-90px;
  border-radius:50px;
`
const Artifact3 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-right:170px;
  margin-top:30px;
  border-radius:50px;
`
const Artifact4 = styled.View`
  border:5px;
  
  padding: 40px;
  align-self: center;
  margin-left:200px;
  margin-top:-90px;
  border-radius:50px;
`
const Title = styled.Text`
font-size: 40px; 
align-self:center;
color:#000000;
`
export default GeolocationMortimer;

