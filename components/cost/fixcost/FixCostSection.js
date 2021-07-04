import React from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import FixCostItem from './FixCostItem'


const FixCostSection = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Biaya Tetap</Text>
            <FixCostItem />
        </View>
    )
}

export default FixCostSection

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
