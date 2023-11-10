import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {request, PERMISSIONS} from 'react-native-permissions';
const PERMISSION_AUTHORIZED = 'authorized';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { Alert } from "react-native";

PERMISSIONS.IOS.CAMERA;

function componentDidMount() {
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

componentDidMount();

const Qr = () => {
    const [userID, setuserID] = useState('');
    const [insideTower, setInsideTower] = useState(null);
    const navigation = useNavigation();
    
    useEffect(() => {
        const getuserIDFromStorage = async () => {
            try {
                const storedID = await AsyncStorage.getItem('userID');
                console.log("entra");
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
          console.log(insideTower);
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
        }
    };

      useEffect(() => {
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
                        onPress: () => {
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }, [insideTower, navigation]);
    
    
      if (userID) {
        return (
          <View>
            <ViewText>QR</ViewText>
            <QrView>
              <QRCode
                value={userID}
                size={350}
                color="purple"
                backgroundColor="#BB8FCE"
                logo={require('../assets/newPotion.png')}
                getRef={(event)  => {
                    //navigation.navigate('Torreon');
                    console.log("funciona");
                }}
              />
            </QrView>
          </View>
        );
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
    height: 350x;
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