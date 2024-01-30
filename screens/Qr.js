import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import { Alert, ImageBackground, StyleSheet, Dimensions } from "react-native";
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
  justify-content: center;
  align-items: center;
  display: flex;
`;

const QrView = styled.View`
  width: ${Dimensions.get('window').width * 0.5}px;
  height: ${Dimensions.get('window').height * 0.25}px;
  justify-content: center;
  align-items: center;
  display: flex;
  top: -5%;
  background: rgba(76, 40, 130, 0);
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
