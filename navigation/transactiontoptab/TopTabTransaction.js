import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from '../../components/income/Income'
import { useContext } from 'react';
import { PhotoContext } from '../../context/PhotoProfileContext';
import Expense from '../../components/expense/Expense';

const Tab = createMaterialTopTabNavigator();


function TopTabTransaction({setIsSearch,searchItems, isSearch, searchKeyword, isLoading, setSearchItems, setTransaction, setSearchKeyword}) {
  const { setTopTabTransactionFocus} = useContext(PhotoContext)
  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter', textTransform: 'capitalize' }, 
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
      tabBarOptions={{
        tit: { textTransform: 'none' }
      }}
      children={() => <Income isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isLoading={isLoading} setSearchItems={setSearchItems}/>}
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
      children={() => <Expense isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isLoading={isLoading} setSearchItems={setSearchItems}/>}/>
    </Tab.Navigator>
  );
}

export default TopTabTransaction