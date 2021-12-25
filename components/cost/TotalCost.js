import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector} from 'react-redux'
import NumberFormat from 'react-number-format';

const TotalCost = () => {
    const varCostData = useSelector(state => state.stokReducer)
    const DATA_DOMBA = varCostData.listDomba;
    const DATA_PAKAN = varCostData.listPakan;
    const DATA_OBAT = varCostData.listObat;

    const totalBiayaDomba = DATA_DOMBA.reduce(function (s,a) {
        return s + parseInt(a.jumlah)*parseInt(a.hargaJual);
    },0)
    const totalBiayaPakan = DATA_PAKAN.reduce(function (s,a) {
        return s + parseInt(a.jumlah)*parseInt(a.hargaBeli);
    },0)
    const totalBiayaObat = DATA_OBAT.reduce(function (s,a) {
        return s + parseInt(a.jumlah)*parseInt(a.hargaBeli);
    },0)
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />
    
    return (
        <View style={styles.container}>
            <Text style={styles.totalTitle}>Total Biaya</Text>
            <Text style={styles.totalText}>{formatToCurrency(totalBiayaDomba + totalBiayaPakan + totalBiayaObat)}</Text>
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
