import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { formatToCurrencyLight } from '../../utils/FormatCurrency'
import { FontAwesome } from '@expo/vector-icons'
import { DeleteOptionContext } from '../../context/DeleteOptionContext'
import { DisplayedDate } from '../../utils/DisplayDate'

const IncomeItem = ({ item, editItem }) => {

    const purchaseCategoryIcon =
    {
        penjualan: require('../../assets/images/purchasingcategory/Sell.png'),
        modal: require('../../assets/images/purchasingcategory/Request_Money.png'),
        hibah: require('../../assets/images/purchasingcategory/Gift.png'),
        pinjam: require('../../assets/images/purchasingcategory/Lend.png'),
        piutang: require('../../assets/images/purchasingcategory/Piutang.png'),

    }

    const { deleteOpt, CheckIfInList, AddOrRemoveList, setDeleteOpt } = useContext(DeleteOptionContext)


    return (
        <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => editItem(item)}
            onLongPress={() => setDeleteOpt(prev => ({ ...prev, selectDelete: !deleteOpt.selectDelete }))}
        >
            <View style={styles.iconWrapper}>
                {item.kategori == 'Penjualan' ? <Image source={purchaseCategoryIcon.penjualan} style={styles.img} resizeMode='contain' /> : null}
                {item.kategori == 'Penambahan Modal' ? <Image source={purchaseCategoryIcon.modal} style={styles.img} resizeMode='contain' /> : null}
                {item.kategori == 'Hibah' ? <Image source={purchaseCategoryIcon.hibah} style={styles.img} resizeMode='contain' /> : null}
                {item.kategori == 'Pinjaman' ? <Image source={purchaseCategoryIcon.pinjam} style={styles.img} resizeMode='contain' /> : null}
                {item.kategori == 'Piutang' ? <Image source={purchaseCategoryIcon.piutang} style={styles.img} resizeMode='contain' /> : null}
            </View>
            <View style={styles.mainWrapper}>
                <Text style={styles.namaTransaksiTxt} numberOfLines={2} ellipsizeMode='tail'>{item.namaTransaksi}</Text>
                <Text style={styles.dateTxt}>{DisplayedDate(item.tanggal)}</Text>
            </View>
            <View style={styles.rightWrapper}>
                <View style={styles.upperRight}>
                    <Text style={styles.jumlahTxt}>{formatToCurrencyLight(item.jumlah)}</Text>
                    {
                        !deleteOpt.allDelete ? null :
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                    {CheckIfInList(item) ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity>
                            </View>
                    }
                    {
                        deleteOpt.selectDelete && !deleteOpt.allDelete ?
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                    {CheckIfInList(item) ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity>
                            </View> : null
                    }
                </View>
                <Text style={styles.kategoriTxt} ellipsizeMode='tail' numberOfLines={1}>{item.kategori}</Text>
                {(item.kategori == 'Penjualan' || item.kategori == 'Pinjaman' || item.kategori == 'Piutang') && item.statusBayar !== 'status' ?
                    <View style={[styles.status, item.statusBayar == 'Lunas' ? { backgroundColor: '#43B88E' } : { backgroundColor: '#EB3223' }]}>
                        <Text style={styles.statusText}>{item.statusBayar == 'Lunas' ? 'Lunas' : 'Belum Lunas'}</Text>
                    </View> : null}
            </View>
        </TouchableOpacity>
    )
}

export default IncomeItem

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeigth * .12,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F9F9F9'
    },
    iconWrapper: {
        width: undefined,
        height: '90%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DAEFDD',
        borderRadius: 20
    },
    mainWrapper: {
        height: '100%',
        width: '40%',
        paddingTop: 5,
        paddingLeft: 10
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
        fontFamily: 'Quicksand-SemiBold',
    },
    upperRight: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
    },
    buttonSection: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'flex-end',
    },
    square: {
        width: 18,
        height: 18,
        borderWidth: 1
    },
    namaTransaksiTxt: { 
        fontSize: 16, 
        fontFamily: 'Quicksand' 
    },
    dateTxt: { 
        color: '#B3B3B3', 
        fontSize: 14, 
        fontFamily: 'Quicksand' 
    },
    jumlahTxt: { 
        fontSize: 16, 
        fontFamily: 'Quicksand-Bold' 
    },
    kategoriTxt: { 
        color: '#000', 
        fontSize: 14, 
        fontFamily: 'Quicksand' 
    }
})