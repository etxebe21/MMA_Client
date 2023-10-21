import 'react-native-gesture-handler';
import React , {useState, useEffect} from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import CreatePotions from './screens/CreatePotions';
import Splash from './components/Splash';
import Login from './screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';



const App =  () => {
  const Tab = createMaterialTopTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);

  useEffect(() => {
    const storeData = async (value) => {
      value = { name: "name" };
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
        console.log('Data stored successfully.');
      } catch (e) {
        console.error('Error storing data:', e);
      }
    };
  
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        console.log('Data retrieved successfully:', JSON.parse(jsonValue));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.error('Error retrieving data:', e);
        return null;
      }
    };
  
    storeData();
    getData();
  }, []);
  // El array vacío asegura que esta operación se ejecute solo una vez

  // useEffect(() => {
  //   if (isLoginModalVisible) {
      
  //     const timeoutId = setTimeout(() => {
  //       setLoginModalVisible(false);
  //     }, 5000);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isLoginModalVisible]);



  const handleLogin = () => {
    // Aquí debes realizar la lógica de autenticación
    // Si la autenticación es exitosa, establece isAuthenticated en true y cierra el modal
    setIsAuthenticated(true);
    AsyncStorage.setItem('my-key', JSON.stringify(true));
    setLoginModalVisible(false);
  };

  return(
    
    
<View style = {{ flex: 1}}>
<Splash/>
    <Modal
        animationType="slide"
        transparent={false}
        visible={isLoginModalVisible}
        onRequestClose={() => {
          setLoginModalVisible(false);
        }}
      >
       <View style={styles.modalContainer}>
          <Login onLogin={handleLogin} />
        </View>
      </Modal>
      {/* {isAuthenticated && ( */}
   
        <>
      <Header/>  
  
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route}) => ({
            swipeEnabled: true,
            tabBarStyle: { backgroundColor:'#C8A2C8'}, 
            tabBarIndicatorStyle: {backgroundColor: "#4c2882",},
            tabBarActiveTintColor: '#4c2882',
            tabBarInactiveTintColor: '#913595',
            tabBarShowLabel: false,
            tabBarShowIcon: true,
          tabBarIcon: ({focused, color,}) => {
            let iconName;
            if(route.name === 'Home') iconName = 'home'
          
          else if(route.name === 'CreatePotions') iconName = 'create'
          else if(route.name === 'Profile') iconName = 'people'
          return <Icon name = {iconName} size={26} color={color} />
            },
        })}
      >
      <Tab.Screen name = "Home" component={Home} />
      <Tab.Screen name = "CreatePotions" component={CreatePotions} />
      <Tab.Screen name = "Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
      {/* )} */}
      </View>
  );
  
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8A2C8',
  },
});


export default App