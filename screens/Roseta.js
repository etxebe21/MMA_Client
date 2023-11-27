import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, Image, Dimensions, StyleSheet} from 'react-native';
import axios from 'axios';

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
    const numArtifacts = 4;

    const radius = 135;

    const centerX = Dimensions.get('window').width / 2.6;
    const centerY = Dimensions.get('window').height / 3;
    
    
    const angle = (((index * (360 / numArtifacts)) + 270) * (Math.PI / 180));

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { left: x, top: y };
};


  return (
    <BackgroundContainer>
      <ImageBackground source={require("../assets/roseta.png")} style={styles.imageBackground}>
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
          </ImageBackground>
    </BackgroundContainer>
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ArtifactImage = styled(Image)``;

export default Roseta;
