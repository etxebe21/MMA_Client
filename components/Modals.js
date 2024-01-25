import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components/native";
import { View, StyleSheet, ImageBackground} from 'react-native';
import { Modal } from "react-native";


const Modals = () => {

const [modalEthaziumVisible, setEthaziumModalVisible] = useState(false);
const [userGlobalState, setUserGlobalState] = useState();

// useEffect para manejar la apertura automática del modal Ethazium
useEffect(() => {
    // Verifica que el usuario actual tenga ethazium igual a true
    const ethaziumUser = userGlobalState?.ethazium;

    if (ethaziumUser) {
      openEthaziumModal();

      // Oculta el modal después de 5 segundos (ajusta según tu necesidad)
      const timeoutId = setTimeout(() => {
        closeEthaziumModal();
      }, 4000);

      // Limpia el timeout al desmontar el componente
      return () => clearTimeout(timeoutId);
    }
  }, [userGlobalState]);

  const openEthaziumModal = () => {
    setEthaziumModalVisible(true);
  };

  const closeEthaziumModal = () => {
    setEthaziumModalVisible(false);
  };

    return(

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEthaziumVisible}
                onRequestClose={closeEthaziumModal}
            >
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={require('../assets/La_Hermandad_Icon.png')}
                    style={styles.imageBackground}
                  >
                    <View style={styles.modalContent}>
                      <CloseText>YOU HAVE BEEN INFECTED BY THE ETHAZIUM CURSE</CloseText>
                    </View>
                  </ImageBackground>
                </View>
            </Modal>
    )

}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C8A2C8',
    },
  
  });

const CloseText = styled.Text`
  color: #3498db;
  font-size: 60px;
  flex-direction: row;
  top:40%;
`;

export default Modals;