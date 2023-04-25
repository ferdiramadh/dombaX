import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { formatToCurrencyLight } from '../../utils/FormatCurrency'
import { FontAwesome } from '@expo/vector-icons'
import { DeleteOptionContext } from '../../context/DeleteOptionContext'

const IncomeItem = ({item, editItem}) => {

    const purchaseCategoryIcon = 
        {
            penjualan: require('../../assets/images/purchasingcategory/Sell.png'),
            modal: require('../../assets/images/purchasingcategory/Request_Money.png'),
            hibah: require('../../assets/images/purchasingcategory/Gift.png'),
            pinjam: require('../../assets/images/purchasingcategory/Lend.png'),
            piutang: require('../../assets/images/purchasingcategory/Piutang.png'),
            
        }

        const [ itemDate, setItemDate ] = useState('')
        const { deleteOpt, CheckIfInList, AddOrRemoveList, setDeleteOpt } = useContext(DeleteOptionContext)
        useEffect(() => {
            if(item.tanggal) {
                  let date = item.tanggal
                  setItemDate(date.substring(4))
            } else {
                console.log("Kagak ada tanggal")
                setItemDate('')
            }
            // if(item.createdAt) {
            //     const fireBaseTime = new Date(
            //         item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000,
            //       );
            //       const date = fireBaseTime.toDateString();
            //       setItemDate(date.substring(4))
            // } else {
            //     console.log("Kagak ada createdAt")
            // }
            
        }, [item])

    
  return (
    <TouchableOpacity 
        key={item.id} 
        style={styles.container} 
        onPress={() => editItem(item)}
        onLongPress={() => setDeleteOpt(prev => ({...prev, selectDelete: !deleteOpt.selectDelete}))}
    >
        <View style={styles.iconWrapper}>
            {item.kategori == 'Penjualan'?<Image source={purchaseCategoryIcon.penjualan} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Penambahan Modal'?<Image source={purchaseCategoryIcon.modal} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Hibah'?<Image source={purchaseCategoryIcon.hibah} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Pinjaman'?<Image source={purchaseCategoryIcon.pinjam} style={styles.img} resizeMode='contain'/>: null  }     
            {item.kategori == 'Piutang'?<Image source={purchaseCategoryIcon.piutang} style={styles.img} resizeMode='contain'/>: null  }     
        </View>
        <View style={styles.mainWrapper}>
        <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}} numberOfLines={2} ellipsizeMode='tail'>{item.namaTransaksi}</Text>
            <Text style={{color: '#B3B3B3'}}>{item.tanggal}</Text>
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
            {(item.kategori == 'Penjualan' || item.kategori == 'Pinjaman' || item.kategori == 'Piutang') && item.statusBayar !== 'status'?
            <View style={[styles.status, item.statusBayar == 'Lunas'?{backgroundColor:'#43B88E'}:{backgroundColor:'#EB3223'}]}>
                <Text style={styles.statusText}>{item.statusBayar == 'Lunas'?'Lunas': 'Belum Lunas'}</Text>
            </View>: null}
        </View>
    </TouchableOpacity>
  )
}

export default IncomeItem

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
        // backgroundColor: 'cyan',
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
    }, 
    upperRight: {
        flexDirection:'row',  
        padding: 5,
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