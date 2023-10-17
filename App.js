import 'react-native-gesture-handler';
import React , {useState} from 'react';
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


const App =  () => {
  const Tab = createMaterialTopTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);

  const handleLogin = () => {
    // Aquí debes realizar la lógica de autenticación
    // Si la autenticación es exitosa, establece isAuthenticated en true y cierra el modal
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };

  return(
    
    //<Splash/>
<View style = {{ flex: 1}}>
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
      {isAuthenticated && (
   
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
      )}
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