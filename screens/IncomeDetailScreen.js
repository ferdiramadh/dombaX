import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import { windowHeigth, windowWidth } from '../utils/DimensionSetup';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteFile, deleteCollection } from '../utils/ImageUpload';
import IncomeDetails from '../components/income/IncomeDetails';

const IncomeDetailScreen = ({ route }) => {
  const { editData, navigation } = route.params;
  const [isUpdate, setIsUpdate] = useState(false)

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
    deleteCollection("income", editData)
    deleteFile("Income", editData)
}
  

  return (
    <View style={styles.container}>
      {!isUpdate? 
      <TouchableOpacity style={{marginLeft:10, position: 'absolute', top: 10, right: 10}} onPress={() => deleteItem(editData)}>
          <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>: null}
      {!isUpdate? 
      <View style={styles.iconContainer}>
        <Image source={require('../assets/Gembul.png')} style={styles.img} resizeMode='contain'/>
        <View style={{position:'absolute', bottom: 0}} onPress={() => console.log(navigation.canGoBack())}>
          <Text style={styles.textKategori}>Gembul</Text>
        </View>
        
      </View> : null}
      <IncomeDetails editData={editData} navigation={navigation} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
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