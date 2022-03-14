import { StyleSheet, Text, TouchableOpacity,View } from 'react-native'
import React, { useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons';

const CategoryItem = ({item, deleteItem, editItem,editData}) => {
    
  return (
    <TouchableOpacity style={styles.container} onPress={() => console.log(editData)}> 
      <Text style={styles.text}>{item.name}</Text>
      <View style={styles.buttonSection}>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => deleteItem(item)}>
                <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => editItem(item)}>
                <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>  
        </View>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height:50,
       
        paddingHorizontal: 20,
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor:'#DFE1E0'
    },
    text: {
        fontSize:18
    },
    buttonSection:{
        // backgroundColor:'red',
        flexDirection:'row',  
        width:'50%',
        justifyContent:'flex-end',
        position:'absolute',
        right: 10
       
    }
})