import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { formatToCurrencyLight } from '../../utils/FormatCurrency'
import { FontAwesome } from '@expo/vector-icons'
import { DeleteOptionContext } from '../../context/DeleteOptionContext'
import { DisplayedDate } from '../../utils/DisplayDate'

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
    const { deleteOpt, CheckIfInList, AddOrRemoveList, setDeleteOpt } = useContext(DeleteOptionContext)
    
  return (
    <TouchableOpacity 
        key={item.id} 
        style={styles.container} 
        onPress={() => editItem(item)}
        onLongPress={() => setDeleteOpt(prev => ({...prev, selectDelete: !deleteOpt.selectDelete}))}
    >
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
            <Text style={{color: '#B3B3B3'}}>{DisplayedDate(item.tanggal)}</Text>
        </View>
        <View style={styles.rightWrapper}>
            <View style={styles.upperRight}>
                <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold'}}>{formatToCurrencyLight(item.jumlah)}</Text>
                {
                !deleteOpt.allDelete? null :
                <View style={styles.buttonSection}>
                    <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                            {CheckIfInList(item)?<FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                    </TouchableOpacity>
                </View>
                }
                { 
                deleteOpt.selectDelete && !deleteOpt.allDelete? 
                <View style={styles.buttonSection}>
                    <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                            {CheckIfInList(item)?<FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                    </TouchableOpacity> 
                </View> : null
                }
            </View>
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
        marginBottom: 5,
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    iconWrapper: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainWrapper: {
        height: '100%',
        width: '40%',
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
    },
    upperRight: {
        flexDirection:'row',  
        paddingVertical: 5,
        alignItems: 'center'
    },
    buttonSection:{
        flexDirection:'row',  
        padding: 5,
        justifyContent:'flex-end',  
    },
    square: {
        width: 18, 
        height: 18, 
        borderWidth: 1
    }
})