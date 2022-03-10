import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaporanScreen from '../screens/LaporanScreen';
import InventoryScreen from '../screens/InventoryScreen';
import TransactionScreen from '../screens/TransactionScreen';
import OthersScreen from '../screens/OthersScreen';
import PrintPdfScreen from '../screens/PrintPdfScreen';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5,AntDesign } from '@expo/vector-icons';
import PDFTemplate from '../components/PDFTemplate';
import UserProductScreen from '../screens/UserProductScreen';

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
          activeTintColor: '#FFF',
          activeBackgroundColor:'#ED9B83',
          inactiveBackgroundColor:'#ED9B83'
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
                <MaterialIcons name="insert-chart" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            tabBarLabel: 'Transaksi',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="file-invoice" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Lainnya"
          component={OthersScreen}
          options={{
            tabBarLabel: 'Lainnya',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Test"
          component={UserProductScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={24} color={color} />
            ),
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