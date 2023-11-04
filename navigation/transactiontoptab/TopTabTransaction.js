import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Income from '../../components/income/Income'
import { useContext } from 'react'
import { PhotoContext } from '../../context/PhotoProfileContext'
import Expense from '../../components/expense/Expense'
import { DeleteOptionContext } from '../../context/DeleteOptionContext'

const Tab = createMaterialTopTabNavigator()

function TopTabTransaction({ setIsSearch, searchItems, isSearch, searchKeyword, isLoading, setSearchItems, setTransaction, setSearchKeyword }) {

  const { setTopTabTransactionFocus } = useContext(PhotoContext)
  const { cancelDelete } = useContext(DeleteOptionContext)

  const onIncome = () => {
    setSearchKeyword('')
    setSearchItems([])
    setIsSearch(false)
    setTransaction('income')
    setTopTabTransactionFocus('Income')
  }

  const onExpense = () => {
    setSearchKeyword('')
    setSearchItems([])
    setIsSearch(false)
    setTransaction('expense')
    setTopTabTransactionFocus('Expense')
  }

  return (
    <Tab.Navigator
      initialRouteName="Pemasukan"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontFamily: 'Quicksand-SemiBold', textTransform: 'capitalize' },
      }}>
      <Tab.Screen
        name="Pemasukan"
        listeners={{
          tabPress: onIncome,
          swipeEnd: () => {
            onIncome()
            cancelDelete()
          },
          swipeStart: () => {
            onExpense()
            cancelDelete()
          }
        }}
        options={{
          tabBarActiveTintColor: '#43B88E', tabBarInactiveTintColor: '#000', tabBarIndicatorStyle: {
            backgroundColor: '#43B88E',
          }
        }}
        children={() => <Income isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isLoading={isLoading} setSearchItems={setSearchItems} />}
      />
      <Tab.Screen
        name="Pengeluaran"
        listeners={{
          tabPress: onExpense,
        }}
        options={{
          tabBarActiveTintColor: '#EB3223', tabBarInactiveTintColor: '#000', tabBarIndicatorStyle: {
            backgroundColor: '#EB3223',
          }
        }}
        children={() => <Expense isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isLoading={isLoading} setSearchItems={setSearchItems} />} />
    </Tab.Navigator>
  )
}

export default TopTabTransaction