import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaporanScreen from '../screens/LaporanScreen';
import InventoryScreen from '../screens/InventoryScreen';
import TransactionScreen from '../screens/TransactionScreen';
import OthersScreen from '../screens/OthersScreen';
import PrintPdfScreen from '../screens/PrintPdfScreen';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5,AntDesign, Entypo } from '@expo/vector-icons';
import PDFTemplate from '../components/PDFTemplate';
import UserProductScreen from '../screens/UserProductScreen';
import TopTabTransaction from './transactiontoptab/TopTabTransaction';

const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Inventory" component={InventoryScreen} />
//     </Tab.Navigator>
//   );
// }
function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#ED9B83',
         
          activeBackgroundColor:'#FFFFFF',
        
        }}
      >
        <Tab.Screen
          name="Home"
          component={LaporanScreen}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: 'Stok',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="box" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            tabBarLabel: 'Transaksi',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="compare-arrows" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={OthersScreen}
          tabBarOptions={{
            title: "Profile Bisnis",
          }}
          options={{
            
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-circle" size={24} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Test"
          component={TopTabTransaction}
          options={{
            tabBarLabel: 'Test',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={24} color={color} />
            ),
          }}
        /> */}
        {/* <Tab.Screen
          name="TestInvoicePDFScreen"
          component={PrintPdfScreen}
          options={{
            tabBarLabel: 'TestInvoicePDFScreen',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-check" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="PDFTemplate"
          component={PDFTemplate}
          options={{
            tabBarLabel: 'TestInvoicePDFScreen',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-check" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        /> */}
      </Tab.Navigator>
    );
  }
export default MyTabs;