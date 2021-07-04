import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ObatStok from './ObatStok'

const ObatStokSection = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Obat dan Vitamin</Text>
            <ObatStok />        
        </ScrollView>
    )
}

export default ObatStokSection

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        width:'100%',
        flexDirection:'column',
        marginBottom:15,
        borderBottomColor:'lightgrey',
        borderBottomWidth: 2
    },
    sectionTitle:{
        fontSize: 26,
        fontWeight:'bold',
        marginBottom:10
    }
})
