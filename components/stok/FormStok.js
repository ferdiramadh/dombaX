import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import DombaForm from './domba/DombaForm'
import PakanForm from '../stok/pakan/PakanForm'
import ObatForm from '../stok/obatdansuplemen/ObatForm'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '../../Firebaseconfig'
import AddProductForm from '../selectedproduct/AddProductForm'
import { uploadImageProduk } from '../../utils/ImageUpload'
import CustomDropdown from './CustomDropdown'

const FormStok = ({ setModalVisible, modalVisible }) => {

  const dispatch = useDispatch()
  const uid = useSelector(state => state.userReducer.uid)
  const listCategory = useSelector(state => state.userCategoryProductReducer.listUserCategoryProduct)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const ternakData = {
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
  }
  const pakanData = {
    id: '',
    nama: '',
    merk: '',
    jumlah: '',
    hargaBeli: '',
    kadaluarsa: '',
    petunjuk: '',
    tipe: 'pakan',
    image: ''

  }

  const obatData = {
    id: '',
    nama: '',
    merk: '',
    jumlah: '',
    hargaBeli: '',
    kadaluarsa: '',
    petunjuk: '',
    tipe: 'obat',
    image: ''

  }

  const addProduct = {
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

  const [initiateData, setInitiateData] = useState({})

  const initiateValue = () => {

    if (selectedProduct == 'jenisHewanTernak') {
      let dataValues = Object.assign(initiateData, ternakData)
      setInitiateData(dataValues)
    } else if (selectedProduct == 'jenisPakan') {
      let dataValues = Object.assign(initiateData, pakanData)
      setInitiateData(dataValues)
    } else if (selectedProduct == 'obatSuplemen') {
      let dataValues = Object.assign(initiateData, obatData)
      setInitiateData(dataValues)
    } else if (selectedProduct == 'tambahProduk') {
      let dataValues = Object.assign(initiateData, addProduct)
      setInitiateData(dataValues)
    }
  }

  useEffect(() => {
    initiateValue()
  }, [selectedProduct])


  const addUserProduct = (values) => {

    const datas = {
      id: firebase.firestore()
        .collection("userproduk")
        .doc().id
    }
    let addedProperties = { id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(), userId: uid }
    const newValue = Object.assign(values, addedProperties)
    const db = firebase.firestore()
    db.collection("userproduk")
      .doc(datas.id)
      .set(newValue)
    dispatch({ type: 'STORE_DATA_USERPRODUK', results: newValue })
    uploadImageProduk(values.image, "UserProduk", newValue.id, "userproduk", "image")

  }
  const initiateProduk = [
    {
      id: 1,
      name: "Hewan Ternak",
      value: "jenisHewanTernak"
    }, {
      id: 2,
      name: "Pakan",
      value: "jenisPakan"
    }, {
      id: 3,
      name: "Obat dan Vitamin",
      value: "obatSuplemen"
    }
  ]
  const [jenisProdukPicker, setJenisProdukPicker] = useState(initiateProduk)

  const sortData = listCategory.sort((a, b) => {
    let bd = objToDate(b.createdAt)
    let ad = objToDate(a.createdAt)
    return ad - bd
  })

  function objToDate(obj) {
    let result = new Date(0)
    if (obj !== null) {
      result.setSeconds(obj.seconds)
      result.setMilliseconds(obj.nanoseconds / 1000000)
      return result
    }

  }

  useEffect(() => {
    let categoryList = []
    for (let i = 0; i < sortData.length; i++) {
      categoryList.push({
        id: sortData[i].id,
        name: sortData[i].name
      })
    }
    setJenisProdukPicker([...initiateProduk, ...categoryList])
  }, [listCategory])

  return (
    <Formik
      initialValues={initiateData}
      onSubmit={(values, actions) => {
        addUserProduct(values)
        setModalVisible(!modalVisible)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.formContainer}>
            {/* <View style={styles.pickerContainer}>
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
                prompt='Kategori'

              >

                {jenisProdukPicker.map((item, i) => {
                  return <Picker.Item label={item.label} value={item.value} key={item.id} />
                })}
              </Picker>
            </View> */}
            <CustomDropdown openFunc={{ isOpen, setIsOpen }} title='Kategori' data={jenisProdukPicker} setSelectedProduct={setSelectedProduct} setFieldValue={setFieldValue} />
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

