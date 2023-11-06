import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import { AppRegistry, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanQr = () => {
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    return (
        <View>
            <ViewText>SCAN QR</ViewText>
            <QRCodeScanner
                onRead={this.onSuccess}
            />
        </View>
    );
};

const View = styled.View`
  flex: 1;
  background: #C8A2C8;
`;

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
