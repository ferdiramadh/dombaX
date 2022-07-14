import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'

const ExpenseChart = ({item, totalExpense}) => {
  const value = (parseInt(item.jumlah)/totalExpense*100).toFixed(2)
  return (
    <View style={styles.container}>
        <View style={styles.upperWrapper}>
            <Text>{item.namaTransaksi}</Text>
            <Text>{value}%</Text>
        </View>
        <View style={[styles.progressWrapper, { width:`${value}%`}, value > 50? {backgroundColor: "red"}:{backgroundColor:"grey"}]}>

        </View>
    </View>
  )
}

export default ExpenseChart

const styles = StyleSheet.create({
    container:{
        width: windowWidth*.9,
        height: windowHeigth*.08,
        backgroundColor:'#FFF',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 4,
        flexDirection:'column',
        justifyContent:'center',
        padding:20,
        marginVertical:10,
    },
    upperWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressWrapper:{
        height: '25%',
        marginTop: 5,
        borderRadius: 8
    }
})