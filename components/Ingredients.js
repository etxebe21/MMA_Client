import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from 'axios';
import { FlatList, ScrollView } from "react-native";
import * as Keychain from 'react-native-keychain';
import { refreshToken } from "../keychain";
import { axiosInstance } from "../axios/axiosInstance";

const IngredientesScreen = ({ setIsPotionCreated }) => {
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [createdPotion, setCreatedPotion] = React.useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedPotion, setSelectedPotion] = useState(null);

  useEffect(() => {
    getIngredientsFromDatabase();
  }, []);

  
  const getIngredientsFromDatabase = async () => {
    try {
      const url = 'https://mmaproject-app.fly.dev/api/ingredients';

      const response = await axiosInstance.get(url
      );
      const ingredients = response.data.data;
      setIngredients(ingredients);
      console.log('Ingredientes Recibidos');
    } catch (error) {
      console.error('Error al obtener ingredientes:', error);
    }
  };

  //SELECCIONA LOS INGREDIENTES HASTA UN MAX DE 2
  const selectIngredient = (ingredient) => {
    if (selectedIngredients.length < 2) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients([ingredient]);
    }
  };

  //CREAR POCIONES
  const createPotion = () => {

    if (selectedIngredients.length === 2) {
      const poción = {
        name: 'EPIC POTION',
        effects: [
          ...selectedIngredients[0].effects,
          ...selectedIngredients[1].effects,
        ],
      };
      setCreatedPotion(poción);

      const ingredientsWithCleanseParchment = selectedIngredients.filter((ingrediente) => {
        return ingrediente.effects.includes("cleanse_parchment");
      });

      const cantidadCleanseParchment = ingredientsWithCleanseParchment.length;

      if (cantidadCleanseParchment === 2) {
        setIsPotionCreated(true);
      }
    }
  };

  return (

    <Container>
      {!createdPotion && (
        <IngredientsContainer>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={{ paddingRight: 10 }}
            renderItem={({ item }) => (
              <IngredientButton onPress={() => selectIngredient(item)}>
                <IngredientView>
                  <IngredientImage source={{ uri: item.image }} />
                  <IngredientText>{item.name}</IngredientText>
                </IngredientView>
              </IngredientButton>
            )}
          />
        </IngredientsContainer>
      )}


      {/* MODALES PARA LOS EFECTOS DE LAS POCIONES */}
   
      {selectedIngredients.length > 0 && !createdPotion && (

        <SelectedIngredientContainer>
          <ScrollView style={{ maxHeight: 230 }}>

            <SelectedIngredientsTitle>{selectedPotion ? selectedPotion.name : ''}</SelectedIngredientsTitle>
            {selectedIngredients.map((ingredient, index) => (
              <IngredientEffect key={index}>
                <PotionEffectText> {`${ingredient.name} `}Effects:</PotionEffectText> {ingredient.effects.join(", ")}
                
              </IngredientEffect>
            ))}
          </ScrollView>

        </SelectedIngredientContainer>
      )}

   

      {selectedIngredients.length === 2 && !createdPotion && (
        <>
          <CreatePotionButton onPress={() => createPotion(setIsPotionCreated)}>
            <PotionButtonText>Create Potion</PotionButtonText>
          </CreatePotionButton>
        </>
      )}

      {createdPotion && (
        <PotionView>
          <TextTitle style={{ fontSize: 24, fontWeight: "bold", marginTop: 15, color: 'blue' }}>CREATED POTION:</TextTitle>
          <Text style={{ fontSize: 20, marginTop: 15, color: 'red' }}>{createdPotion.name}</Text>
          <Text style={{ fontSize: 25, marginTop: 30, color: 'red' }}>Effects:</Text>
          {createdPotion.effects.map((efecto, index) => (
            <TextEffects key={index}>{efecto}</TextEffects>
          ))}
        </PotionView>
      )}
      <Spacer></Spacer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0px;
`;

const IngredientsContainer = styled.View`
  flexDirection: row;
  marginTop: 13;
`;

const PotionEffectText = styled.Text`
  color: yellow;
  font-family: 'Tealand';
`;

const IngredientView = styled.View`
  width: 120px;
  height: 100px;
  align-items: center;
  border-radius: 50px;
  top:15%;
`;

const EffectsBackground = styled.ImageBackground`
width: 100%;
padding: 10px;
margin-top: 10px;
right:20px; 
`;

const IngredientButton = styled.TouchableOpacity`
  marginRight: 0px;
`;

const ContainerBrackground = styled.View`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  right:20px;
  background:purple;
`
const IngredientImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 25px;
  margin-bottom: 5px;
`;

const IngredientText = styled.Text`
  color: #CCCCCC;
  font-size: 12px;
  font-weight: bold;
`;

const CreatePotionButton = styled.TouchableOpacity`
  background: #CCCCCC;
  width: 180px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  margin-top: 10px;
  justify-content: center;
`;

const PotionButtonText = styled.Text`
  font-size: 16px;
  color: #4c2882;
  text-align: center;
  font-family:'Tealand';
`;

const PotionView = styled.View`
  align-self: center;
  background: rgba(149, 47, 160,0.5);
  width: 250px;
  height: 400px;
  margin-top: 10px;
  padding: 20px;
  border-radius:40px;
  top:25px;
  position:absolute;
  padding:25px;
  justifyContent: center,
  
`;


const SelectedIngredientsTitle = styled.Text`
  font-size: 5px;
  font-weight: bold;
  align-self: center;
  color: #CCCCCC;
  
`;

const IngredientEffect = styled.Text`
  font-size: 22px;
  margin-top: -5%;
  align-self: center;
  color: white;
  text-align: center;
`;

const Text = styled.Text`
  color: blue;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;
`;

const TextTitle = styled.Text`
  color: purple;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;
`;
const TextEffects = styled.Text`
  color: yellow;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;


`;

const Spacer = styled.View`
height:80px;
`
const IngredientsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;


const Margen = styled.View`
top:5%;
`
const SelectedIngredientContainer = styled.View`
  width: 90%;
  padding: 5%;
  margin-top: 10%;
  display: flex;
  margin-left: 15%;
  background-color: rgba(124, 44, 245, 0.5);
  border-radius: 20px;
`;





export default IngredientesScreen;
