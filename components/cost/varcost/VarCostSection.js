import React from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import VarCostItem from './VarCostItem'

const VarCostSection = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Biaya Variable</Text>
            <VarCostItem />
        </View>
    )
}

export default VarCostSection

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
