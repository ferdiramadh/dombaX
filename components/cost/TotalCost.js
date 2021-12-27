import React, {useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useSelector} from 'react-redux'
import NumberFormat from 'react-number-format';

const TotalCost = () => {
    const varCostData = useSelector(state => state.stokReducer)
    const fixCostData = useSelector(state => state.costReducer)

    const DATA_DOMBA = varCostData.listDomba;
    const DATA_PAKAN = varCostData.listPakan;
    const DATA_OBAT = varCostData.listObat;

    const DATA_KANDANG = fixCostData.listKandang;
    const DATA_PEGAWAI = fixCostData.listPegawai;
    const DATA_LAHAN = fixCostData.listLahan;

    const varCostReduce = (s,a) => {
        return s + parseInt(a.jumlah)*parseInt(a.hargaBeli);
    }

    const totalBiayaDomba = DATA_DOMBA.reduce((s,a) => varCostReduce(s,a),0)
    const totalBiayaPakan = DATA_PAKAN.reduce((s,a) => varCostReduce(s,a),0)
    const totalBiayaObat = DATA_OBAT.reduce((s,a) => varCostReduce(s,a),0)

    const totalBiayaKandang = DATA_KANDANG.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.biayaBuat)},0)
    const totalBiayaPegawai = DATA_PEGAWAI.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.gaji)},0)
    const totalBiayaLahan = DATA_LAHAN.reduce((s,a) => {return s + parseInt(a.hargaBeli)*parseInt(a.luas)},0)

    const totalBiayaOverall = totalBiayaDomba + totalBiayaPakan + totalBiayaObat + totalBiayaKandang + totalBiayaPegawai + totalBiayaLahan;

    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log(totalBiayaLahan)}>
            <Text style={styles.totalTitle}>Total Biaya</Text>
            <Text style={styles.totalText}>{formatToCurrency(totalBiayaOverall)}</Text>
        </TouchableOpacity>
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
