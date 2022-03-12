import { StyleSheet, Text, TouchableOpacity,View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const CategoryItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}> 
      <Text style={styles.text}>{props.name}</Text>
      <View style={styles.buttonSection}>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => null}>
                <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => null}>
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