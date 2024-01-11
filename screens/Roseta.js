import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, Image, Dimensions, StyleSheet} from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const Roseta = () => {
  const [artifactImages, setArtifactImages] = useState([]);

  useEffect(() => {
    getArtifactsFromDataBase();
  }, []);

  const getArtifactsFromDataBase = async () => {
    try {
  
      setIsLoading(true);
  
      // Obtener el token JWT del almacenamiento seguro
      const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
      const token = credentials?.password;
  
      if (token) {
        const url = 'https://mmaproject-app.fly.dev/api/artifacts';
  
        // Realizar la solicitud al servidor con el token en el encabezado de autorización
        const response = await axios.get(url, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
  
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
      } else {
        console.log('No se encontró un token en el Keychain.');
      }
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
          </ImageBackground>
  );
};

const BackgroundContainer = styled.View`
  flex: 1;
  background-color: #c8a2c8;
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
