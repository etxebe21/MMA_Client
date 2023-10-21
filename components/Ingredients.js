import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import styled from "styled-components/native";


const ingredientes = [
    {
      id: 1,
      nombre: "Ingrediente 1",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["increase_strength", "increase_intelligence", "increase_resistance", "increase_agility"],
    },
    {
      id: 2,
      nombre: "Ingrediente 2",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: [" regenerate_strength", "increase_agility", "restore_intelligence", "increase_resistance"],
    },
    {
      id: 3,
      nombre: "Ingrediente 3",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["increase_agility", "regenerate_resistance", "restore_strength", "fortify_intelligence"],
    },
    {
      id: 4,
      nombre: "Ingrediente 4",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["fortify_resistance", "increase_intelligence", "regenerate_agility", "increase_strength"],
    },
    {
      id: 5,
      nombre: "Ingrediente 5",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["restore_strength", "increase_resistance", "fortify_intelligence", "increase_agility"],
    },
    {
      id: 6,
      nombre: "Ingrediente 1",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["increase_strength", "increase_intelligence", "increase_resistance", "increase_agility"],
    },
    {
        id: 7,
        nombre: "Ingrediente 2",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: [" regenerate_strength", "increase_agility", "restore_intelligence", "increase_resistance"],
      },
      {
        id: 8,
        nombre: "Ingrediente 3",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["increase_agility", "regenerate_resistance", "restore_strength", "fortify_intelligence"],
      },
      {
        id: 9,
        nombre: "Ingrediente 4",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["fortify_resistance", "increase_intelligence", "regenerate_agility", "increase_strength"],
      },
      {
        id: 10,
        nombre: "Ingrediente 5",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["restore_strength", "increase_resistance", "fortify_intelligence", "increase_agility"],
      },
    
  ];
  
const IngredientesScreen = () => {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [pocionCreada, setPocionCreada] = useState(null);

  const seleccionarIngrediente = (ingrediente) => {
    if (ingredientesSeleccionados.length < 2) {
      setIngredientesSeleccionados([...ingredientesSeleccionados, ingrediente]);
    }
  };

  const crearPocion = () => {
    // Verifica que se hayan seleccionado exactamente 2 ingredientes
    if (ingredientesSeleccionados.length === 2) {
      // Crea la poción combinando los efectos de los ingredientes seleccionados
      const poción = {
        nombre: 'EPIC POTION',
        efectos: [
          ...ingredientesSeleccionados[0].efectos,
          ...ingredientesSeleccionados[1].efectos,
        ],
      };
      setPocionCreada(poción);
    }
  };

  const returnIngredients = () => {
    // Limpiar los ingredientes seleccionados y la poción creada
    setIngredientesSeleccionados([]);
    setPocionCreada(null);
  };

  const SelectedIngredientsEffects = ({ ingredientesSeleccionados }) => {
    return (
      <SelectedIngredientsContainer>
        <SelectedIngredientsTitle>Ingredients Effects:</SelectedIngredientsTitle>
        {ingredientesSeleccionados.map((ingrediente, index) => (
          <IngredientEffect key={index}>{ingrediente.nombre} Effects: {ingrediente.efectos.join(", ")}</IngredientEffect>
        ))}
      </SelectedIngredientsContainer>
    );
  };

  return (
    
    <ScrollView>

      {ingredientes.map((ingrediente) => (
        <IngredientButton
          key={ingrediente.id}
          onPress={() => seleccionarIngrediente(ingrediente)}
        >
          <IngredientView>
            {/* <Image source={ingrediente.imagen} style={{ width: 10, height: 10 }} /> */}
            <Text>{ingrediente.nombre}</Text>
            {/* {ingrediente.efectos.map((efecto, index) => (
              <Text key={index}>{efecto}</Text>
            ))} */}
          </IngredientView>
        </IngredientButton>
      ))}
      
      {ingredientesSeleccionados.length === 2 && !pocionCreada && (
        <CreatePotionButton onPress={crearPocion}>
          <PotionButtonText>Create Potion</PotionButtonText>
        </CreatePotionButton>
      )}

      {ingredientesSeleccionados.length === 2 && !pocionCreada && (
        <SelectedIngredientsEffects ingredientesSeleccionados={ingredientesSeleccionados} />
      )}

      {pocionCreada && (
        <PotionView >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop:-10  }}>CREATED POTION:</Text>
          <Text style={{ fontSize: 20, marginTop:15 }}>{pocionCreada.nombre}</Text>
          <Text style={{ fontSize: 17, marginTop: 30 }}>Efects:</Text>
          {pocionCreada.efectos.map((efecto, index) => (
            <Text key={index}>{efecto}</Text>
          ))}
          <ReturnButton onPress={returnIngredients}>
            <ButtonText>RETURN</ButtonText>
          </ReturnButton>
        </PotionView>
      )}
      </ScrollView> 
  );
};

const IngredientView = styled.View`
    flex: 1;
    bottom: 0px;
    width: 150px;
    height: 80px;
    align-self: center;
    background: #4c2882;
    border-radius: 60px; 
`
const Text = styled.Text `
    bottom: -25px;
    color: #CCCCCC;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;    
`
const IngredientButton = styled.TouchableOpacity`
  marginVertical: 12px;
  padding: 15px;
  width: 150px;
  align-self: center;
`
const CreatePotionButton = styled.TouchableOpacity`
  top: -150px;
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  border: #4c2882; 
`
const PotionButtonText = styled.Text`
  fontSize: 25px;
  color: #4c2882; 
  align-self: center;
  top: 5px;
`
const PotionView = styled.View`
  top: -500px;
  align-self: center;
  background: #4c2882;
  width: 250px;
  height: 400px;
`
const ReturnButton = styled.TouchableOpacity`
  background: #913595;
  width: 200px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  margin-top: 120px;
`
const ButtonText = styled.Text`
  font-size: 20px;
  color: #CCCCCC;
  text-align: center;
  line-height: 50px;
`
const SelectedIngredientsContainer = styled.View`
  margin-top: -530px;
  align-self: center;
  background: #4c2882;
  width: 240px;
  height: 260px;
`;

const SelectedIngredientsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  color: #CCCCCC;
  marginTop: 10px;
`

const IngredientEffect = styled.Text`
  font-size: 16px;
  margin-top: 8px;
  align-self: center;
  color: #CCCCCC;
`
export default IngredientesScreen;
