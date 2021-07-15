import * as React from 'react';
import { Text, View, StyleSheet,BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import WorldWideTab from './Screen/WorldWideTab'
import Explore from './Screen/Explore'
const Screen = ()=>{


   BackHandler.exitApp()


 return null
}


import HomeTab from './Screen/HomeTab'

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" activeColor="#fff">
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#4348ad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={23} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={WorldWideTab}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: '#4348ad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-search" color={color} size={23} />
            ),
          }}
        />
          <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarLabel: 'Explore',
            tabBarColor: '#4348ad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-aperture" color={color} size={23} />
            ),
          }}
        />

        <Tab.Screen
          name="Exit"
          component={Screen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#4348ad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-exit" color={color} size={23} />
            ),
          }}
        />

      
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bolder',
    fontFamily: 'system-ui',
    textAlign: 'center',
  },
});
