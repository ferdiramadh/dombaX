import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from '../../components/income/Income'
import { useContext } from 'react';
import { PhotoContext } from '../../context/PhotoProfileContext';

const Tab = createMaterialTopTabNavigator();


function TopTabTransaction() {
  const { setTopTabTransactionFocus} = useContext(PhotoContext)
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter' },
       
      }}>
      <Tab.Screen name="Pemasukan" component={Income} listeners={{
        tabPress: () => {setTopTabTransactionFocus('Income')},
        swipeEnd: () => {setTopTabTransactionFocus('Income')},
        swipeStart: () => {setTopTabTransactionFocus('Expense')},
      }} options={{
        tabBarActiveTintColor: '#43B88E', tabBarInactiveTintColor: '#000', tabBarIndicatorStyle: {
          backgroundColor: '#43B88E', 
        }
      }}/>
      <Tab.Screen name="Pengeluaran" component={Income} listeners={{
        tabPress: () => {setTopTabTransactionFocus('Expense')}
      }} options={{
        tabBarActiveTintColor: '#EB3223', tabBarInactiveTintColor: '#000',tabBarIndicatorStyle: {
          backgroundColor: '#EB3223', 
        }
      }}/>
    </Tab.Navigator>
  );
}

export default TopTabTransaction