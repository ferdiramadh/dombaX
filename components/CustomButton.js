import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <AntDesign name="plus" size={30} color="white" />
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        width:60,
        height:60,
        backgroundColor:'#ED9B83',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        // elevation: 4,
        position:'absolute',
        bottom:10,
        right:20,
        shadowRadius:10,
        shadowColor: '#f02a48',
        shadowOpacity: 0.3,
        shadowOffset:{height: 0}
    },
    text:{
        fontSize: 18,
        fontWeight:'700',
        color:'#ffffff'
    }
})
