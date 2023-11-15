import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

const Geolocation = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Solicitar permiso para acceder a la ubicación del usuario
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'App Location Permission',
            message: 'App needs access to your location.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <Container>
      {region ? (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Container = styled.View`
  flex: 1;
`;

const LoadingText = styled.Text`
  flex: 1;
  align-self: center;
  margin-top: 50%;
`;

export default Geolocation;
