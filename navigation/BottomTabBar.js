import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaporanScreen from '../screens/LaporanScreen';
import InventoryScreen from '../screens/InventoryScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SimulationScreen from '../screens/SimulationScreen';
import PrintPdfScreen from '../screens/PrintPdfScreen';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import PDFTemplate from '../components/PDFTemplate';

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
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Home"
          component={LaporanScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: 'Inventory',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="insert-chart" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            tabBarLabel: 'Transaction',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="file-invoice" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Simulation"
          component={SimulationScreen}
          options={{
            tabBarLabel: 'Simulation',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-check" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
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