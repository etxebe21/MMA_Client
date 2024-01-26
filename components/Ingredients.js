import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import axios from 'axios';
import { FlatList, ScrollView, Modal, StyleSheet, ImageBackground, View, ToastAndroid,TouchableOpacity } from "react-native";
import { axiosInstance } from "../axios/axiosInstance";
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect';
import { io } from "socket.io-client";

const IngredientesScreen = ({ setIsPotionCreated }) => {
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [createdPotion, setCreatedPotion] = React.useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const {userGlobalState, setUserGlobalState } = useContext(Context);
  const [potionIsCreated, setPotionIsCreated] = useState(false);
  const [villainPotions, setVillainPotions] = useState([]);
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [positionObject, setPositionObject] = useState();
  const [resultPotion, setResultPotion] = useState();
  const {selectingUser, setSelectingUser} = useContext(Context);
  
  
  useEffect(() => {
    getIngredientsFromDatabase();
    console.log("USER GLOBAL STATE", userGlobalState);
    whitchPotion();
  }, []);

  useEffect(() => {
    console.log("SELEECTED EFFECTS", selectedEffects);
    console.log(villainPotions);
  }, [selectedEffects]);

  useEffect(() => {
    console.log(resultPotion);
  }, [resultPotion]);


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

  const createdPotionSection = () => {
    let data;
    let indexOf = -1;

    const combinedEffectsArray = selectedIngredients.reduce((array, ingredient) => {
      return array.concat(ingredient.effects);
    }, []);

    const hasMatchingEffects = villainPotions.some((affection, index) => {
      console.log(index);
      indexOf = index;
      return (
        affection.healing_effects.every((effect) => combinedEffectsArray.includes(effect))
        );
      });
      console.log("DATOOOOOS ********************************");
    console.log(hasMatchingEffects);
    console.log(indexOf);
    if (hasMatchingEffects === true ) {
      switch (indexOf) {
        case 0:
          data = {
            name: "Anti Rotting Plague",
            image: "",
            healing_type: "Intelligence",
            heal: 75,
            description: "The Rotten Plague Cure Potion, created by the wise Elara, is a mystical blend of herbs and essences. Its healing glow and comforting fragrance eradicate the plague, restoring vitality to the sick and restoring lost joy to the affected people. An elixir of hope in dark times.",
            type: "DISEASE"
          }
          setResultPotion(data);
          // setPotionIsCreated(true);

          break;

        case 1:
          data = {
            name: "Anti super Weakness",
            image: "",
            healing_type: "Strength",
            heal: 60,
            description: "The Anti-Weakening Potion, an invigorating elixir made from exotic ingredients, revitalizes the body and restores lost energy. Its unique formula strengthens both physically and mentally, providing a defense against fatigue and exhaustion. With a single sip, this potion stands as a shield against weakening, infusing vitality and renewing stamina.",
            type: "DISEASE"
          }
          setResultPotion(data);
          // setPotionIsCreated(true);


          break;

        case 2:
          data = {
            name: "Anti villains",
            image: "",
            healing_type: "Agility",
            heal: 30,
            description: "The Marrow Apocalypse Healing Potion, with its revitalizing essence, stands as a beacon of hope in the midst of devastation. This unique blend of arcane ingredients not only restores physical health, but also purifies the vital core, dispelling the shadows of disease. At the epicenter of desolation, this potion emerges as a powerful antidote, breathing life and renewal into hearts affected by the catastrophe of Marrow Apocalypse.",
            type: "DISEASE"

          }
          setResultPotion(data);
          // setPotionIsCreated(true);
          console.log("Llegamos aqui")


          break;

        case 3:
          data = {
            name: "Mortimagus",
            image: "",
            healing_type: "Intelligence,Agility and Strength",
            heal: 40,
            description: "Mortimagus, la poción ancestral forjada en las profundidades de la alquimia, despliega su resplandor etéreo y fragancia envolvente. Este elixir místico no solo cura heridas físicas, sino que también restaura la armonía espiritual y otorga una fuerza renovada. Con cada gota, despierta el poder interior y desata una esencia celestial en quien la consume",
            type: "CURSE"
          }
          setResultPotion(data);
          console.log("llegamos aqui")
          break;
        }
        setPotionIsCreated(true);
    }
    else {
      ToastAndroid.showWithGravity('No existe una poción con esas caracteristicas', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }


  };

  
  const whitchPotion = async () => {
    const data = await axios.get('https://gist.githubusercontent.com/oscar1771/c24a8ef9fe9190c406e8219a5fd40275/raw/bd11299dd65f6607ca8756378dc36c90df4db2be/affections.json');
    setVillainPotions(data.data.affections);
  }
  
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
  
  const returnCreatePotion = () => {
      setPotionIsCreated(false);
      setSelectedIngredients([]);
  }
  
  
  const applyPotion = () => {

    let sendData = {
      id: selectingUser._id,
      inteligencia: selectingUser.inteligencia,
      fuerza: selectingUser.fuerza,
      agilidad: selectingUser.agilidad,
    }


    if (resultPotion.healing_type === "Strength")
    {
      sendData.fuerza = selectingUser.maxStat.fuerza;
      sendData.epic_weakness= false

    }
    else if (resultPotion.healing_type === "Agility")
    {
      sendData.agilidad = selectingUser.maxStat.agilidad;
      sendData.marrow_apocalypse = false;
      
    }
    else if (resultPotion.healing_type === "Intelligence")
    {
      sendData.inteligencia = selectingUser.maxStat.inteligencia;
      sendData.rotting_plague = false;

    }
    else 
    {
      sendData.fuerza = selectingUser.maxStat.fuerza;
      sendData.agilidad = selectingUser.maxStat.agilidad;
      sendData.inteligencia = selectingUser.maxStat.inteligencia;
      sendData.ethazium = false
    }
    console.log("DATAAAAAAAAAAAAAAAA")
    console.log(sendData);
    socket.emit('HealUser', sendData);
    ToastAndroid.showWithGravity('Pocion aplicada satisfactoriamente', ToastAndroid.SHORT, ToastAndroid.CENTER);

    set

  }
  
  return (
    
    <Container>
      {!createdPotion && !potionIsCreated && (
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
          <ScrollView style={{ maxHeight: 260 }}>

            <SelectedIngredientsTitle>{selectedPotion ? selectedPotion.name : ''}</SelectedIngredientsTitle>
            {selectedIngredients.map((ingredient, index) => (
              <IngredientEffect key={index}>
                <PotionEffectText> {`${ingredient.name} `}Effects:</PotionEffectText> {ingredient.effects.join(", ")}

              </IngredientEffect>
            ))}
          </ScrollView>

        </SelectedIngredientContainer>
      )}



      {selectedIngredients.length === 2 && !createdPotion && userGlobalState.role != "MORTIMER" && (
        <>
          <CreatePotionButton onPress={() => createPotion(setIsPotionCreated)}>
            <PotionButtonText>Create Potion</PotionButtonText>
          </CreatePotionButton>
        </>
      )}

      {selectedIngredients.length === 2 && !createdPotion && userGlobalState.role === "MORTIMER" && (
        <>
          <CreatePotionButton onPress={() => createdPotionSection()}>
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

      {potionIsCreated && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={potionIsCreated}
        >
          <View>
            <ImageBackground
              source={require('../assets/modalPantano.png')}
              style={styles.imageBackgrounds}>
              <PotionSection>

                <Text style={styles.title}>{resultPotion.name}</Text>

                <Text style={styles.typeOf}>{resultPotion.type}</Text>
                <Text style={styles.type}>Upgrades: {resultPotion.healing_type}</Text>

                <Text style={styles.description}>
                  {resultPotion.description}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity  onPress={returnCreatePotion} style={styles.buttonLeft}>
                    <Text style={styles.buttonText}>Crear otra poción</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={applyPotion} style={styles.buttonRight}>
                    <Text style={styles.buttonText}>Aplicar</Text>
                  </TouchableOpacity>
                </View>
              </PotionSection>
            </ImageBackground>
          </View>

        </Modal>
      )}
      <Spacer></Spacer>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageBackgrounds: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 50,
    color: 'black',

  },
  type: {
    top: '3%',
    color: 'purple',
    fontSize: 15,
  },
  typeOf: {
    top: '2%',
    color: 'purple',
    fontSize: 25,
  },
  description: {
    top: '10%',
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  
    marginTop: '30%',
  },
  buttonLeft: {
    backgroundColor: 'rgba(144, 144, 144 ,0.5)',
    padding: 10,
    borderRadius: 5,
    marginRight: '10%',  
  },
  buttonRight: {
    backgroundColor: 'rgba(144, 144, 144 ,0.5)',
    padding: 10,
    borderRadius: 5,
    marginLeft: '10%', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

});

const Container = styled.View`
  flex: 1;
  padding: 0px;
`;

const IngredientsContainer = styled.View`
  flexDirection: row;
`;

const PotionEffectText = styled.Text`
  color: yellow;
  font-family: 'Tealand';
`;

const PotionSection = styled.View`
  flex: 1;
  justifyContent: 'center';
  alignItems: 'center';
  top: 15%;
`

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
