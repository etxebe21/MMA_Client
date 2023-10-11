import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
            tabBarActiveTintColor: '#3a86e9',
            tabBarInactiveTintColor: '#9F9F9F',
            tabBarShowLabel: false,
            tabBarShowIcon: true,
          tabBarIcon: ({focused, color,}) => {
        
            if(route.name === 'Home');
          
            else if(route.name === 'CreatePotions');
            else if(route.name === 'Profile') ;
           
        
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