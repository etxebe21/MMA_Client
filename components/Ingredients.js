import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { useEffect } from "react";
import axios from 'axios';

  
  const IngredientesScreen = ({ setIsPotionCreated }) => {
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [createdPotion, setCreatedPotion] = React.useState(null);
    const [ingredients, setIngredients] = useState([]);


    const getIngredientsFromDatabase = async () => {
      try {
        const url = 'https://mmaproject-app.fly.dev/api/ingredients';
        const response = await axios.get(url);
        const ingredients = response.data.data;
        setIngredients(ingredients);
        // console.log(ingredients);
      } catch (error) {
        console.error('Error al obtener ingredientes:', error);
      }
    };
  
    useEffect(() => {
      getIngredientsFromDatabase();
    }, []); 


    const disableScroll = () => {
      // Aquí puedes implementar la lógica necesaria
    };
  
    const enableScroll = () => {
      // Aquí puedes implementar la lógica necesaria
    };
  
    const selectIngredient = (ingredient) => {
      if (selectedIngredients.length < 2) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
      } else {
        setSelectedIngredients([ingredient]);
      }
    };
    const createPotion = () => {
      // Lógica para crear la poción
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
        // console.log(cantidadCleanseParchment);
  
        if (cantidadCleanseParchment === 2) {
          setIsPotionCreated(true);
        }
      }
    };
  
    const returnIngredients = () => {
      setSelectedIngredients([]);
      setCreatedPotion(null);
    };
  
    const SelectedIngredientsEffects = ({ ingredientesSeleccionados }) => {
      return (
        <SelectedIngredientsContainer>
          <SelectedIngredientsTitle>Ingredients Effects:</SelectedIngredientsTitle>
          {selectedIngredients.map((ingredient, index) => (
            <IngredientEffect key={index}>{ingredient.name} Effects: {ingredient.effects.join(", ")}</IngredientEffect>
          ))}
        </SelectedIngredientsContainer>
      );
    };
  
    const renderIngredients = () => {
      const rows = [];
      let currentRow = [];
  
      ingredients.forEach((ingredient, index) => {
        currentRow.push(
          <IngredientButton
            key={ingredient.id}
            onPress={() => selectIngredient(ingredient)}
          >
            <IngredientView>
              <IngredientImage source={{uri: ingredient.image}} />
              <IngredientText>{ingredient.name}</IngredientText>
            </IngredientView>
          </IngredientButton>
        );
  
        if ((index + 1) % 3 === 0 || index === ingredients.length - 1) {
          rows.push(
            <IngredientsRow key={rows.length}>
              {currentRow}
            </IngredientsRow>
          );
          currentRow = [];
        }
      });
  
      return rows;
    };
  
    return (
      <ScrollView>
        <Container>
          {renderIngredients()}
  
          {selectedIngredients.length > 0 && (
            <SelectedIngredientContainer>
              <SelectedIngredientsTitle>Selected Ingredient Effects:</SelectedIngredientsTitle>
              {selectedIngredients.map((ingredient, index) => (
                <IngredientEffect key={index}>
                  {ingredient.name} Effects: {ingredient.effects.join(", ")}
                </IngredientEffect>
              ))}
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
              <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 15 }}>CREATED POTION:</Text>
              <Text style={{ fontSize: 20, marginTop: 15 }}>{createdPotion.name}</Text>
              <Text style={{ fontSize: 17, marginTop: 30 }}>Efects:</Text>
              {createdPotion.effects.map((efecto, index) => (
                <Text key={index}>{efecto}</Text>
              ))}
              <ReturnButton onPress={() => { returnIngredients(); enableScroll(); }}>
                <ButtonText>RETURN</ButtonText>
              </ReturnButton>
            </PotionView>
          )}
          <Spacer></Spacer>
        </Container>
      </ScrollView>
    );
  };

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const IngredientsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const IngredientView = styled.View`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  align-items: center;
  background: #4c2882;
  border-radius: 60px;
`;

const IngredientButton = styled.TouchableOpacity`
  width: 35%;
  margin-right: -5px;
`;

const IngredientImage = styled.Image`
  width: 50px;
  height: 50px;
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
`;

const PotionView = styled.View`
  align-self: center;
  background: #4c2882;
  width: 250px;
  height: 400px;
  margin-top: 10px;
  padding: 20px;
`;

const ReturnButton = styled.TouchableOpacity`
  background: #913595;
  width: 200px;
  height: 50px;
  align-self: center;
  border-radius: 30px;
  margin-top: 10px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #CCCCCC;
  text-align: center;
`;

const SelectedIngredientsContainer = styled.View`
  margin-top: 10px;
  align-self: center;
  background: #4c2882;
  width: 240px;
  height: 290px;
  
`;

const SelectedIngredientsTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  color: #CCCCCC;
  margin-top: 10px;
`;

const IngredientEffect = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  align-self: center;
  color: #CCCCCC;
`;

const Text = styled.Text`
  color: #CCCCCC;
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

const SelectedIngredientContainer = styled.View`
  background: #4c2882;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
`;





export default IngredientesScreen;
