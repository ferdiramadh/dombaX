import React, {useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'
import MyTabs from './BottomTabBar'
import OnboardingScreen from '../screens/OnboardingScreen'
import RegisterScreen from '../screens/RegisterScreen'
import InventoryScreen from '../screens/InventoryScreen'


const Stack = createStackNavigator();

const AuthStack = ({isSignUp}) => {
    

    return (
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Home" component={MyTabs} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown:false
        }}/>
        
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
    )
}

export default AuthStack
