import React from "react";
import styled from "styled-components/native";
import IngredientesScreen from "../components/Ingredients";

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`

const Text = styled.Text `
    bottom: -10px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
    
`

const CreatePotions = () => {

    return(
        
        
        <View>
                
             <Text> CREATE POTIONS </Text>
             <IngredientesScreen></IngredientesScreen>
                
        </View>
       
    )
}

export default CreatePotions;