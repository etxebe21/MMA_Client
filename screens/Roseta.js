import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, Image, Dimensions } from 'react-native';
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

  const calculateArtifactPosition = (index) => {
    const numArtifacts = 2;
    const radius = 135;
  

    const centerX = Dimensions.get('window').width / 2.6;
    const centerY = Dimensions.get('window').height / 3;
  
    //angulo
    const angle = ((index * (360 / numArtifacts)) * (Math.PI / 180)) + 130.35; 

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { left: x, top: y };
  };

  return (
    <BackgroundContainer>
      <BackgroundImage source={bgImage}>
        {artifactImages.length === 4 &&
          artifactImages.map((image, index) => {
            const position = calculateArtifactPosition(index);
            const styles = {
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: 'red', 
              position: 'absolute',
              ...position,
            };
            return <ArtifactImage key={index} source={{ uri: image }} style={styles} />;
          })}
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
