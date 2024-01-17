import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleSheet, Image} from 'react-native';
import { axiosInstance } from '../axios/axiosInstance';

const Graves = () => {
  const [inventory, setInventory] = useState([]);
  const [userId, setuserId] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  useEffect(() => {
    getMaterialsFromDatabase();
  }, [])

  const handleSquareClick = async (material) => {
    if (material && material._id) {
      setInventory((prevInventory) => {
        if (prevInventory.length < 4 && !prevInventory.includes(material)) {
          const newInventory = [...prevInventory, material];
          saveMaterialToDatabase(material);
          return newInventory;
        }
        return prevInventory;
      });
    }
  };
  
  
  const getMaterialsFromDatabase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/materials';
  
      const response = await axiosInstance.get(url);
  
      const materials = response.data.data;
      console.log('Material:', materials[0]._id);
      //console.log('Datos de materiales obtenidos:', materials);
      // materials.forEach(material => {
      //   console.log('Material:', material._id);
      // });
  
      setMaterials(materials);
    } catch (error) {
      console.error('Error al obtener datos de materiales:', error);
    }
  };
  
  const saveMaterialToDatabase = async (material) => {
    try {
      const url = `https://mmaproject-app.fly.dev/api/materials/updateMaterial/${material._id}`;
      
      const response = await axiosInstance.patch(url, {
        founded: true,
        who: userId, 
        id: material._id,
      });
  
      console.log('Estado del material modificado en BD', response.data);
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
    }
  };
  
// Agregar la propiedad 'image' a cada objeto en el array 'materials'
const materialsWithImages = materials.map((material) => ({
  ...material,
  image: require('../assets/descansoAcolito.png'),
}));

  return (
    <StyledView style={{ flex: 1 }}>
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
        {materialsWithImages.slice(0, 2).map((material) => (
          <Square
            key={material._id}
            onPress={() => handleSquareClick(material) }
            disabled={inventory.includes(material)}
          >
            <Image source={material.image} style={styles.image} />
          </Square>
        ))}
      </StyledView>
  
      <StyledView style={{ flex: 0.5, flexDirection: 'row' }}>
        {materialsWithImages.slice(2, 4).map((material) => (
          <Square
            key={material._id}
            onPress={() => handleSquareClick(material)}
            disabled={inventory.includes(material.name)}
          >
            <Image source={material.image} style={styles.image} />
          </Square>
        ))}
      </StyledView>
    </StyledView>
  );
  
}
const Square = styled(TouchableOpacity)`
  flex: 1;
  margin: 35px;
  width: 100px;
  border: 2px solid black;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; 
  background-color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'transparent')}; 
  height: 200px; 
  width: 100px;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const StyledView = styled.View`
  background-color: rgba(255, 255, 255, 1);
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default Graves;