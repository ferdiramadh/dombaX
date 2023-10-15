import React from 'react'
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import IncomeForm from '../income/IncomeForm'
import ExpenseForm from '../expense/ExpenseForm'

const ModalAddTransaction = ({ modalTransaction, setModalTransaction, topTabTransactionFocus }) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTransaction}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ ...styles.closeButton }}
              onPress={() => {
                setModalTransaction(!modalTransaction)
              }}>
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.formSection}>
              {topTabTransactionFocus == 'Income' ? <IncomeForm modalTransaction={modalTransaction} setModalTransaction={setModalTransaction} /> : <ExpenseForm modalTransaction={modalTransaction} setModalTransaction={setModalTransaction} />}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalAddTransaction

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
