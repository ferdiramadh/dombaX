import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Purchasing from '../purchasing/Purchasing'
import Selling from '../selling/Selling';

const Tab = createMaterialTopTabNavigator();

function TopTabTransactions() {
  return (
    <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 14, fontWeight:'bold' },
        
        
      }}>
      <Tab.Screen name="Home" component={Purchasing} />
      <Tab.Screen name="Settings" component={Selling} />
    </Tab.Navigator>
  );
}

export default TopTabTransactions