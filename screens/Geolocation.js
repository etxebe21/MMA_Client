import React from 'react';
import { StyleSheet} from "react-native";
import styled from "styled-components/native";
import MapView from 'react-native-maps';

const Geolocation = () => {


    return(
        <View>
            <Text>ARTEFACTS  GEOLOCATION</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
const View = styled.View`
    flex: 1;
    background: #C8A2C8;
`
const Text = styled.Text `
    bottom: -50px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center;  
`

export default Geolocation;