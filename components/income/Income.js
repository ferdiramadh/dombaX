import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import { useSelector} from 'react-redux'
import IncomeSection from './IncomeSection'

const Income = ({searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isLoading, setSearchItems}) => {
    const transactionsData = useSelector(state => state.transactionsReducer)
    const listIncome = transactionsData.listIncome
    const imgEmptyState = require('../../assets/images/transactions/InitiateMoneyTransfer.png')

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                { listIncome.length > 0? <IncomeSection listIncome={listIncome} isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading} setSearchItems={setSearchItems}/> :
                <View style={styles.emptyPurchaseNotif}>
                    <Image source={imgEmptyState} style={styles.img}/>
                    <Text style={styles.text}>Transaksi Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan <Text style={{fontWeight:'bold'}}>Pemasukan</Text></Text>
                    
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
        backgroundColor:'#FFFFFF',
        width:'100%',   
    },
    insideContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',     
    },
    text:{
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Inter',
        marginTop: 10
    },
    emptyPurchaseNotif:{
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '50%',
    },
    img: {
        height: 100,
        width: 100,
        transform: [{rotate: '180deg'}],
    }

})
