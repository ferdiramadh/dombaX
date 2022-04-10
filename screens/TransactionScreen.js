import React , { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import Purchasing from '../components/purchasing/Purchasing'
import Selling from '../components/selling/Selling'
import ModalAddTransaction from '../components/transactionsComponents/ModalAddTransaction'
import TopTabTransactions from '../components/transactionsComponents/TopTabTransactions'
import { windowWidth, windowHeigth } from '../utils/DimensionSetup'

const TransactionScreen = () => {
    const [ purchasing, setPurchasing ] = useState(true)
    const [modalTransaction, setModalTransaction] = useState(false);

    return (
        <View style={styles.container}>
            <CustomHeder leftSubMenu='Transaksi' styleFont={{fontSize:24}} state={purchasing} setState={setPurchasing}/>     
            <View style={{marginTop:100, width:windowWidth, height:windowHeigth * .8 }}>
                {/* {purchasing?<Purchasing />:<Selling />} */}
                <TopTabTransactions />
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
