import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { windowWidth } from '../utils/DimensionSetup';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteFile, deleteCollection } from '../utils/ImageUpload';
import IncomeDetails from '../components/income/IncomeDetails';
import ExpenseDetails from '../components/expense/ExpenseDetails';

const IncomeDetailScreen = ({ route }) => {
  const { editData, navigation, isSearch, searchItems, setSearchItems, isExpense } = route.params;
  const [isUpdate, setIsUpdate] = useState(false)

  const [ database, setDatabase ] = useState({
    collection: '',
    storage: ''
  })


  const deleteItem = (item) => {
    Alert.alert(
        "Perhatian!",
        `Hapus item?`,
        [
            {
                text:"Batal",
                onPress: () => Alert.alert("Dibatalkan."),
                style:'cancel'
            },
            {
                text: "OK",
                onPress: () => {
                  deleteCollectionAndFile(item)
                  navigation.navigate("Transaction")
                }
            }
        ],
        {
            cancelable: true,
            
        }
    )
    
    
}

const deleteCollectionAndFile = (editData) => {
    deleteCollection(database.collection, editData)
    deleteFile(database.storage, editData)
}

useEffect(() => {
  if(isExpense) {
    setDatabase({
      collection: 'expense',
      storage: 'Expense'
    })
  } else {
    setDatabase({
      collection: 'income',
      storage: 'Income'
    })
  }
}, [editData])

  return (
    <View style={styles.container}>
      {!isUpdate? 
      <TouchableOpacity style={{marginLeft:10, position: 'absolute', top: 10, right: 10}} onPress={() => {
        if(isSearch) {
          let tempList = searchItems.filter(({id}) => id !== editData.id)
          console.log("coba set newitems")
          setSearchItems(tempList)
          deleteItem(editData)      
        } else {
          deleteItem(editData)
        }
      }}>
          <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>: null}
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
    position: 'relative'    
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