import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const ProductDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Text>Product Detail Screen</Text>
      <Button title='Check Params' onPress={() => console.log(item)} />
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'orange'
  }
})