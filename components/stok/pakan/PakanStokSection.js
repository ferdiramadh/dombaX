import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import PakanStok from './PakanStok'

const PakanStokSection = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Pakan</Text>
            <PakanStok />
                     
        </ScrollView>
    )
}

export default PakanStokSection

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
