import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import React from 'react'
import { windowHeigth, windowWidth } from '../utils/DimensionSetup';
import SellingDetail from '../components/income/selling/SellingDetail';
import UserProductDetail from '../components/selectedproduct/UserProductDetail';
import LivestockProductDetail from '../components/selectedproduct/LivestockProductDetail';
import FeedProductDetail from '../components/selectedproduct/FeedProductDetail';
import DrugSuplementProductDetail from '../components/selectedproduct/DrugSuplementProductDetail';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteFile, deleteCollection } from '../utils/ImageUpload';
import IncomeDetails from '../components/income/IncomeDetails';

const IncomeDetailScreen = ({ route }) => {
  const { editData, navigation } = route.params;

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
      <TouchableOpacity style={{marginLeft:10, position: 'absolute', top: 10, right: 10}} onPress={() => deleteItem(editData)}>
          <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        {/* {editData.kategori == 'Penjualan'?<Image source={purchaseCategoryIcon.penjualan} style={styles.img} resizeMode='contain'/>: null  }
        {editData.kategori == 'Penambahan Modal'?<Image source={purchaseCategoryIcon.modal} style={styles.img} resizeMode='contain'/>: null  }
        {editData.kategori == 'Hibah'?<Image source={purchaseCategoryIcon.hibah} style={styles.img} resizeMode='contain'/>: null  }
        {editData.kategori == 'Pinjaman'?<Image source={purchaseCategoryIcon.pinjam} style={styles.img} resizeMode='contain'/>: null  }     
        {editData.kategori == 'Piutang'?<Image source={purchaseCategoryIcon.piutang} style={styles.img} resizeMode='contain'/>: null  } */}
        <Image source={require('../assets/Gembul.png')} style={styles.img} resizeMode='contain'/>
        <TouchableOpacity style={{position:'absolute', bottom: 0}} onPress={() => console.log(navigation.canGoBack())}>
        <Text style={styles.textKategori}>Gembul</Text>
        </TouchableOpacity>
        
      </View>
      {/* <SellingDetail editData={editData} navigation={navigation}/> */}
      <IncomeDetails editData={editData} navigation={navigation}/>
      {/* {editData.tipe == "tambahproduk"?<UserProductDetail editData={editData} navigation={navigation}/>:null }
      {editData.tipe == "domba"?<LivestockProductDetail editData={editData} navigation={navigation}/>:null }
      {editData.tipe == "pakan"?<FeedProductDetail editData={editData} navigation={navigation}/>:null }
      {editData.tipe == "obat"?<DrugSuplementProductDetail editData={editData} navigation={navigation}/>:null } */}
      {/*  <Button title='Check Params' onPress={() => console.log(item)} /> */}
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