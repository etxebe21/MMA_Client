import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import { ImageBackground, } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Qr = () => {
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const getUserEmailFromStorage = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                console.log("entra");
                if (storedEmail) {
                    setUserEmail(storedEmail);
                }
            } catch (error) {
                console.error('Cant get email from async storage:', error);
            }
        };

        getUserEmailFromStorage();
    }, []);
    if (userEmail) {

        return (

            <View>
                <ViewText>QR</ViewText>
                <QrView>
                    <QRCode
                        value={userEmail}
                        size={350}
                        color="purple"
                        backgroundColor="#BB8FCE"
                        logo={require('../assets/newPotion.png')}
                    />
                </QrView>
            </View>
        )
    }
}


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