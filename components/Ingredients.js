import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";


const ingredients = [
  {
    id: 1,
    nombre: "Elf Essence",
    imagen: require("../assets/elfo.jpg"),
    efectos: ["restore_strength", "increase_resistance", "fortify_intelligence", "increase_agility"],
  },
  {
    id: 2,
    nombre: "Dragon Scales",
    imagen: require("../assets/escamas.jpg"),
    efectos: [" regenerate_strength", "increase_agility", "restore_intelligence", "increase_resistance"],
  },
  {
    id: 3,
    nombre: "Mandrake Root",
    imagen: require("../assets/mandra.jpg"),
    efectos: ["increase_agility", "regenerate_resistance", "restore_strength", "fortify_intelligence"],
  },
  {
    id: 4,
    nombre: "Fairy Dust",
    imagen: require("../assets/hada.jpg"),
    efectos: ["fortify_resistance", "increase_intelligence", "regenerate_agility", "increase_strength"],
  },
  {
    id: 5,
    nombre: "Witch's Blood",
    imagen: require("../assets/sangre.jpg"),
    efectos: ["restore_strength", "increase_resistance", "fortify_intelligence", "increase_agility"],
  },
  {
    id: 6,
    nombre: "Salamander Eye",
    imagen: require("../assets/ojo.jpg"),
    efectos: ["increase_strength", "increase_intelligence", "increase_resistance", "increase_agility"],
  },
  {
      id: 7,
      nombre: "Phoenix Flower",
      imagen: require("../assets/fenix.jpg"),
      efectos: [" regenerate_strength", "increase_agility", "restore_intelligence", "increase_resistance"],
    },
    {
      id: 8,
      nombre: "Yeti Frost",
      imagen: require("../assets/yeti.jpg"),
      efectos: ["increase_agility", "regenerate_resistance", "restore_strength", "fortify_intelligence"],
    },
    {
      id: 9,
      nombre: "Griffin Feather",
      imagen: require("../assets/grifo.jpg"),
      efectos: ["fortify_resistance", "increase_intelligence", "regenerate_agility", "increase_strength"],
    },
    {
      id: 10,
      nombre: "Unicorn Tears",
      imagen: require("../assets/lagrimas.jpg"),
      efectos: ["increase_strength", "increase_intelligence", "increase_resistance", "increase_agility"],
    },
    {
      id: 11,
      nombre: "Raving bee",
      imagen: require("../assets/RavingBee.png"),
      efectos: ["cleanse_parchment"],
    },
    {
      id: 12,
      nombre: "Black Lotus",
      imagen: require("../assets/BlackLotus.png"),
      efectos: ["cleanse_parchment"],
    },
  ];
  
const IngredientesScreen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [createdPotion, setCreatedPotion] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const scrollViewRef = useRef(null);

  const disableScroll = () => {
    setScrollEnabled(false);
  };

  const enableScroll = () => {
    setScrollEnabled(true);
  };

  const selectIngredient= (ingredient) => {
    if (selectedIngredients.length < 2) {
      setSelectedIngredients([...selectedIngredients, ingredient]);

      if (selectedIngredients.length === 1) {
        disableScroll();
        
        // Desplazar hacia el inicio automáticamente cuando se seleccionan dos ingredientes
        setTimeout(() => {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }, 100); // Puedes ajustar el tiempo según sea necesario
      }
    }
  };

  const createPotion = () => {
    // Verifica que se hayan seleccionado exactamente 2 ingredientes
    if (selectedIngredients.length === 2) {
      // Crea la poción combinando los efectos de los ingredientes seleccionados
      const poción = {
        nombre: 'EPIC POTION',
        efectos: [
          ...selectedIngredients[0].efectos,
          ...selectedIngredients[1].efectos,
        ],
      };
      setCreatedPotion(poción);
    }
  };

  const returnIngredients = () => {
    // Limpiar los ingredientes seleccionados y la poción creada
    setSelectedIngredients([]);
    setCreatedPotion(null);
  };

  const SelectedIngredientsEffects = ({ ingredientesSeleccionados }) => {
    return (
      <SelectedIngredientsContainer>
        <SelectedIngredientsTitle>Ingredients Effects:</SelectedIngredientsTitle>
        {selectedIngredients.map((ingredient, index) => (
          <IngredientEffect key={index}>{ingredient.nombre} Effects: {ingredient.efectos.join(", ")}</IngredientEffect>
        ))}
      </SelectedIngredientsContainer>
    );
  };

  return (
    
    <ScrollView
    ref={scrollViewRef}
    style={{ flex: 1, width: '100%' }}
    contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
    scrollEnabled={scrollEnabled}>

      {ingredients.map((ingredient) => (
        <IngredientButton
          key={ingredient.id}
          onPress={() => selectIngredient(ingredient)}
        >
          <IngredientView>
            <IngredientImage source={ingredient.imagen}/>
            <IngredientText>{ingredient.nombre}</IngredientText>
          </IngredientView>
        </IngredientButton>
      ))}
      
      {selectedIngredients.length === 2 && !createdPotion && (
        <>
        <CreatePotionButton onPress={() => { createPotion()}}>
          <PotionButtonText>Create Potion</PotionButtonText>
        </CreatePotionButton>
      
        <SelectedIngredientsEffects selectedIngredients={selectedIngredients} />
        </>
      )}

      {createdPotion && (
        <PotionView >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop:15  }}>CREATED POTION:</Text>
          <Text style={{ fontSize: 20, marginTop:15 }}>{createdPotion.nombre}</Text>
          <Text style={{ fontSize: 17, marginTop: 30 }}>Efects:</Text>
          {createdPotion.efectos.map((efecto, index) => (
            <Text key={index}>{efecto}</Text>
          ))}
          <ReturnButton onPress={() => { returnIngredients(); enableScroll(); }}>
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
    height: 100px;
    align-self: center;
    background: #4c2882;
    border-radius: 60px; 
`
const IngredientText = styled.Text `
    bottom: -6px;
    color: #CCCCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;    
`
const IngredientImage = styled.Image`
  width: 50px;
  height: 50px; 
  border-radius: 25px;
  align-self: center;
  top: 7px;
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
const Text = styled.Text `
    bottom: -6px;
    color: #CCCCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
  `
export default IngredientesScreen;
