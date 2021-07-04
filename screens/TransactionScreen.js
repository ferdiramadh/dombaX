import React , { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import Purchasing from '../components/purchasing/Purchasing'
import Selling from '../components/selling/Selling'
import ModalAddTransaction from '../components/transactionsComponents/ModalAddTransaction'

const TransactionScreen = () => {
    const [ purchasing, setPurchasing ] = useState(true)
    const [modalTransaction, setModalTransaction] = useState(false);

    return (
        <View style={styles.container}>
            <CustomHeder leftSubMenu='Pembelian' rightSubMenu='Penjualan' styleFont={{fontSize:24}} state={purchasing} setState={setPurchasing}/>     
            <View style={{marginTop:100, }}>
                {purchasing?<Purchasing />:<Selling />}
            </View>    
            <ModalAddTransaction setModalTransaction={setModalTransaction}  modalTransaction={modalTransaction} purchasing={purchasing}/>
            <CustomButton onPress={() => {
                setModalTransaction(!modalTransaction)
            }}/>
        </View>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        position:'relative'
    }
})
