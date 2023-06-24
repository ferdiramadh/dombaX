import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker'
import DombaForm from './domba/DombaForm'
import PakanForm from '../stok/pakan/PakanForm'
import ObatForm from '../stok/obatdansuplemen/ObatForm'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '../../Firebaseconfig'
import AddProductForm from '../selectedproduct/AddProductForm'
import { uploadImageProduk } from '../../utils/ImageUpload'


const FormStok = ({ setModalVisible, modalVisible }) => {

  const dispatch = useDispatch();
  const uid = useSelector(state => state.userReducer.uid)
  const [selectedProduct, setSelectedProduct] = useState("jenisHewanTernak");
  const [firebaseSetup, setFirebaseSetup] = useState({
    collection: '',
    typeReducer: ''
  })
  const [ternakData, setTernakData] = useState({
    id: '',
    nama: '',
    jenisSpesifik: '',
    deskripsi: '',
    hargaBeli: '',
    usia: '',
    berat: '',
    kategoriHewanTernak: 'Penggemukan',
    jumlah: '',
    tipe: 'domba',
    image: ''

  })

  const [pakanData, setPakanData] = useState({
    id: '',
    nama: '',
    merk: '',
    jumlah: '',
    hargaBeli: '',
    kadaluarsa: '',
    petunjuk: '',
    tipe: 'pakan',
    image: ''

  })

  const [obatData, setObatData] = useState({
    id: '',
    nama: '',
    merk: '',
    jumlah: '',
    hargaBeli: '',
    kadaluarsa: '',
    petunjuk: '',
    tipe: 'obat',
    image: ''

  })

  const [addProduct, setAddProduct] = useState(
    {
      id: '',
      nama: '',
      merk: '',
      jumlah: '',
      hargaBeli: '',
      deskripsi: '',
      kategori: 'Kategori',
      satuan: '',
      tipe: 'tambahproduk',
      image: ''
    }
  )

  const [test, setTest] = useState({})

  const xfunc = () => {

    if (selectedProduct == 'jenisHewanTernak') {
      let z = Object.assign(test, ternakData)
      setTest(z)
      setFirebaseSetup({
        collection: 'dombastok',
        typeReducer: 'STORE_DATA'
      })
    } else if (selectedProduct == 'jenisPakan') {
      let z = Object.assign(test, pakanData)
      setTest(z)
      setFirebaseSetup({
        collection: 'pakanstok',
        typeReducer: 'STORE_DATA_PAKAN'
      })
    } else if (selectedProduct == 'obatSuplemen') {
      let z = Object.assign(test, obatData)
      setTest(z)
      setFirebaseSetup({
        collection: 'obatstok',
        typeReducer: 'STORE_DATA_OBAT'
      })
    } else if (selectedProduct == 'tambahProduk') {
      let z = Object.assign(test, addProduct)
      setTest(z)
    }
  }

  useEffect(() => {
    xfunc()
  }, [selectedProduct])


  const addDombaStok = (values) => {

    const datas = {
      id: firebase.firestore()
        .collection(firebaseSetup.collection)
        .doc().id
    }
    let addedProperties = { id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(), userId: uid }
    const newValue = Object.assign(values, addedProperties)
    const db = firebase.firestore();
    db.collection(firebaseSetup.collection)
      .doc(datas.id)
      .set(newValue)
    dispatch({ type: firebaseSetup.typeReducer, results: newValue })

  }


  const addUserProduct = (values) => {

    const datas = {
      id: firebase.firestore()
        .collection("userproduk")
        .doc().id
    }
    let addedProperties = { id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(), userId: uid }
    const newValue = Object.assign(values, addedProperties)
    const db = firebase.firestore();
    db.collection("userproduk")
      .doc(datas.id)
      .set(newValue)
    dispatch({ type: 'STORE_DATA_USERPRODUK', results: newValue })
    uploadImageProduk(values.image, "UserProduk", newValue.id, "userproduk", "image")

  }

  const testPicker = [
    {
      id: 1,
      label: "Hewan Ternak",
      value: "jenisHewanTernak"
    }, {
      id: 2,
      label: "Pakan",
      value: "jenisPakan"
    }, {
      id: 3,
      label: "Obat dan Vitamin",
      value: "obatSuplemen"
    }
    , {
      id: 4,
      label: "Tambah Produk",
      value: "tambahProduk"
    }
  ]

  return (
    <Formik
      initialValues={test}
      onSubmit={(values, actions) => {
        console.log(values)
        addUserProduct(values)
        setModalVisible(!modalVisible)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.formContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedProduct}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedProduct(itemValue)
                }
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#474747',
                }}
                prompt='Jenis Produk'

              >

                {testPicker.map((item, i) => {
                  return <Picker.Item label={item.label} value={item.value} key={item.id} />
                })}
              </Picker>
            </View>
            {selectedProduct == 'jenisHewanTernak' ? <DombaForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalVisible={setModalVisible} modalVisible={modalVisible} /> : null}
            {selectedProduct == 'jenisPakan' ? <PakanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalVisible={setModalVisible} modalVisible={modalVisible} /> : null}
            {selectedProduct == 'obatSuplemen' ? <ObatForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalVisible={setModalVisible} modalVisible={modalVisible} /> : null}
            {selectedProduct == 'tambahProduk' ? <AddProductForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalVisible={setModalVisible} modalVisible={modalVisible} /> : null}
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

export default FormStok

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: '10%',
  },
  pickerContainer: {
    backgroundColor: '#DFE1E0',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    borderRadius: 5
  },
  textInput: {
    backgroundColor: 'white',
    width: '60%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10
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
  selectProductButton: {
    backgroundColor: 'white',
    width: '60%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10
  },
  formContainer: { 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})

