import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ProductItem from '../components/selectedproduct/ProductItem'

const SelectProductType = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={{textAlign:'center'}}>Test Select Product</Text>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </View>

    </ScrollView>
  )
}

export default SelectProductType

const styles = StyleSheet.create({
  container:{
    width:'100%',
    padding: 10,
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})