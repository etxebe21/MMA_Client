import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Alert } from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../context/Context';
import { axiosInstance } from '../axios/axiosInstance';


PERMISSIONS.IOS.CAMERA;


const ScanQr = () => {

  const {userGlobalState, handleUserGlobalState} = useContext (Context);

  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const navigation = useNavigation();

  const onSuccess = async (event) => {
    setIsScanning(false);
    setIsLoading(true);

    try {
      // console.log("Escaneando");
      const data = {
        "insideTower": !userGlobalState.insideTower
      };
      // console.log(event);

      const response = await axiosInstance.patch(`https://mmaproject-app.fly.dev/api/users/updateUser/${event}`, data);

      setTimeout(() => {
        this.scanner.reactivate();
      }, 3000);

      // console.log('Solicitud exitosa:', response.data);
      setInsideTower(newInsideTowerState);

      const message = newInsideTowerState
      ? 'Entrada al torreón confirmada'
      : 'Salida del torreón confirmada';

      Alert.alert('Confirmación', message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>SCAN QR</Text>
      <QRCodeScanner
        onRead={(event) => {
          // console.log("Código QR leído:", event.data);
          onSuccess(event.data);
        }}
        reactivate={false}
        ref={node => {
          this.scanner = node;
        }}
        cameraStyle={{ height: '100%' }}
        showMarker={true}
      />
      {isLoading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Wait please...</Text>
        </View>
      )}

    </View>
  );
};


const View = styled.View`
  flex: 1;
  background: #C8A2C8;
`;

const Text = styled.Text`
    bottom: -1px;
    color: #4c2882;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

const styles = StyleSheet.create({
  camera: {
    width: 350,
    height: 420,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ScanQr;
