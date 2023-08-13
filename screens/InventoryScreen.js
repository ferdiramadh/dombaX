import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import Stok from '../components/stok/Stok'
import CustomButton from '../components/CustomButton'
import FloatingButton from '../components/FloatingButton'
import ModalAddStok from '../components/InventoryComponents/ModalAddStok'
import ModalAddCost from '../components/InventoryComponents/ModalAddCost'
import Cost from '../components/cost/Cost'
import { FilterTransactionContext } from '../context/FilterTransactionContext'

export default function InventoryScreen() {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalCostVisible, setModalCostVisible] = useState(false)
    const [stok, setStok] = useState(true)
    const { catatSekarang, setCatatSekarang } = useContext(FilterTransactionContext)
    useEffect(() => {
        if (catatSekarang) {
            setModalVisible(!modalVisible)
            setCatatSekarang(false)
        }
    }, [catatSekarang])
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <CustomHeader leftSubMenu='Stok' state={stok} setState={setStok} />
            <View style={{ marginTop: 100, }}>
                {stok ? <Stok /> : <Cost />}
            </View>
            <ModalAddStok setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <ModalAddCost setModalCostVisible={setModalCostVisible} modalCostVisible={modalCostVisible} />
            {stok ? <CustomButton onPress={() => {
                setModalVisible(!modalVisible)
            }} /> : <FloatingButton style={{ bottom: 80 }} modalVisible={modalVisible} setModalVisible={setModalVisible} setModalCostVisible={setModalCostVisible} modalCostVisible={modalCostVisible} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative'
    }
})
