import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { formatToCurrencyWithoutStyle } from '../../utils/FormatCurrency'
import { FontAwesome } from '@expo/vector-icons';

const imageDefault = {
    "domba": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "tambahproduk": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "pakan": require('../../assets/images/kategori/Pakan.png'),
    "obat": require('../../assets/images/kategori/ObatSuplemen.png')
}

const ProductItem = ({ item, editItem, isTransaction, setSelectedProduct, modalProductVisible, setModalProductVisible, deleteProp }) => {
    const { deleteOpt, setDeleteOpt } = deleteProp
    function CheckIfInList(val) {
        let ID = val.id
        let result = deleteOpt.deletedList.find(x => x.id === ID)
        if (result)
            return true
        return false
    }

    function AddOrRemoveList(val) {
        let isInList = CheckIfInList(val)
        if (!isInList) {
            setDeleteOpt(prev => ({ ...prev, deletedList: [...prev.deletedList, val], allDelete: false }))
        } else if (isInList) {
            let filterDeletedItem = deleteOpt.deletedList.filter(x => x.id != val.id)
            setDeleteOpt(prev => ({ ...prev, deletedList: filterDeletedItem, allDelete: false }))
        }
    }

    function checkSatuan(val) {
        let tipe = val.tipe
        switch (tipe) {
            case ('pakan'):
                return 'Kg'
            case ('domba'):
                return 'Ekor'
            case ('obat'):
                return 'Buah'
            default:
                return val.satuan
        }

    }

    return (
        <TouchableOpacity
            style={styles.container}
            key={item.id}
            onPress={() => {
                if (isTransaction) {
                    setSelectedProduct(item)
                    setModalProductVisible(!modalProductVisible)
                } else {
                    editItem(item)
                }
            }}
            onLongPress={() => setDeleteOpt(prev => ({ ...prev, selectDelete: !deleteOpt.selectDelete }))}
        >
            <View style={styles.leftIcon}>
                <Image source={imageDefault[`${item.tipe}`]} style={styles.imgIcon} />
            </View>
            <View style={styles.rightSection}>
                <View style={styles.upperSection}>
                    <View style={styles.upperLeft}>
                        {item.tipe == 'domba' ? <Text style={styles.subStokTitle}>{item.nama} {item.jenisSpesifik}</Text> : null}
                        {item.tipe == 'pakan' ? <Text style={styles.subStokTitle}>{item.nama}</Text> : null}
                        {item.tipe == 'obat' ? <Text style={styles.subStokTitle}>{item.nama}</Text> : null}
                        {item.tipe == 'tambahproduk' ? <Text style={styles.subStokTitle}>{item.nama}</Text> : null}
                    </View>
                    <View style={styles.upperRight}>
                        {item.tipe == 'domba' ? <Text style={[styles.infoData, { fontWeight: 'bold' }]}>{item.jumlah == "0" ? <Text style={{ color: 'red' }}>Stok Habis</Text> : `${item.jumlah} ${checkSatuan(item)}`}</Text> : null}
                        {item.tipe == 'pakan' ? <Text style={[styles.infoData, { fontWeight: 'bold' }]}>{item.jumlah == "0" ? <Text style={{ color: 'red' }}>Stok Habis</Text> : `${item.jumlah} ${checkSatuan(item)}`}</Text> : null}
                        {item.tipe == 'obat' ? <Text style={[styles.infoData, { fontWeight: 'bold' }]}>{item.jumlah == "0" ? <Text style={{ color: 'red' }}>Stok Habis</Text> : `${item.jumlah} ${checkSatuan(item)}`}</Text> : null}
                        {item.tipe == 'tambahproduk' ? <Text style={[styles.infoData, { fontWeight: 'bold' }]}>{item.jumlah == "0" ? <Text style={{ color: 'red' }}>Stok Habis</Text> : item.jumlah} {item.jumlah !== '0' ? item.satuan ? item.satuan : parseInt(item.jumlah) > 1 ? 'Items' : 'Item' : null}</Text> : null}
                        {isTransaction || !deleteOpt.allDelete ? null :
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                    {CheckIfInList(item) ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity>
                            </View>}
                        {deleteOpt.selectDelete && !deleteOpt.allDelete ?
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                    {CheckIfInList(item) ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity>
                            </View> : null}
                    </View>

                </View>
                <View style={styles.lowerSection}>
                    <Text style={[styles.hargaBeli]} lineBreakMode="tail" numberOfLines={1}>{formatToCurrencyWithoutStyle(parseInt(item.hargaBeli))}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default ProductItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 5,
        height: 80,
    },
    leftIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgIcon: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    rightSection: {
        width: '80%',
        flexDirection: 'column',
        height: '100%',
    },
    lowerSection: {
        flexDirection: 'row-reverse',
        height: '50%',
        paddingLeft: 20,
        paddingVertical: 5
    },
    subStokTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    leftDombaInfo: {
        width: '60%',
        padding: 5,
        justifyContent: 'center',
    },
    rightDombaInfo: {
        width: '100%',
        paddingHorizontal: 5,
        flexDirection: 'row-reverse',
    },
    infoData: {
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 5
    },
    upperSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        height: '50%'
    },
    buttonSection: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'flex-end',
    },
    hargaBeli: {
        color: '#43B88E',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
    },
    upperLeft: {
        width: '50%',
        justifyContent: 'flex-end',
    },
    upperRight: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    square: {
        width: 18,
        height: 18,
        borderWidth: 1
    }
})
