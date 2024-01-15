import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, Image, Dimensions, StyleSheet} from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Context } from '../context/Context';
import Graves from './Graves'
import { axiosInstance } from '../axios/axiosInstance';

const Roseta = () => {
  const [artifactImages, setArtifactImages] = useState([]);
  const [gravesVisible, setGravesVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const { artifactsGlobalState, setArtefactsGlobalState } = useContext(Context);

  useEffect(() => {
    getArtifactsFromDataBase();
  }, []);

  const getArtifactsFromDataBase = async () => {
    try {
      setIsLoading(true);

        const url = 'https://mmaproject-app.fly.dev/api/artifacts';
  
        // Realizar la solicitud al servidor con el token en el encabezado de autorización
        const response = await axiosInstance.get(url);
  
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
  
        // Log if needed
        console.log('Artefactos guardados en artifactsGlobalState:');
    } catch (error) {
      console.error('Error al obtener artefactos:', error);
    } finally {
      // Set isLoading to false if needed
      setIsLoading(false);
    }
  };

  const calculateArtifactPosition = (index) => {
    const numArtifacts = artifactImages.length;

    const radius = 135;

    const centerX = Dimensions.get('window').width / 2.6;
    const centerY = Dimensions.get('window').height / 2.4;
    
    
    const angle = (((index * (360 / numArtifacts)) + 270) * (Math.PI / 180));

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { left: x, top: y };
  };

  const gravesButton = () => {
    console.log("boton pulsado");
    setGravesVisible(true);
  };

  // función para obtener la imagen del usuario por su ID
  const getUserImageById = async (userId) => {
    try {
        const user = await axiosInstance.get(`https://mmaproject-app.fly.dev/api/users/${userId}`);
  
        const userPicture = user.data.data.picture;
        console.log('Recibimos imagen de usuario');
        return userPicture; // Devolvemos la URL de la imagen del usuario
    } catch (error) {
      console.error('Error al obtener la imagen del usuario:', error);
    } 
  };


  return (
    <ImageBackground source={require("../assets/wallpaper_roseta.png")} style={styles.imageBackground}>
      {artifactImages.length === 4 &&
        artifactImages.map((image, index) => {
          const position = calculateArtifactPosition(index);
          const styles = {
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: 'blue', 
            position: 'absolute',
            ...position,
          };
          return <ArtifactImage key={index} source={{ uri: image }} style={styles} />;
        })}


      < GravesButton  onPress={gravesButton}> 
        <GravesButtonText> Go to Cementery </GravesButtonText>
      </GravesButton>

      {gravesVisible && (

        <Graves />
        
      )}

    </ImageBackground>
  );
};

const GravesButtonText = styled.Text`
  color: white;
  font-family: Tealand;
  text-shadow: 3px 3px 4px black;
  font-size: 20px;
  margin-top: 1%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GravesButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px; 
  left: 20px; 
  background: #A3A2A2;
  opacity: 0.65;
  width: 40%;
  height: 50px;
  border-radius: 30px;
  border: #0B0B0B;
  background-color: rgba(255, 255, 255, 0.2);
`;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ArtifactImage = styled(Image)``;

export default Roseta;
