import React from "react";
import styled from "styled-components/native";
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanQr = () => {
   
    return(
    
    <View>
        <ViewText>SCAN QR</ViewText>
        <ScanQrView>
        <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
        </ScanQrView>
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
const ScanQrView = styled.View`
    bottom: -50px;
    width: 350px;
    height: 420px;
    align-self: center;
    background: #4c2882;
    border-radius: 30px; 
` 

const ViewText = styled.Text `
    bottom: -18px;
    color: #4c2882;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default ScanQr;