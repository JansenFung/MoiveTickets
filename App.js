/**
 * This application is developed and tested on iOS.
 * 
 * install the following packages in order to run the application:
 * npm install firebase
 * npm install @react-navigation/native
 * npm install @react-navigation/native-stack
 * npm install @react-navigation/bottom-tabs
 * npm install react-native-vector-icons
 * npm install axios
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './config/firebase_config'; 
import { onAuthStateChanged } from 'firebase/auth';
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { useState, useEffect } from 'react';
import LogoutScreen from './LogoutScreen';
import NowPlayingStackScreen from './NowPlayingStackScreen';
import MyPurchasesStackScreen from './MyPurchasesStackScreen';

//Buttom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  //logged in user state
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  //Check if there is a logged in user when the screen is mounted
  useEffect(()=>{
    return onAuthStateChanged(auth, (user)=>{
      if(user)
        setUserLoggedIn(true);
      else
        setUserLoggedIn(false);
    })
  }, []);

  return (
    <NavigationContainer>
      {/* bottom tab navigation */}
      <Tab.Navigator screenOptions={({ route })=>({
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: "#808080",
        tabBarStyle:[{ display: 'flex' }, null],
        tabBarIcon: ({ focused, color, size }) =>{
          let iconName;

          if (route.name === 'NowPlayingStackScreen')
            iconName = 'list';
          else if (route.name === 'MyPurchasesStackScreen')
            iconName = 'ticket';
          else if (route.name === 'LogoutScreen')
            iconName = 'user';
          
          return <Icon name={ iconName } color={ color } size={ size }/>
        }
      })
      }>
        <Tab.Screen name="NowPlayingStackScreen" 
                    component={ NowPlayingStackScreen }
                    options={{ headerShown:false }}/>
        <Tab.Screen name="MyPurchasesStackScreen" 
                    component={ MyPurchasesStackScreen }
                    options={{ headerShown:false }}/>
        {
          //If there is a logged in user, then display the logout tab screen
          userLoggedIn && (<Tab.Screen name="LogoutScreen" component={ LogoutScreen }/>)
        }
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
