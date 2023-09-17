import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { windowWidth } from '../../utils/DimensionSetup'

const IncomeCategory = ({ item, setCategory, modalCategoryVisible, setModalCategoryVisible }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      setCategory(item.title)
      setModalCategoryVisible(!modalCategoryVisible)
    }}>
      <View style={styles.leftSection}>
        <View style={styles.iconWrapper}>
          <Image source={item.image} style={styles.img} resizeMode='contain' />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default IncomeCategory

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    paddingVertical: 10
  },
  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * .3,
    height: 120
  },
  rightSection: {
    width: windowWidth * .7,
    paddingRight: 50,
    paddingVertical: 5,
    height: 120,
    marginLeft: 10
  },
  img: {
    width: 60,
    height: 60
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    marginTop: 10
  },
  text: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Quicksand'
  },
  iconWrapper: {
    width: undefined,
    height: 80,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAEFDD',
    borderRadius: 20
  }
})