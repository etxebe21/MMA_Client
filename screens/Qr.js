import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert, ActivityIndicator, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Context } from "../context/Context";

const PERMISSION_AUTHORIZED = 'authorized';

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
}

// componentDidMount();

const Qr = () => {
  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { width1, height1 } = Dimensions.get('window');

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

  if (userGlobalState._id) {
    return (
      <ImageBackground
        source={require("../assets/wallpaper_QR.png")}
        style={[styles.imageBackground]}
      >
        <View>
          <QrView>
            <QRCode
              value={userGlobalState._id}
              size={180}
              color="#e2d7eb"
              backgroundColor="rgba(0, 0, 0, 0)"
              getRef={(event) => {
              }}
            />
          </QrView>
        </View>
      </ImageBackground>
    );
  } 
};

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  bottom: -28px;
  color: #4c2882;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.3px;
  align-self: center;
`;

const QrView = styled.View`
  width: ${Dimensions.get('window').width * 0.5}px;
  height: ${Dimensions.get('window').height * 0.79}px;
  justify-content: center;
  background: rgba(76, 40, 130, 0);
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
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%', 
  },
});

export default Qr;
