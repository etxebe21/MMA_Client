import React, { Component,useState } from 'react';
import styled from 'styled-components/native';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import { AppRegistry, StyleSheet, TouchableOpacity, Linking,ActivityIndicator} from 'react-native';
import axios from 'axios';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanQr = () => {
    const [isScanning, setIsScanning] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
  
    const onSuccess = async (e) => {
      setIsScanning(false);
      setIsLoading(true);
  
      try {
        const response = await axios.post('', {
          data: e.data,
        });
  
        setIsLoading(false);
        console.log('Solicitud exitosa:', response.data);
  
  
      } catch (error) {
        setIsLoading(false);
        console.error('Error en la solicitud:', error);
  
      }
    };
  
    return (
      <View>
        <Text>SCAN QR</Text>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Espera por favor...</Text>
          </View>
        ) : (
          isScanning && (
            <QRCodeScanner onRead={onSuccess} />
          )
        )}
      </View>
    );
  };
  

const View = styled.View`
  flex: 1;
  background: #C8A2C8;
`;

const Text = styled.Text `
    bottom: -28px;
    color: #4c2882;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`
const ViewText = styled.Text`
  bottom: -18px;
  color: #4c2882;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;
`;

const styles = StyleSheet.create({
    camera: {
        width: 350,
        height: 420,
        alignSelf: 'center',
        borderRadius: 30,
    },
});

export default ScanQr;
