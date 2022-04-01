import React, {useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'
import MyTabs from './BottomTabBar'
import OnboardingScreen from '../screens/OnboardingScreen'
import RegisterScreen from '../screens/RegisterScreen'
import InventoryScreen from '../screens/InventoryScreen'
import AccountScreen from '../screens/AccountScreen'
import RegisterProfileScreen from '../screens/RegisterProfileScreen';
import SelectProductType from '../screens/SelectProductType';
import ProductDetailScreen from '../screens/ProductDetailScreen';


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
         <Stack.Screen name="Account" component={AccountScreen} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="RegisterProfile" component={RegisterProfileScreen} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="SelectProduct" component={SelectProductType} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="DetailProduct" component={ProductDetailScreen} options={{
          title: "Rincian Produk",
          headerTitleStyle:{
            fontFamily:'Baloo',
            fontSize: 26,
         
          }
        }}/>
      </Stack.Navigator>
    )
}

export default AuthStack
