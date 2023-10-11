import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import CreatePotions from './screens/CreatePotions';


const App =  () => {
  const Tab = createMaterialTopTabNavigator();

  return(
    <>

      <Header/>  
  
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route}) => ({
            swipeEnabled: true,
            tabBarStyle: { backgroundColor:'#C8A2C8'}, 
            tabBarIndicatorStyle: {backgroundColor: "#ffffff",},
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
export default App