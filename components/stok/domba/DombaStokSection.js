import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import DombaStok from './DombaStok'

const DombaStokSection = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Daftar Items</Text>
            <DombaStok />                  
        </ScrollView>
    )
}

export default DombaStokSection

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        width:'100%',
        flexDirection:'column',
        paddingBottom: 60,
        
    },
    sectionTitle:{
        fontSize: 26,
        fontWeight:'bold',
        marginBottom:10
    }
})
