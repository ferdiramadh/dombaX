import { StyleSheet, Text, View , Image} from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../utils/DimensionSetup';
import IncomeDetails from '../components/income/IncomeDetails';
import ExpenseDetails from '../components/expense/ExpenseDetails';

const IncomeDetailScreen = ({ route }) => {
  const { editData, navigation, isExpense } = route.params;
  const [isUpdate, setIsUpdate] = useState(false)

  return (
    <View style={styles.container}>
      {!isUpdate? 
      <View style={styles.iconContainer}>
        <Image source={require('../assets/Gembul.png')} style={styles.img} resizeMode='contain'/>
        <View style={{position:'absolute', bottom: 0}} onPress={() => console.log(navigation.canGoBack())}>
          <Text style={styles.textKategori}>Gembul</Text>
        </View>
        
      </View> : null}
      {isExpense? <ExpenseDetails editData={editData} navigation={navigation} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> : <IncomeDetails editData={editData} navigation={navigation} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>}
    </View>
  )
}

export default IncomeDetailScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    position: 'relative',
    backgroundColor: '#FFF'    
  },
  iconContainer: {
    width: windowWidth,
    height:120,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10
  },
  img: {
      width: 150,
      height: undefined,
      aspectRatio: 1,
      // backgroundColor: 'maroon'
  },
  textKategori: {
    fontFamily:'Baloo',
    fontSize: 22,
    marginTop: 10,
    position: 'relative',
    bottom: -10
  }
})