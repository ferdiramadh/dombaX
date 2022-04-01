import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import React from 'react'
import UserProductDetail from '../components/selectedproduct/UserProductDetail';
import LivestockProductDetail from '../components/selectedproduct/LivestockProductDetail';

const ProductDetailScreen = ({ route }) => {
  const { editData, navigation } = route.params;
  return (
    <View style={styles.container}>
      {editData.tipe == "tambahproduk"?<UserProductDetail editData={editData} navigation={navigation}/>:null }
      {editData.tipe == "domba"?<LivestockProductDetail editData={editData} navigation={navigation}/>:null }
      {/*  <Button title='Check Params' onPress={() => console.log(item)} /> */}
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    // backgroundColor:'orange'
  }
})