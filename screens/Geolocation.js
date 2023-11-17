import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Alert,ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const GeolocationUser = () => {
  const [userLocation, setUserLocation] = useState(null);

  const img = require("../assets/geofondo.png")
  const userImage = require("../assets/newPotion.png")
  const artifact1 = {latitude: 43.310625, longitude: -2.003209}
  const artifact2 = {latitude: 43.310673, longitude: -2.002441}
  const artifact3 = {latitude: 43.309534, longitude: -2.002030}
  const artifact4 = {latitude: 43.309801, longitude: -2.003381}

  useEffect(() => {
   
    setUserLocation({ latitude: 43.30972753944833, longitude: -2.002748937230638 });
  }, []);

  const isUserNearMarker = () => {
    if (userLocation) {
      if (
        userLocation.latitude === artifact1.latitude &&
        userLocation.longitude === artifact1.longitude
      ) {
        // Las posiciones son iguales, muestra el botón o realiza acciones adicionales aquí.
        Alert.alert(
          'Estás en la misma ubicación que el marcador',
          'Muestra el botón o realiza acciones adicionales aquí.'
        );
      } else {
        // Las posiciones son diferentes, puedes realizar otras acciones aquí si es necesario.
        Alert.alert(
          'No estás en la misma ubicación que el marcador',
          'Otras acciones pueden realizarse aquí.'
        );
      }
    }
  };
  
    return (
      <Container>
       

       <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: 43.30972753944833,
          longitude: -2.002748937230638,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation = {true}
      >
        {/* Marcador de la ubicación del usuario
        {userLocation && (
          <Marker coordinate={userLocation} title="Tu Ubicación"   />
        )} */}

       
        <Marker
          coordinate={{ latitude: 43.310625, longitude: -2.003209 }} // Coordenadas de ejemplo
          title="Artefacto 1"
          description="Descripción del Artefacto 1"
        />
         <Marker
          coordinate={{ latitude: 43.310673, longitude: -2.002441 }} // Coordenadas de ejemplo
          title="Artefacto 2"
          description="Descripción del Artefacto 2"
        />
         <Marker
          coordinate={{ latitude: 43.309534, longitude: -2.002030}} // Coordenadas de ejemplo
          title="Artefacto 3"
          description="Descripción del Artefacto 3"
        />
         <Marker
          coordinate={{ latitude: 43.309801, longitude: -2.003381 }} // Coordenadas de ejemplo
          title="Artefacto 4"
          description="Descripción del Artefacto 4"
        />
       

      </MapView>
        {userLocation &&
          userLocation.latitude === artifact1.latitude &&
          userLocation.longitude === artifact1.longitude && (
            <Button
            title="Estás en la misma ubicación que el marcador"
            onPress={isUserNearMarker}
            />
            )}
            
          <BackgroundImage source={img}>
          <Title>Artifacts</Title>
          <Artifact1>
          </Artifact1>

          <Artifact2>

          </Artifact2>
          
          <Artifact3>

          </Artifact3>
          <Artifact4>

          </Artifact4>
          </BackgroundImage>
      </Container>
    );
  };

const styles = StyleSheet.create({
  map: {
    flex: 0,
    height: '50%',
    padding:170,
  },
});

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  resizeMode: cover;
  justify-content: center;
  opacity:0.8
`;

const Container = styled.View`
  flex: 1;
`;

const Artifact1 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-right:170px;
  margin-top:10px;
  border-radius:50px;
`;
const Artifact2 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-left:200px;
  margin-top:-90px;
  border-radius:50px;
`;

const Artifact3 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-right:170px;
  margin-top:30px;
  border-radius:50px;
`;

const Artifact4 = styled.View`
  border:5px;
  background-color: #CBCACA; 
  padding: 40px;
  align-self: center;
  margin-left:200px;
  margin-top:-90px;
  border-radius:50px;
`

const Artifact1Text = styled.Text`
  margin-left:50px; 
  font-weight: bold;
  font-size: 20px; 
  color: #4c2882;
`;

const Artifact2Text = styled.Text`
  margin-left:240px; 
  font-weight: bold;
  font-size: 20px; 
  color: #4c2882;
`;

const Artifact3Text = styled.Text`
  margin-left:50px; 
  font-weight: bold;
  font-size: 20px; 
  color: #4c2882;
`;

const Artifact4Text = styled.Text`
  margin-left:240px; 
  font-weight: bold;
  font-size: 20px; 
  color: #4c2882;
`;

const BorderColor = styled.View`
border:3px;
margin-left:-150px;
padding:80px;
`

const Title = styled.Text`
font-size: 40px; 
align-self:center;
color:#000000;
`;


export default GeolocationUser;

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
