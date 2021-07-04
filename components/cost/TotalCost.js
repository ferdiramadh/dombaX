import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TotalCost = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.totalTitle}>Total Biaya</Text>
            <Text style={styles.totalText}>Rp. 3.858.000.000</Text>
        </View>
    )
}

export default TotalCost

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        marginBottom:15,
        borderBottomColor:'lightgrey',
        borderBottomWidth: 2
    },
    totalTitle:{
        textAlign:'left',
        fontSize:26,
        fontWeight:'bold',
        color:'#000'
    },
    totalText:{
        textAlign:'left',
        fontSize:26,
        fontWeight:'bold',
        color:'red' ,
        marginBottom:15,
    }
})
