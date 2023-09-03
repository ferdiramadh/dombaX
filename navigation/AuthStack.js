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
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';


const Stack = createStackNavigator();

const AuthStack = ({isSignIn}) => {
    

    return (
      <Stack.Navigator initialRouteName={isSignIn? "Home" : "Login"}>
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
          title: "Profil",
          headerTitleStyle:{
            fontFamily:'Baloo',
            fontSize: 26,
          },
          headerStyle: {
            borderBottomWidth: 1
          }
        }}/>
        <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} options={{
          title: "Profil Bisnis",
          headerTitleStyle:{
            fontFamily:'Baloo',
            fontSize: 26,
          }
        }} />
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
        <Stack.Screen name="IncomeDetail" component={TransactionDetailScreen} options={{
          title: "Rincian Transaksi",
          headerTitleStyle:{
            fontFamily:'Baloo',
            fontSize: 26,
          }
        }}/>
      </Stack.Navigator>
    )
}

export default AuthStack
