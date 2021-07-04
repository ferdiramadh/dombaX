import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ProfitComponent from './ProfitComponent'

const Profit = () => {
    return (
        <ScrollView style={styles.container}>
            <ProfitComponent firstLabel='Total Biaya Produksi' secondLabel='Profit Margin' thirdLabel='Jumlah (Ekor)' title='Gross Profit' total='Rp. 175.000.000'/>
            <ProfitComponent firstLabel='Total Biaya Produksi' secondLabel='Profit Margin' thirdLabel='Jumlah (Ekor)' title='Net Profit' total='Rp. 50.000.000'/>
        </ScrollView>
    )
}

export default Profit

const styles = StyleSheet.create({
    container:{
        // flexDirection:'column',
        // backgroundColor:'red',
        // justifyContent:'center',
        // alignItems:'center',
        // width:'100%', 
    }
})
