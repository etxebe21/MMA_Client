import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const View = styled.View`
    flex: 1;
    bottom: -30px;
    width: 30%;
    height: 300px;
    align-self: center;
    background: #C8A2C8;
`

const Text = styled.Text `
    bottom: -10px;
    color: #4c2882;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
    
`
const ingredientes = [
    {
      id: 1,
      nombre: "Ingrediente 1",
    //   imagen: require("./ruta/a/la/imagen1.png"),
      efectos: ["Efecto 1", "Efecto 2", "Efecto 3", "Efecto 4"],
    },
    {
        id: 2,
        nombre: "Ingrediente 2",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["Efecto 1", "Efecto 2", "Efecto 3", "Efecto 4"],
      },
      {
        id: 3,
        nombre: "Ingrediente 3",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["Efecto 1", "Efecto 2", "Efecto 3", "Efecto 4"],
      },
      {
        id: 4,
        nombre: "Ingrediente 4",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["Efecto 1", "Efecto 2", "Efecto 3", "Efecto 4"],
      },
      {
        id: 5,
        nombre: "Ingrediente 5",
      //   imagen: require("./ruta/a/la/imagen1.png"),
        efectos: ["Efecto 1", "Efecto 2", "Efecto 3", "Efecto 4"],
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
        nombre: "Poción combinada",
        efectos: [
          ...ingredientesSeleccionados[0].efectos,
          ...ingredientesSeleccionados[1].efectos,
        ],
      };
      setPocionCreada(poción);
    }
  };

  return (
    <View>
      {ingredientes.map((ingrediente) => (
        <TouchableOpacity
          key={ingrediente.id}
          onPress={() => seleccionarIngrediente(ingrediente)}
          style={{ marginVertical: 10, padding: 10, backgroundColor: "#f0f0f0" }}
        >
          <View>
            <Image source={ingrediente.imagen} style={{ width: 10, height: 10 }} />
            <Text>{ingrediente.nombre}</Text>
            {ingrediente.efectos.map((efecto, index) => (
              <Text key={index}>{efecto}</Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}

      {ingredientesSeleccionados.length === 2 && !pocionCreada && (
        <TouchableOpacity onPress={crearPocion} style={{ marginVertical: 30 }}>
          <Text style={{ fontSize: 20, color: "green" }}>Crear Poción</Text>
        </TouchableOpacity>
      )}

      {pocionCreada && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Poción Creada:</Text>
          <Text style={{ fontSize: 18 }}>{pocionCreada.nombre}</Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>Efectos:</Text>
          {pocionCreada.efectos.map((efecto, index) => (
            <Text key={index}>{efecto}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default IngredientesScreen;
