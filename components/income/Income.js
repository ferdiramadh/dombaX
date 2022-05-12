import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import { useSelector} from 'react-redux'
import IncomeSection from './IncomeSection'

const Income = () => {
    const transactionsData = useSelector(state => state.transactionsReducer)
    const listIncome = transactionsData.listIncome
    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                { listIncome.length > 0? <IncomeSection listIncome={listIncome} /> :
                <View style={styles.emptyPurchaseNotif}>
                    <Text style={styles.text}>Transaksi Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan Pemasukan</Text>
                    
                </View>
                }
            </View>
        </View>
    )
}

export default Income

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // padding:10,
        // backgroundColor:'purple',
        width:'100%',
       
    },
    insideContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        // backgroundColor:'cyan',
        width:'100%',
       
    },
    text:{
        fontSize: 20,
        fontWeight:'500',
        textAlign:'center',
        fontFamily:'Inter'
    },
    emptyPurchaseNotif:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'50%'
    }

})
