import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const Geolocation = () => {
  const [userLocation, setUserLocation] = useState(null);

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
              setUserLocation({ latitude, longitude });
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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 43.3183, // Latitud de Donostia-San Sebastián (centro del mapa)
          longitude: -1.9807, // Longitud de Donostia-San Sebastián (centro del mapa)
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador en Donostia-San Sebastián */}
        <Marker coordinate={{ latitude: 43.3183, longitude: -1.9807 }} title="Donostia-San Sebastián" />

        {/* Marcador en la ubicación del usuario */}
        {userLocation && (
          <Marker coordinate={userLocation} title="Tu Ubicación" pinColor="blue" />
        )}
      </MapView>
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

export default Geolocation;



// import React, { useEffect, useState } from 'react';
// import { StyleSheet, PermissionsAndroid } from 'react-native';
// import styled from 'styled-components/native';
// import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';

// const Geolocation = () => {
//   const [region, setRegion] = useState(null);

// //   useEffect(() => {
// //        const requestLocationPermission = async () => {
// //       try {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //           {
// //             title: 'App Location Permission',
// //             message: 'App needs access to your location.',
// //           }
// //         );
// //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //           navigator.geolocation.getCurrentPosition(
// //             position => {
// //               const { latitude, longitude } = position.coords;
// //               setRegion({
// //                 latitude,
// //                 longitude,
// //                 latitudeDelta: 0.0922,
// //                 longitudeDelta: 0.0421,
// //               });
// //             },
// //             error => console.log(error),
// //             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
// //           );
// //         } else {
// //           console.log('Location permission denied');
// //         }
// //       } catch (err) {
// //         console.warn(err);
// //       }
// //     };

// //     requestLocationPermission();
// //   }, []);

//   return (
//     <Container>
//       {region ? (
//         <MapView
//             provider={PROVIDER_GOOGLE}           
//             style={styles.map}
//             region={{
//                 latitude: 37.78825,
//                 longitude: -122.4324,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121,
//             }}
//             showsUserLocation
//             followsUserLocation
//         >
//           <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
//         </MapView>
//       ) : (
//         <LoadingText>Loading...</LoadingText>
//       )}
//     </Container>
    
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       height: 400,
//       width: 400,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     map: {
//       ...StyleSheet.absoluteFillObject,
//     },
//    });


// const Container = styled.View`
//   flex: 1;
// `;

// const LoadingText = styled.Text`
//   flex: 1;
//   align-self: center;
//   margin-top: 50%;
// `;

// export default Geolocation;
