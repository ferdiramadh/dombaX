import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../utils/DimensionSetup'
import IncomeDetails from '../components/income/IncomeDetails'
import ExpenseDetails from '../components/expense/ExpenseDetails'

const TransactionDetailScreen = ({ route }) => {
  const params = route.params
  const { editData, navigation, isExpense } = params
  const [isUpdate, setIsUpdate] = useState(false)

  return (
    <ScrollView style={styles.container}>
      {isExpense ? <ExpenseDetails editData={editData} navigation={navigation} isUpdate={isUpdate} setIsUpdate={setIsUpdate} /> : <IncomeDetails editData={editData} navigation={navigation} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />}
    </ScrollView>
  )
}

export default TransactionDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
    backgroundColor: '#FFF',
  },
  iconContainer: {
    width: windowWidth,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10
  },
  img: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
  },
  textKategori: {
    fontFamily: 'Baloo',
    fontSize: 22,
    marginTop: 10,
    position: 'relative',
    bottom: -10
  }
})