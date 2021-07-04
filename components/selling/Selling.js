import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import SellingSection from '../selling/SellingSection'
import { useSelector} from 'react-redux'

const Selling = () => {
    const transactionSData = useSelector(state => state.transactionsReducer)
    const sellingData = transactionSData.listSelling
    return (
        <ScrollView style={styles.container}>
            <View style={styles.insideContainer}>
                { sellingData.length !== 0? <SellingSection /> :
                <View style={styles.emptyPurchaseNotif}>
                    <Text style={styles.text}>Penjualan Kamu masih kosong, silakan tambahkan biaya.</Text>
                    
                </View>
                }
            </View>
        </ScrollView>
    )
}

export default Selling

const styles = StyleSheet.create({
    container:{
        
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
        fontSize: 23,
        fontWeight:'500',
        textAlign:'center'
    },
    emptyPurchaseNotif:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'50%'
    }

})
