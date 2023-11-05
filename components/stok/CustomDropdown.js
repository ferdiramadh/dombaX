import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import SelectCategoryModal from '../InventoryComponents/GlobalEditScreen/SelectCategoryModal'

const CustomDropdown = ({ openFunc, title, data, setSelectedProduct, setFieldValue }) => {

    const { isOpen, setIsOpen } = openFunc
    const parentObj = { data, setSelectedProduct, setIsOpen, setFieldValue }

    return (
        <View style={styles.pickerContainer}>
            <TouchableOpacity style={styles.item} onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.title}>{title}</Text>
                <MaterialIcons name={`keyboard-arrow-${isOpen ? 'up' : 'down'}`} size={24} color="black" />
            </TouchableOpacity>
            {isOpen && <DataWrapper parentObj={parentObj} />}
        </View>
    )
}

const DataWrapper = ({ parentObj }) => {

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    const [category, setCategory] = useState("Kategori")
    const { data, setSelectedProduct, setIsOpen, setFieldValue } = parentObj

    return (
        <View style={styles.dataWrapper}>
            <ScrollView nestedScrollEnabled>
                {
                    data.map((item, i) => {
                        return <Item item={item} setSelectedProduct={setSelectedProduct} setIsOpen={setIsOpen} key={i} />
                    })
                }
                <Item item={{ name: "Tambah Kategori Baru", value: 'tambahProduk' }} setSelectedProduct={setSelectedProduct} onPress={() => setModalCategoryVisible(!modalCategoryVisible)} />
            </ScrollView>
            <SelectCategoryModal modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />
        </View>
    )
}

const Item = ({ item, setSelectedProduct, setIsOpen, onPress }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            setSelectedProduct(item.value)
            if (item.name !== "Tambah Kategori Baru") {
                setIsOpen(false)
            } else  {
                onPress()
            }
        }}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: '#DFE1E0',
        width: '90%',

        justifyContent: 'center',

        marginVertical: 10,
        borderRadius: 5
    },
    title: {
        fontFamily: 'Quicksand',
        color: "#474747",
        fontSize: 14
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        // backgroundColor: 'yellow'
    },
    dataWrapper: {
        // backgroundColor: 'red',
        flex: 1,
        maxHeight: 200,
        marginTop: 10
    }
})