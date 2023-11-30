import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {request, PERMISSIONS} from 'react-native-permissions';
const PERMISSION_AUTHORIZED = 'authorized';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Alert, ActivityIndicator, ImageBackground, StyleSheet } from "react-native";

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
  const [userID, setuserID] = useState('');
  const [insideTower, setInsideTower] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
      const getuserIDFromStorage = async () => {
          try {
              const storedID = await AsyncStorage.getItem('userID');
              if (storedID) {
                  setuserID(storedID);
                  getUsersFromDatabase(storedID);
              }
          } catch (error) {
              console.error('Cant get email from async storage:', error);
          }
      };

      getuserIDFromStorage();
  }, [insideTower]);
  
  const getUsersFromDatabase = async (storedID) => {
      try {
        const url = `https://mmaproject-app.fly.dev/api/users/${storedID}`;
        const response = await axios.get(url);
        const insideTower = response.data.data.insideTower;
        setInsideTower(insideTower);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
  };

  useEffect(() => {
      if (scanned && insideTower !== null) {
          if (insideTower) {
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
  }, [scanned, insideTower, navigation]);
  
  if (userID ) { // Asegurar que userID tenga un valor y el escaneo se haya realizado
      return (
          <View>
            {/* <ViewText>QR</ViewText> */}
            <QrView>
              <QRCode
                value={userID}
                size={160}
                color="#e2d7eb"
                backgroundColor="rgba(0, 0, 0, 0)"
                // logo={require('../assets/newPotion.png')}
                getRef={(event)  => {
                    //navigation.navigate('Torreon');
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
  margin-top: 61%
  width: 50%;
  height: 30%;
  justify-content: center;
  background: rgba(76, 40, 130, 0);
  border-radius: 0px;
`


const ViewText = styled.Text`
    bottom: -18px;
    color: #4c2882;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Qr;