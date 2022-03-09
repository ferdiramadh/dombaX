import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProductItem = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
      <View style={styles.leftIcon}>
          <Image source={require("../../assets/images/kategori/Domba.png")} style={styles.imgIcon}/>
      </View>
      <View style={styles.rightSection}>

      </View>
    </TouchableOpacity>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container:{
        backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10,
        
        // position:'relative'
    },
    leftIcon:{
        backgroundColor:'yellow',
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width: 120,
        height: 120
    },
    rightSection:{
        backgroundColor:'orange',
        width:'70%',
        flexDirection:'column',
    },
})