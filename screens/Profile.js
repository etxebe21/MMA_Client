import React from "react";
import styled from "styled-components/native";

const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`

const Text = styled.Text `
    bottom: -28px;
    color: #4c2882;
    font-size: 25px;
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
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const user = {
    first_name: "Ikasle",
    last_name: "Aeg",
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
        <Text>Nombre: {user.first_name} {user.last_name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>HitPoints: {user.características.general.hitPoints}</Text>
        <Text>Nivel: {user.características.general.level}</Text>
        <Text>Dinero: {user.características.general.dinero}</Text>
        <CaracText>Atributos:</CaracText>
        <Text>Fuerza: {user.características.atributos.fuerza}</Text>
        <Text>Resistencia: {user.características.atributos.resistencia}</Text>
        <Text>Agilidad: {user.características.atributos.agilidad}</Text>
        <Text>Inteligencia: {user.características.atributos.inteligencia}</Text>
        <Text>Cansancio: {user.características.atributos.cansancio}</Text>
        <CaracText>Enfermedades:</CaracText>
        <Text>Hambruna: {user.características.enfermedades.hambruna ? "Sí" : "No"}</Text>
        <Text>Ceguera: {user.características.enfermedades.ceguera ? "Sí" : "No"}</Text>
        <Text>Locura: {user.características.enfermedades.locura ? "Sí" : "No"}</Text>
        <Text>Miedo: {user.características.enfermedades.miedo ? "Sí" : "No"}</Text>
        <Text>Parálisis: {user.características.enfermedades.parálisis ? "Sí" : "No"}</Text>
        <Text>Psicosis: {user.características.enfermedades.psicosis ? "Sí" : "No"}</Text>
    </View>
    )
}

export default Profile;