import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'

const PurchasingCategory = ({item, key, setCategory, modalCategoryVisible, setModalCategoryVisible}) => {
  return (
    <TouchableOpacity style={styles.container} key={key} onPress={() => {
      setCategory(item.title)
      setModalCategoryVisible(!modalCategoryVisible)
    }}>
      <View style={styles.leftSection}>
        <Image source={ item.image } style={styles.img} resizeMode='contain'/>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

export default PurchasingCategory

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    height: windowHeigth/7,
    justifyContent:'center',
    alignItems:'center',
    width: windowWidth * .9,
    marginVertical: 5,
    borderWidth: .5,
    borderRadius: 8
  },
  leftSection :{
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * .3,
    // backgroundColor: 'red'
  },
  rightSection: {
    width: '70%',
    // backgroundColor: 'red',
    paddingRight: 10,
    paddingVertical:'5%'
  },
  img: {
    width: 60,
    height: 60
  },
  title: {
    textAlign:'center',
    fontFamily:'Inter',
    fontWeight:'600'
  }
  ,text: {
    textAlign:'left',
    fontSize: 14
  }
})