import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import { useSelector} from 'react-redux'

const Income = () => {
    const transactionSData = useSelector(state => state.transactionsReducer)
    const listIncome = transactionSData.listIncome
    return (
        <ScrollView style={styles.container}>
            <View style={styles.insideContainer}>
                { listIncome.length !== 0? listIncome.map((item, i) => {
                    return <TouchableOpacity key={item.id} style={{marginBottom: 10}} onPress={() => console.log(item)}>
                                 <Text>Test</Text>
                            </TouchableOpacity>
                }):
                <View style={styles.emptyPurchaseNotif}>
                    <Text style={styles.text}>Transaksi Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan Pemasukan</Text>
                    
                </View>
                }
            </View>
        </ScrollView>
    )
}

export default Income

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
