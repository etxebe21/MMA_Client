import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, PermissionsAndroid, Alert, ImageBackground, Image, View,Animated } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Modal } from 'react-native-paper';
import { Context } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io, { Socket } from 'socket.io-client';
import { socket } from '../socket/socketConnect';

const GeolocationUser = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [search, setSearches] = useState([]);
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  const [showPendingText, setShowPendingText] = useState(false);
  const [userId, setuserId] = useState([]);
  const { artifactsGlobalState, setArtefactsGlobalState} = useContext(Context);
  const {userGlobalState,   handleUserGlobalState}  = useContext(Context);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const img = require("../assets/wallpaper_geolocalitation.png")
 
  // Función para contar los artefactos encontrados
  const countFoundArtifacts = () => {
    const foundArtifacts = 4
    return foundArtifacts.length;
  };

  // Actualizar el estado de visibilidad del botón
  useEffect(() => {
    const foundCount = countFoundArtifacts();
    setShowAnotherButton(foundCount === 4);
  }, [artifactsGlobalState]);

  useEffect(() => {
    responseEvent();
    console.log(showPendingText);
  }, [showPendingText]);
  
  
  
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
    getSearchesFromDataBase();
  }, []);
  
  useEffect(() => {
    const getID = async () => {
      try {
        const newSocket = io('https://mmaproject-app.fly.dev'); 
        // Escuchar la respuesta del servidor al evento 'responseEvent'
        newSocket.on('receiveUserLocation', (responseData) => {
          console.log('POsicion usuarios actuales recibidos desde el servidor:', responseData);
          console.log(responseData[0].latitude , responseData[0].longitude, responseData[0].picture )
          
        });
        const userId = await AsyncStorage.getItem('userID')
        setuserId(userId);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        
      } catch (e) {
      }
    };
    
    getID();
  }, []); 
  
  // Dentro del efecto para cargar los artefactos
  useEffect(() => {
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
      
      loadArtifacts();
    }, []);
    
    
    
      const responseEvent = async () => {
        const responseData = await new Promise((resolve) => {
          socket.on('responseVerify', (data) => {
            resolve(data);
          });
        });
        console.log("respuesta de servidor" + responseData);
        setShowPendingText(responseData); 
      };
      
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
      // console.log('Artefactos:', updatedArtifacts);
    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    }
  };
  

  const resetSearch = async () => {
    try {
      setShowPendingText(false);
      const updatedArtifacts = [];
      const artifactPatchRequests = [];
  
      // Preparar las solicitudes PATCH para cada artefacto
      for (let i = 0; i < artifactsGlobalState.length; i++) {
        const selectedArtifact = { found: false, who: "" };
        artifactPatchRequests.push(
          axios.patch(`https://mmaproject-app.fly.dev/api/artifacts/updateArtifact/${artifactsGlobalState[i]._id}`, selectedArtifact)
        );
      }
  
      // Realizar todas las solicitudes PATCH simultáneamente
      const responses = await Promise.all(artifactPatchRequests);
  
      // Actualizar los artefactos después de que todas las solicitudes se completen con éxito
      responses.forEach((response) => {
        updatedArtifacts.push(response.data);
      });
  
      const finishedSearch = { state: "stopped" };
      await axios.patch(`https://mmaproject-app.fly.dev/api/searches/updateSearch/${search[0]._id}`, finishedSearch);
  
      // Actualizar el estado una vez que todas las operaciones se completen
      setArtefactsGlobalState(updatedArtifacts); 
      getSearchesFromDataBase();
  
      // Mostrar un mensaje de confirmación
      Alert.alert(
        "BÚSQUEDA REINICIADA",
        "Los datos de la búsqueda han sido reiniciados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
  
    } catch (error) {
      console.error('Error al actualizar los datos de los artefactos:', error);
    }
  };
  

  const getSearchesFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/searches';
      const response = await axios.get(url);
      const searches= response.data.data;
      setSearches(searches);

      // console.log('BUsquedas:', searches);
    } catch (error) {
      console.error('Error al obtener busquedas:', error);
    }
  }; 

  const updateSearch = async (search) => {
    try {
  
      const finishedSearch = { state: "completed" }; 
      // console.log('modificar estado state', finishedSearch);
      // console.log('ID de la busqueda :', search[0]._id);
  
      const response = await axios.patch(`https://mmaproject-app.fly.dev/api/searches/updateSearch/${search[0]._id}`, finishedSearch);
      const updatedSearch = response.data;
      // console.log('Datos busqueda actualizados:', updatedSearch);
  
      setShowPendingText(true);
      //getArtifactsFromDataBase();
      getSearchesFromDataBase(search);
     
      Alert.alert(
        "BUSQUEDA VALIDADA",
        "Los datos de la búsqueda han sido actualizados correctamente.",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al actualizar búsqueda:', error);
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

        {showPendingText && (
          <>
            <Buttons onPress={() => resetSearch()}>
              <ButtonsText>RESET</ButtonsText>
            </Buttons>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <PendingText style={styles.pendingText}>SEARCH VALIDATE</PendingText>
            </Animated.View>
          </>
        )}

        {!showPendingText && artifactsGlobalState &&(
          <>
            <Buttons onPress={() => resetSearch()}>
              <ButtonsText>RESET</ButtonsText>
            </Buttons>

            {countFoundArtifacts() === 4 && (
              <SendButton onPress={() => updateSearch(search)}>
                <ButtonsText>VALIDATE</ButtonsText>
              </SendButton>
            )}

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