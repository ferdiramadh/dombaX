import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'

const CategoryItem = ({ item, deleteItem, editItem, setCategoryValue }) => {
    const [isPressed, setIsPressed] = useState(false)
    return (
        <TouchableOpacity style={[styles.container, isPressed ? { height: 100, paddingTop: 10 } : { height: 50, alignItems: 'center', }]} onPress={() => setCategoryValue(item.name)} disabled={isPressed ? true : false}>
            <View style={styles.itemName}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsPressed(!isPressed)}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {isPressed && <FloatingModal deleteItem={deleteItem} editItem={editItem} item={item} setIsPressed=
                {setIsPressed} />}
        </TouchableOpacity>
    )
}

const FloatingModal = ({ editItem, deleteItem, item, setIsPressed }) => {
    return (
        <View style={styles.floatingModal}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                    setIsPressed(false)
                }}>
                <AntDesign name="closecircle" size={20} color="#DFE1E0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => {
                editItem(item)
                // setIsPressed(false)
            }}>
                <Text style={styles.btnText}>Ubah</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => deleteItem(item)}>
                <Text style={styles.btnText}>Hapus</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFE1E0',
        flexDirection: 'row'
    },
    itemName: {
        flex: 1,
    },
    text: {
        fontSize: 18,
    },
    buttonSection: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'flex-end',
        right: 10,
        paddingRight: 10
    },
    floatingModal: {
        backgroundColor: '#FFFDFD',
        position: 'absolute',
        height: 80,
        width: 150,
        bottom: 10,
        borderRadius: 10,
        right: 10,
        borderRadius: 10,
        borderColor: '#DFE1E0',
        borderWidth: 1
    },
    btn: {
        flex: 1,
        backgroundColor: '#FFFDFD',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    closeButton: {
        borderRadius: 20,
        padding: 8,
        position: 'absolute',
        bottom: 10,
        width: 50,
        height: 50,
        top: -15,
        right: -20,
        zIndex: 10
    },
    btnText: {
        fontFamily: 'Inter',
        fontWeight: '700'
    }
})