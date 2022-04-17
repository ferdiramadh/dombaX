import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from '../../components/income/Income'

const Tab = createMaterialTopTabNavigator();

function TopTabTransaction() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter' },
        tabBarActiveTintColor: '#43B88E', tabBarInactiveTintColor: '#000',
        tabBarIndicatorStyle: {
          backgroundColor: '#43B88E', 
        },
        
      }}>
      <Tab.Screen name="Pemasukan" component={Income} />
      <Tab.Screen name="Pengeluaran" component={Income} />
    </Tab.Navigator>
  );
}

export default TopTabTransaction