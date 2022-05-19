import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from '../../components/income/Income'
import { useContext } from 'react';
import { PhotoContext } from '../../context/PhotoProfileContext';
import Expense from '../../components/expense/Expense';

const Tab = createMaterialTopTabNavigator();


function TopTabTransaction({listIncome,searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isLoading, setSearchItems}) {
  const { setTopTabTransactionFocus} = useContext(PhotoContext)
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter' },
       
      }}>
      <Tab.Screen name="Pemasukan" listeners={{
        tabPress: () => {setTopTabTransactionFocus('Income')},
        swipeEnd: () => {setTopTabTransactionFocus('Income')},
        swipeStart: () => {setTopTabTransactionFocus('Expense')},
      }} options={{
        tabBarActiveTintColor: '#43B88E', tabBarInactiveTintColor: '#000', tabBarIndicatorStyle: {
          backgroundColor: '#43B88E', 
        }
      }}
      children={() => <Income isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading} setSearchItems={setSearchItems}/>}
      />
      <Tab.Screen name="Pengeluaran" component={Expense} listeners={{
        tabPress: () => {
          console.log(listIncome)
          setTopTabTransactionFocus('Expense')
        }
      }} options={{
        tabBarActiveTintColor: '#EB3223', tabBarInactiveTintColor: '#000',tabBarIndicatorStyle: {
          backgroundColor: '#EB3223', 
        }
      }}/>
    </Tab.Navigator>
  );
}

export default TopTabTransaction