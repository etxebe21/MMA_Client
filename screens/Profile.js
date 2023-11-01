import React from "react";
import styled from "styled-components/native";

const userAtributes = {
    name: "Ikasle",
    email: "ikasle@ikasle.aeg.eus",
    características: {
        general: {
            hitPoints: 10,
            level: 5,
            dinero: 100
        },
        atributos: {
            cansancio: 20,
            fuerza: 40,
            resistencia: 80,
            agilidad: 50,
            inteligencia: 10
        },
        enfermedades: {
            hambruna: false,
            ceguera: false,
            locura: true,
            miedo: false,
            parálisis: false,
            psicosis: false
        }
    },
    estado: true,
};

const Profile = () => {
   
    return(
    
    <View>
        <ViewText>PROFILE</ViewText>
        <Text>Nombre: {userAtributes.name}</Text>
        <Text>Email: {userAtributes.email}</Text>
        <Text>HitPoints: {userAtributes.características.general.hitPoints}</Text>
        <Text>Nivel: {userAtributes.características.general.level}</Text>
        <Text>Dinero: {userAtributes.características.general.dinero}</Text>
        <CaracText>Atributos:</CaracText>
        <Text>Fuerza: {userAtributes.características.atributos.fuerza}</Text>
        <Text>Resistencia: {userAtributes.características.atributos.resistencia}</Text>
        <Text>Agilidad: {userAtributes.características.atributos.agilidad}</Text>
        <Text>Inteligencia: {userAtributes.características.atributos.inteligencia}</Text>
        <Text>Cansancio: {userAtributes.características.atributos.cansancio}</Text>
        <CaracText>Enfermedades:</CaracText>
        <Text>Hambruna: {userAtributes.características.enfermedades.hambruna ? "Sí" : "No"}</Text>
        <Text>Ceguera: {userAtributes.características.enfermedades.ceguera ? "Sí" : "No"}</Text>
        <Text>Locura: {userAtributes.características.enfermedades.locura ? "Sí" : "No"}</Text>
        <Text>Miedo: {userAtributes.características.enfermedades.miedo ? "Sí" : "No"}</Text>
        <Text>Parálisis: {userAtributes.características.enfermedades.parálisis ? "Sí" : "No"}</Text>
        <Text>Psicosis: {userAtributes.características.enfermedades.psicosis ? "Sí" : "No"}</Text>
    </View>
    )
}

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`

const Text = styled.Text `
    bottom: -28px;
    color: #4c2882;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const CaracText = styled.Text `
    bottom: -28px;
    color: #CCCCCC;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const ViewText = styled.Text `
    bottom: -18px;
    color: #4c2882;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Profile;