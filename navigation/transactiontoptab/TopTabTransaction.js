import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from '../../components/income/Income'
import { useContext } from 'react';
import { PhotoContext } from '../../context/PhotoProfileContext';
import Expense from '../../components/expense/Expense';

const Tab = createMaterialTopTabNavigator();


function TopTabTransaction({setIsSearch,searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isLoading, setSearchItems, setTransaction, setSearchKeyword}) {
  const { setTopTabTransactionFocus} = useContext(PhotoContext)
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter' },
       
      }}>
      <Tab.Screen name="Pemasukan" listeners={{
        tabPress: () => {
          setSearchKeyword('')
          setSearchItems([])
          setIsSearch(false)
          setTransaction('income')
          setTopTabTransactionFocus('Income')
        },
        swipeEnd: () => {
          setSearchKeyword('')
          setSearchItems([])
          setIsSearch(false)
          setTransaction('income')
          setTopTabTransactionFocus('Income')
        },
        swipeStart: () => {
          setSearchKeyword('')
          setSearchItems([])
          setIsSearch(false)
          setTransaction('expense')
          setTopTabTransactionFocus('Expense')
        },
      }} options={{
        tabBarActiveTintColor: '#43B88E', tabBarInactiveTintColor: '#000', tabBarIndicatorStyle: {
          backgroundColor: '#43B88E', 
        }
      }}
      children={() => <Income isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading} setSearchItems={setSearchItems}/>}
      />
      <Tab.Screen name="Pengeluaran" listeners={{
        tabPress: () => {
          setSearchKeyword('')
          setSearchItems([])
          setIsSearch(false)
          setTransaction('expense')
          setTopTabTransactionFocus('Expense')
        }
      }} options={{
        tabBarActiveTintColor: '#EB3223', tabBarInactiveTintColor: '#000',tabBarIndicatorStyle: {
          backgroundColor: '#EB3223', 
        }
      }}
      children={() => <Expense isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading} setSearchItems={setSearchItems}/>}/>
    </Tab.Navigator>
  );
}

export default TopTabTransaction