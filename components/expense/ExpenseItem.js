import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { formatToCurrencyLight } from '../../utils/FormatCurrency'

const ExpenseItem = ({item, editItem}) => {

    const sellingCategoryIcone = 
        {
            pembelianStok: require('../../assets/images/expensecategory/PurchasingStock.png'),
            pembelianAlat: require('../../assets/images/expensecategory/PurchasingEquipment.png'),
            pembayaranUtang: require('../../assets/images/expensecategory/PayLoan.png'),
            pemberianUtang: require('../../assets/images/expensecategory/GivingLoan.png'),
            gajiPekerja: require('../../assets/images/expensecategory/PaymentEmployee.png'),
            savingInvest: require('../../assets/images/expensecategory/SaveOrInvest.png'),
            others: require('../../assets/images/expensecategory/OtherPaycments.png'),
            
        }

        // const [ itemDate, setItemDate ] = useState('')

        // useEffect(() => {
        //     if(item.tanggal) {
        //           let date = item.tanggal
        //           setItemDate(date.substring(4))
        //     } else {
        //         console.log("Kagak ada tanggal")
        //         setItemDate('')
        //     }
            
        // }, [item])

    
  return (
    <TouchableOpacity key={item.id} style={styles.container} onPress={() => editItem(item)}>
        <View style={styles.iconWrapper}>
            {item.kategori == 'Pembelian Stok'?<Image source={sellingCategoryIcone.pembelianStok} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Pembelian Alat dan Mesin'?<Image source={sellingCategoryIcone.pembelianAlat} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Pembayaran Utang'?<Image source={sellingCategoryIcone.pembayaranUtang} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Pemberian Utang'?<Image source={sellingCategoryIcone.pemberianUtang} style={styles.img} resizeMode='contain'/>: null  }     
            {item.kategori == 'Gaji Pekerja'?<Image source={sellingCategoryIcone.gajiPekerja} style={styles.img} resizeMode='contain'/>: null  }   
            {item.kategori == 'Tabungan atau Investasi'?<Image source={sellingCategoryIcone.savingInvest} style={styles.img} resizeMode='contain'/>: null  }     
            {item.kategori == 'Pengeluaran Lain-Lain'?<Image source={sellingCategoryIcone.others} style={styles.img} resizeMode='contain'/>: null  }     
        </View>
        <View style={styles.mainWrapper}>
        <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}} numberOfLines={2} ellipsizeMode='tail'>{item.namaTransaksi}</Text>
            <Text style={{color: '#B3B3B3'}}>Tanggal Transaksi: {item.tanggal}</Text>
        </View>
        <View style={styles.rightWrapper}>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold'}}>{formatToCurrencyLight(item.jumlah)}</Text>
            <Text style={{color: '#000'}} ellipsizeMode='tail' numberOfLines={1}>{item.kategori}</Text>
            {(item.kategori !== 'Tabungan atau Investasi' || item.kategori !== 'Pengeluaran Lain-Lain' ) && (item.statusBayar)?
            <View style={[styles.status, item.statusBayar == 'Lunas'?{backgroundColor:'#43B88E'}:{backgroundColor:'#EB3223'}]}>
                <Text style={styles.statusText}>{item.statusBayar == 'Lunas'?'Lunas': 'Belum Lunas'}</Text>
            </View>: null}
        </View>
    </TouchableOpacity>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
    container:{
        width: windowWidth, 
        height: windowHeigth*.1, 
        // backgroundColor:'red', 
        marginBottom: 5,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: 'lightgrey',
        paddingHorizontal: 5
    },
    iconWrapper: {
        height: '100%',
        width: '20%',
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainWrapper: {
        height: '100%',
        width: '40%',
        // backgroundColor:'grey',
        paddingTop: 5,
        paddingLeft: 5
        
    },
    rightWrapper: {
        height: '100%',
        width: '40%',
        paddingTop: 5,
        paddingRight: 10,
        alignItems: 'flex-end',
    },
    img: {
        width: '60%',
        height: undefined,
        aspectRatio: 1
    //   backgroundColor: 'maroon'
    },
    status: {
        padding: 2,
        height: 25,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 2
    },
    statusText: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontWeight: 'bold'
    }
})