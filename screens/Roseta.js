import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const bgImage = require('../assets/roseta.png');

const Roseta = () => {
  const [artifactImages, setArtifactImages] = useState([]);

  useEffect(() => {
    getArtifactsFromDataBase();
  }, []);

  const getArtifactsFromDataBase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/artifacts';
      const response = await axios.get(url);
      const artifacts = response.data.data;
      setArtifactImages(artifacts.map((artifact) => artifact.image));
    } catch (error) {
      console.error('Error al obtener imágenes de artefactos:', error);
    }
  };

  // Estilos individuales para cada imagen de artefacto
  const artifactStyles = [
    { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'red', marginRight: 10, top: -10},
    { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'lightblue', marginRight: 10, top: 210},
    { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'green', bottom: 20, marginRight: 300},
    { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'blue', marginLeft: 290, top: -100},
  ];

  return (
    <BackgroundContainer>
      <BackgroundImage source={bgImage}>
        
          {artifactImages.length === 4 &&
            artifactImages.map((image, index) => (
              <ArtifactImage key={index} source={{ uri: image }} style={artifactStyles[index]} />
            ))}
       
      </BackgroundImage>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.View`
  flex: 1;
  background-color: #c8a2c8;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ArtifactImage = styled(Image)``;

export default Roseta;
