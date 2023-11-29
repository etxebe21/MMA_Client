import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {request, PERMISSIONS} from 'react-native-permissions';
const PERMISSION_AUTHORIZED = 'authorized';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Alert } from "react-native";
import { Context } from "../context/Context";

PERMISSIONS.IOS.CAMERA;

function componentDidMount()  {
    if (Platform.OS === 'ios') {
      Promise.all([
        request(PERMISSIONS.IOS.CAMERA),
      ]).then(([cameraStatus]) => {
        this.setState({
          isAuthorized: cameraStatus === "granted",
          isAuthorizationChecked: true,
        });
      });
    }
};

// componentDidMount();

const Qr = () => {
      
  const {userGlobalState,   handleUserGlobalState}  = useContext(Context);

  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
  }, []);
  


  useEffect(() => {
      if (scanned && userGlobalState.insideTower !== null) {
          if (userGlobalState.insideTower) {
              Alert.alert(
                  "Escaneo Exitoso",
                  "Tu código QR fue escaneado correctamente. ¡Tienes permiso para ir al Torreón! . Para acceder presiona la puerta",
                  [
                      {
                          text: "OK",
                          onPress: () => {
                              navigation.navigate('Torreon');
                          },
                      },
                  ],
                  { cancelable: false }
              );
          } else {
              Alert.alert(
                  "Acceso Denegado",
                  "Fuiste sacado del Torreón. No tienes permiso para ingresar.",
                  [
                      {
                          text: "OK",
                          onPress: () => {},
                      },
                  ],
                  { cancelable: false }
              );
          }
      }
  }, [scanned, navigation]);
  
  if (userGlobalState._id ) { // Asegurar que userID tenga un valor y el escaneo se haya realizado
      return (
          <View>
              <ViewText>QR</ViewText>
              <QrView>
                  <QRCode
                      value={userGlobalState._id}
                      size={350}
                      color="purple"
                      backgroundColor="#BB8FCE"
                      logo={require('../assets/newPotion.png')}
                      getRef={(event)  => {
                          //setScanned(true);
                      }}
                  />
              </QrView>
          </View>
      );
  } else {
      return null; // Ocultar el código QR si no se cumple la condición
  }
};


const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`

const Text = styled.Text`
    bottom: -28px;
    color: #4c2882;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const QrView = styled.View`
    bottom: -50px;
    width: 350px;
    height: 350px;
    align-self: center;
    background: #4c2882;
    border-radius: 30px; 
`


const ViewText = styled.Text`
    bottom: -18px;
    color: #4c2882;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Qr;