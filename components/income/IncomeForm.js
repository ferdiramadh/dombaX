import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native'
import { Formik } from 'formik'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '../../Firebaseconfig'
import SelectCategoryIncome from './SelectCategoryIncome'
import SellingForm from './selling/SellingForm'
import { uploadImageProduk } from '../../utils/ImageUpload'
import CapitalForm from './capital/CapitalForm'
import GrantForm from './grant/GrantForm'
import LoanForm from './loan/LoanForm'
import CreditForm from './credit/CreditForm'
import * as yup from 'yup'

const IncomeForm = ({ modalTransaction, setModalTransaction }) => {
  const dispatch = useDispatch()
  const uid = useSelector(state => state.userReducer.uid)
  const [ modalCategoryVisible, setModalCategoryVisible ] = useState(false)
  const [ category, setCategory ] = useState("Kategori")

  const penjualan = {
    id: '',
    kategori: '',
    namaTransaksi: '',
    produk: '',
    jumlah: '',
    jumlahProduk: '',
    hargaJual: '',
    pembeli: '',
    diskon: '',
    pajak: '',
    tanggal: '',
    statusBayar: '',
    tipePembayaran: '',
    batasBayar: '',
    deskripsi: '',
    image: ''
  }

  const penambahanModal = {
    id: '',
    kategori: '',
    namaTransaksi: '',
    bentukModal: '',
    jumlah: '',
    diberikanDari: '',
    kepemilikanModal: '',
    pajak: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  }

  const hibah = {
    id: '',
    kategori: '',
    namaTransaksi: '',
    bentukHibah: '',
    jumlah: '',
    diberikanDari: '',
    pajak: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  }

  const pinjaman = {
    id: '',
    kategori: '',
    namaTransaksi: '',
    jumlah: '',
    pinjamDari: '',
    bunga: '',
    statusBayar: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  }

  const piutang = {
    id: '',
    kategori: '',
    namaTransaksi: '',
    jumlah: '',
    dipinjamKe: '',
    bunga: '',
    statusBayar: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  }

  const [initialData, setInitialData] = useState({})

  const initialDataFunction = () => {

    if (category == 'penjualan') {
      let setData = Object.assign(initialData, penjualan)
      setInitialData(setData)
    } else if (category == 'Penambahan Modal') {
      let setData = Object.assign(initialData, penambahanModal)
      setInitialData(setData)
    } else if (category == 'Hibah') {
      let setData = Object.assign(initialData, hibah)
      setInitialData(setData)
    } else if (category == 'Pinjaman') {
      let setData = Object.assign(initialData, pinjaman)
      setInitialData(setData)
    } else if (category == 'Piutang') {
      let setData = Object.assign(initialData, piutang)
      setInitialData(setData)
    }

  }


  useEffect(() => {
    initialDataFunction()
  }, [category])

  const addTransaction = (values) => {

    const datas = {
      id: firebase.firestore()
        .collection("income")
        .doc().id
    }
    let addedProperties = { id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(), userId: uid }

    if (values.image) {
      uploadImageProduk(values.image, "Income", datas.id, "income", "image")
    }
    const newValue = Object.assign(values, addedProperties)
    const db = firebase.firestore()
    db.collection("income")
      .doc(datas.id)
      .set(newValue)
    dispatch({ type: 'STORE_INCOME', results: newValue })

  }

  const formValidation = yup.object().shape({
    tanggal: yup.string().required("Harap Isi Tanggal Transaksi"),
    namaTransaksi: yup.string().required("Harap Isi Nama Transaksi"),
  })

  return (
    <Formik
      initialValues={initialData}
      onSubmit={(values, actions) => {
        addTransaction(values)
        setModalTransaction(!modalTransaction)
      }}
      validationSchema={formValidation}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, isValid }) => (
        <ScrollView style={styles.container}>
          <View style={styles.wrapperPicker}>
            <TouchableOpacity style={styles.textInput} onPress={() => setModalCategoryVisible(!modalCategoryVisible)} >
              <View style={styles.wrapper}>
                <Text style={{ color: '#474747' }}>{category}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          {category == 'Penjualan' ? <SellingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} errors={errors} isValid={isValid} /> : null}
          {category == 'Penambahan Modal' ? <CapitalForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} errors={errors} isValid={isValid} /> : null}
          {category == 'Hibah' ? <GrantForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} errors={errors} isValid={isValid} /> : null}
          {category == 'Pinjaman' ? <LoanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} errors={errors} isValid={isValid} /> : null}
          {category == 'Piutang' ? <CreditForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} errors={errors} isValid={isValid} /> : null}
          <SelectCategoryIncome modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />
        </ScrollView>
      )}
    </Formik>
  )
}

export default IncomeForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: '10%',
  },
  textInput: {
    backgroundColor: '#DFE1E0',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    borderRadius: 5
  },
  btnSave: {
    width: '25%',
    height: 40,
    backgroundColor: 'lightblue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    borderColor: 'grey',
    borderWidth: 2,
    bottom: 0
  },
  btnSave: {
    backgroundColor: 'blue',
    width: '60%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 4
  },
  wrapperPicker: { 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  wrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingRight: 10 
  }
})

