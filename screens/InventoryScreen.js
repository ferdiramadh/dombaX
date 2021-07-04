import React , { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import CustomHeder from '../components/CustomHeder'
import Stok from '../components/stok/Stok'
import CustomButton from '../components/CustomButton'
import FloatingButton from '../components/FloatingButton'
import ModalAddStok from '../components/InventoryComponents/ModalAddStok'
import ModalAddCost from '../components/InventoryComponents/ModalAddCost'
import Cost from '../components/cost/Cost'

export default function InventoryScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCostVisible, setModalCostVisible] = useState(false);
    const [ stok, setStok ] = useState(true)
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <CustomHeder leftSubMenu='Stok'rightSubMenu='Biaya' state={stok} setState={setStok}/>
            
            <View style={{marginTop:100, }}>
                {stok?<Stok />:<Cost />}
                
                {/* <Text style={{fontSize: 22, fontWeight:'bold', textAlign:'center', marginVertical:'50%', marginHorizontal:10}}>Inventori Kamu masih kosong, silahkan tambahkan produk </Text> */}
            </View>
            {/* <Text style={{fontSize: 20, fontWeight:'bold'}}>{modalVisible? '1':'0'}</Text> */}

                <ModalAddStok setModalVisible={setModalVisible}  modalVisible={modalVisible}/>
                <ModalAddCost setModalCostVisible={setModalCostVisible}  modalCostVisible={modalCostVisible}/>
            {stok? <CustomButton onPress={() => {
                setModalVisible(!modalVisible)
            }}/>:<FloatingButton style={{bottom: 80}} modalVisible={modalVisible} setModalVisible={setModalVisible} setModalCostVisible={setModalCostVisible}  modalCostVisible={modalCostVisible}/>}
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        position:'relative'
    }
})
