import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, PermissionsAndroid, Alert, ImageBackground, Image, View, Animated } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Modal } from 'react-native-paper';
import { Context } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io, { Socket } from 'socket.io-client';
import { socket } from '../socket/socketConnect';
import MapStyle from '../components/MapStyle.json'

const GeolocationUser = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [search, setSearches] = useState([]);
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  const [showPendingText, setShowPendingText] = useState(false);
  const [userId, setuserId] = useState([]);
  const [verify, setVerify] = useState();
  const [notFound, setNotFound] = useState();

  const { artifactsGlobalState, setArtefactsGlobalState } = useContext(Context);
  const { usersGlobalState, handleUsersGlobalState } = useContext(Context);
  const { pendingTextGlobalState, setPendingTextGlobalState } = useContext(Context);


  const scaleAnim = useRef(new Animated.Value(0)).current;

  const img = require("../assets/wallpaper_geolocalitation.png")


  const hasFoundArtifacts = () => {
    if (artifactsGlobalState != null) {
      const found = artifactsGlobalState.some((artifact) => artifact.found);
      setNotFound(found);
    }
  };

  //EFFECT INICIAL
  useEffect(() => {
    getSearchesFromDataBase();
    // console.log(usersGlobalState[0].latitude, usersGlobalState[0].longitude, usersGlobalState[0].picture );
    loadArtifacts();
    hasFoundArtifacts();
  }, []);

  useEffect(() => {
    hasFoundArtifacts();
  }, [artifactsGlobalState]);


  useEffect(() => {
    const getID = async () => {
      try {
        const newSocket = io('https://mmaproject-app.fly.dev');
        // Escuchar la respuesta del servidor al evento 'responseEvent'
        newSocket.on('receiveUserLocation', (responseData) => {
          // console.log('POsicion usuarios actuales recibidos desde el servidor:', responseData);

        });
        const userId = await AsyncStorage.getItem('userID')
        setuserId(userId);
        return jsonValue != null ? JSON.parse(jsonValue) : null;

      } catch (e) {
      }
    };

    getID();
  }, []);



  const loadArtifacts = async () => {
    try {
      const artifactsData = await axios.get('https://mmaproject-app.fly.dev/api/artifacts');
      const artifacts = artifactsData.data.data;
      // console.log("ARTEFACTOS", artifacts);

      // Actualizar los artefactos con la imagen del usuario
      const updatedArtifacts = await Promise.all(
        artifacts.map(async (artifact) => {
          if (artifact.found) {
            const userImage = await getUserImageById(artifact.who);
            // console.log("imagen del usuario", userImage);
            return { ...artifact, userImage };
          }
          return artifact;
        })
      );

      setArtefactsGlobalState(updatedArtifacts);
    } catch (error) {
      // console.error('Error al cargar los artefactos:', error);
    }
  };

  const resetSearch = async () => {

    const artifactData = {
      id: [],
      found: [],
      who: [],
    };

    artifactsGlobalState.forEach((artifact) => {
      artifactData.id.push(artifact._id);
      if (artifact.found === true) {
        artifactData.found.push(!artifact.found);
      }
      else artifactData.found.push(artifact.found);
      artifactData.who.push('');
    });

    socket.emit('verifyMortimer', artifactData.id, artifactData.found, artifactData.who);
    getSearchesFromDataBase();
    
    const finishedSearch = { state: "" };
    socket.emit('verifyArtifact', search[0]._id, finishedSearch);
    setVerify("");
    // console.log(pendingTextGlobalState);

  };

  const getSearchesFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/searches';
      const response = await axios.get(url);
      const searches = response.data.data;
      setSearches(searches);
      setVerify(searches[0].state)
      // console.log('BUsquedas:', searches);
    } catch (error) {
      console.error('Error al obtener busquedas:', error);
    }
  };

  const updateSearch = async (search) => {
    const finishedSearch = { state: "completed" };
    // console.log(search[0].state);
    socket.emit('verifyArtifact', search[0]._id, finishedSearch);
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
        customMapStyle={MapStyle}
      >
       {usersGlobalState != null && usersGlobalState.map((user, index) => (
  <Marker
    key={index}
    coordinate={{ latitude: user.latitude, longitude: user.longitude }}
  >
    <Image
      source={{ uri: user.picture }}
      style={{ width: 40, height: 40, borderRadius: 20 }}
    />
  </Marker>
))}


 {artifactsGlobalState != null && artifactsGlobalState &&
          artifactsGlobalState
            .filter(artifact => !artifact.found)
            .map((artifact, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: artifact.latitude ? artifact.latitude : 0,
                  longitude: artifact.longitude ? artifact.longitude : 0,
                }}
                title={artifact.name}
                description={artifact.description || ''}
              >
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



        {!showPendingText && artifactsGlobalState && (
          <>
            <View style={styles.buttonsContainer}>
              {notFound  == true && (
                <Buttons onPress={() => resetSearch()}>
                  <ButtonsText>RESET</ButtonsText>
                </Buttons>
              )}

              {(pendingTextGlobalState === "pending" || verify === "pending") && (
                <SendButton onPress={() => updateSearch(search)}>
                  <ButtonsText>VALIDATE</ButtonsText>
                </SendButton>
              )}
            </View>
            <Title>ARTIFACTS</Title>
            <View style={styles.artifactsContainer}>
              {artifactsGlobalState != null && artifactsGlobalState.slice(0, 4).map((artifact, index) => (
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
    height: 35,
    borderRadius: 17.5, // Mitad del tamaño deseado para hacerlo redondo
    borderWidth: 1, // Puedes ajustar el grosor y el color del borde si lo deseas
    borderColor: '#4c2882',
    top: 27,
    marginLeft: 33
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto distribuirá los elementos en la fila
    paddingHorizontal: 0, // Ajusta según sea necesario
    marginTop: "3%", // Puedes ajustar la distancia entre los botones
  },

});

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  resizeMode: cover;
  justify-content: center;
  opacity:0.99
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