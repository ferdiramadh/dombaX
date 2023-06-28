import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import ExpenseCategory from './ExpenseCategory'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'

const SelectCategoryExpense = ({ modalCategoryVisible, setModalCategoryVisible, setCategory }) => {

    const sellingCategory = [
        {
            id: 1,
            image: require('../../assets/images/expensecategory/PurchasingStock.png'),
            title: 'Pembelian Stok',
            text: 'Keperluan pembelian barang untuk berjalannya bisnis. Contoh: bibit, benih, pakan, obat, dan vitamin, dll.'
        },
        {
            id: 2,
            image: require('../../assets/images/expensecategory/PurchasingEquipment.png'),
            title: 'Pembelian Alat dan Mesin',
            text: 'Keperluan pembelian berbagai alat dan mesin pendukung bisnis Kamu. Contoh: beli bambu untuk kandang, traktor, dll.'
        },
        {
            id: 3,
            image: require('../../assets/images/expensecategory/PayLoan.png'),
            title: 'Pembayaran Utang',
            text: 'Aktivitas pengembalian pinjaman kepada pemberi pinjaman.'
        },
        {
            id: 4,
            image: require('../../assets/images/expensecategory/GivingLoan.png'),
            title: 'Pemberian Utang',
            text: 'Aktivitas pemberian uang kepada pihak lain yang memiliki tanggung jawab melakukan pengembalian.'
        },
        {
            id: 5,
            image: require('../../assets/images/expensecategory/PaymentEmployee.png'),
            title: 'Gaji Pekerja',
            text: 'Biaya operasional untuk gaji buruh atau pegawai.'
        },
        {
            id: 6,
            image: require('../../assets/images/expensecategory/SaveOrInvest.png'),
            title: 'Tabungan atau Investasi',
            text: 'Pengeluaran uang untuk mendapatkan keuntungan di masa yang akan datang melalui berbagai produk keuangan atau disimpan sendiri.'
        },
        {
            id: 7,
            image: require('../../assets/images/expensecategory/OtherPaycments.png'),
            title: 'Pengeluaran Lain-Lain',
            text: 'Pengeluaran biaya operasional atau lainnya. Contoh: biaya sewa lahan, listrik, air, internet, dll.'
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
                    <View style={styles.titleWrap}>
                        <Text style={styles.title}>Kategori Pengeluaran</Text>
                    </View>
                </View>
                <ScrollView style={styles.lowerWrap}>



                    {sellingCategory.map((item, i) => {
                        return (
                            <ExpenseCategory item={item} key={item.id} setCategory={setCategory} modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} />
                        )
                    })}

                </ScrollView>
            </View>
        </Modal>

    )
}

export default SelectCategoryExpense

const styles = StyleSheet.create({
    centeredView: {
        height: '100%',
        backgroundColor: '#FFF',
        width: windowWidth,
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
        width: '100%'
    },
    lowerWrap: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Baloo',
        fontSize: 24
    },
    titleWrap: {
        marginLeft: 20
    },
    backBtn: {
        width: '10%'
    },
    text: {
        fontSize: 23,
        fontWeight: '500',
        textAlign: 'center'
    }
})
