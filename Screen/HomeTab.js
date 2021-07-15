

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/homeScreen'

const Stack = createStackNavigator();

export default ()=>{
  return(
     <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>


  )
}