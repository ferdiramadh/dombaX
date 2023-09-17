import { Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import IncomeCategory from './IncomeCategory'
import { windowWidth } from '../../utils/DimensionSetup'

const SelectCategoryIncome = ({ modalCategoryVisible, setModalCategoryVisible, setCategory }) => {

    const purchaseCategory = [
        {
            id: 1,
            image: require('../../assets/images/purchasingcategory/Sell.png'),
            title: 'Penjualan',
            text: 'Setiap transaksi penjualan produk dari bisnis Kamu. Contoh: Terjual 1 domba.'
        },
        {
            id: 2,
            image: require('../../assets/images/purchasingcategory/Request_Money.png'),
            title: 'Penambahan Modal',
            text: 'Modal tambahan untuk pengembangan bisnis Kamu bisa dari pribadi, investor maupun pinjaman.'
        },
        {
            id: 3,
            image: require('../../assets/images/purchasingcategory/Gift.png'),
            title: 'Hibah',
            text: 'Hadiah dari suatu kegiatan atas pemberian orang lain atau institusi lainnya tanpa perlu adanya tanggung jawab pengembalian.'
        },
        {
            id: 4,
            image: require('../../assets/images/purchasingcategory/Lend.png'),
            title: 'Pinjaman',
            text: 'Uang yang Kamu pinjam dari orang lain atau institusi finansial lainnya dengan adanya tanggung jawab pengembalian.'
        },
        {
            id: 5,
            image: require('../../assets/images/purchasingcategory/Piutang.png'),
            title: 'Piutang',
            text: 'Harta dan uang yang Kamu pinjamkan ke orang lain dan yang dipinjamkan memiliki tanggung jawab melakukan pengembalian.'
        },

    ]


    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalCategoryVisible}
            onRequestClose={() => {

                setModalCategoryVisible(!modalCategoryVisible)
            }}>
            <View style={styles.centeredView}>
                <View style={styles.upperWrap}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => {
                        setModalCategoryVisible(!modalCategoryVisible)

                    }}>
                        <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Kategori Pemasukan</Text>
                </View>
                <ScrollView style={styles.lowerWrap}>
                    {purchaseCategory.map((item, i) => {
                        return (
                            <IncomeCategory item={item} key={item.id} setCategory={setCategory} modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} />
                        )
                    })}
                </ScrollView>
            </View>
        </Modal>

    )
}

export default SelectCategoryIncome

const styles = StyleSheet.create({
    centeredView: {
        height: '100%',
        backgroundColor: '#FFF',
        width: windowWidth,
        overflow: 'hidden',
        paddingBottom: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Baloo',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    upperWrap: {
        height: 60,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    lowerWrap: {
        marginTop: 5,
        paddingHorizontal: 20,
        backgroundColor: '#F9F9F9'
    },
    title: {
        fontFamily: 'Baloo',
        fontSize: 26
    },
    backBtn: {
        width: '10%',
    },
    text: {
        fontSize: 23,
        fontWeight: '500',
        textAlign: 'center'
    }
})
