import React from "react";
import styled from "styled-components/native";

const ScanQr = () => {
   
    return(
    
    <View>
        <ViewText>SCAN QR</ViewText>
        <ScanQrView></ScanQrView>
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