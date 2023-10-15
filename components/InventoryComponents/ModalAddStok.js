import React from 'react'
import { Alert, Modal, StyleSheet, View, TouchableOpacity } from 'react-native'
import FormStok from '../stok/FormStok'
import { AntDesign } from '@expo/vector-icons'

const ModalAddStok = ({ modalVisible, setModalVisible }) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ ...styles.closeButton }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.formSection}>
              <FormStok modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalAddStok

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    width: '100%',
  },
  modalView: {
    width: '90%',
    height: 630,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 3,
    borderColor: '#DFE1E0'
  },
  closeButton: {
    borderRadius: 20,
    padding: 8,
    position: 'absolute',
    bottom: 10,
    width: 50,
    height: 50,
    top: -40,
    right: -20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'white',
    width: '60%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20
  },
  formSection: {
    width: '100%',
    height: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
