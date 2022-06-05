import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import { useSelector} from 'react-redux'
import ExpenseSection from './ExpenseSection'


const Expense = ({searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isLoading, setSearchItems}) => {
    const transactionsData = useSelector(state => state.transactionsReducer)
    const listExpense = transactionsData.listExpense
    
    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
            { listExpense.length > 0? <ExpenseSection listExpense={listExpense} isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading} setSearchItems={setSearchItems}/> :
                 <View style={styles.emptyPurchaseNotif}>
                    <Text style={styles.text}>Transaksi Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan <Text style={{fontWeight:'bold'}}>Pengeluaran</Text></Text>
                 </View>
                }
                   
            </View>
        </View>
    )
}

export default Expense

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
