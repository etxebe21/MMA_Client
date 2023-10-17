import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import CreatePotions from './screens/CreatePotions';
import Splash from './components/Splash';
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"


const App =  () => {
  const Tab = createMaterialTopTabNavigator();

  return(
    <>

    <Splash/>
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
  );
};




// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAbnx2iWWOZWoFNBjIzF8E-GEfYaodc5ec",
//   authDomain: "mmaproject-c1d4c.firebaseapp.com",
//   projectId: "mmaproject-c1d4c",
//   storageBucket: "mmaproject-c1d4c.appspot.com",
//   messagingSenderId: "769950438406",
//   appId: "1:769950438406:web:c32c585935da95cee91f87",
//   measurementId: "G-E12PJWFBXM"
// };

// const app = initializeApp(firebaseConfig);




export default App