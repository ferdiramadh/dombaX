import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import DombaStokSection from './domba/DombaStokSection'
import { useSelector} from 'react-redux'

const Stok = () => {

    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    const imgEmptyState = require('../../assets/images/stock/empty_stock_blue.png')

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
            { DATA.length == 0 ?
            <View style={styles.emptyStokNotif}>
                <Image source={imgEmptyState} style={styles.img}/>
                <Text style={styles.text}>Stok Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan produk </Text>
            </View> :
            <DombaStokSection /> }      
            </View>
        </View>
    )
}

export default Stok

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',   
    },
    insideContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text:{
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Inter',
        marginTop: 20
    },
    emptyStokNotif:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '50%', 
        paddingHorizontal: 20,
        width: '70%',
    },
    img: {
        height: 113,
        width: 82,
    }

})
