import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload'
import SelectProductModal from '../../income/selling/SelectProductModal'
import firebase from '../../../Firebaseconfig'
import DateTimePicker from '@react-native-community/datetimepicker'
import { onChangeNew } from '../../../utils/DatePickerUtil'

const StockPurchasingForm = ({ setFieldValue, handleChange, handleBlur, values, handleSubmit, modalTransaction, setModalTransaction, errors, isValid }) => {

  const [ mode, setMode ] = useState('date')
  const [ show, setShow ] = useState(false)

  const [isBatasBayar, setIsBatasBayar] = useState(false)

  const onChangeBatasBayar = (event, selectedDate) => {
    if (selectedDate) {
      setShow(false)
      setFieldValue('batasBayar', selectedDate.toDateString())
      setIsBatasBayar(false)
    } else {
      setShow(false)
      setFieldValue('batasBayar', '')
      setIsBatasBayar(false)
    }

  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const [img, setImg] = useState()
  const [modalProductVisible, setModalProductVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({
    nama: 'Pilih Produk'
  })

  const [stockCount, setStokCount] = useState(false)

  const removePhoto = () => {
    setImg()
    setFieldValue('image', '')
  }


  const updateSelectedProduct = (selectedProduct, formValues) => {
    return firebase
      .firestore()
      .collection("userproduk")
      .doc(selectedProduct.id)
      .update({
        "jumlah": (parseInt(selectedProduct.jumlah) + parseInt(formValues.jumlahProduk)).toString()
      }).then(() => {
        
      }).catch((error) => alert(error))
  }

  useEffect(() => {
    setFieldValue('image', img)
  }, [img])

  useEffect(() => {
    setFieldValue('hargaBeli', selectedProduct.hargaBeli)
    if (selectedProduct.jumlah && values !== 'undefined') {
      setFieldValue('produk', selectedProduct.nama)
      setFieldValue('jumlah', '')
      if (selectedProduct.jumlah) {
        setStokCount(true)
      }
    } 
  }, [selectedProduct])


  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date}
          mode={mode}
          is24Hour={true}
          onChange={isBatasBayar ? onChangeBatasBayar : (event, selectedDate) => onChangeNew(event, selectedDate, setShow, setFieldValue)}
        />
      )}
      <TextInput
        onChangeText={handleChange('namaTransaksi')}
        onBlur={handleBlur('namaTransaksi')}
        value={values.namaTransaksi}
        style={styles.textInput}
        placeholder='Nama Transaksi'
        placeholderTextColor="#474747"
      />
      {errors.namaTransaksi && <Text style={styles.errorTxt}>{errors.namaTransaksi}</Text>}
      <TouchableOpacity style={styles.textInput} onPress={() => setModalProductVisible(!modalProductVisible)} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
          <Text style={{ color: '#474747' }}>{selectedProduct.nama}</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      {stockCount ?
        <View style={{ width: '90%', flex: 1 }}>
          <Text style={{ color: 'green' }}>Jumlah Stok Tersedia: {selectedProduct.jumlah}</Text>
        </View> : null}
      <View style={styles.wrapperForms}>
        <TextInput
          onChangeText={handleChange('jumlahProduk')}
          onBlur={handleBlur('jumlahProduk')}
          value={values.jumlahProduk}
          style={styles.textInput}
          placeholder='Jumlah'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
        <TextInput
          onChangeText={handleChange('hargaBeli')}
          onBlur={handleBlur('hargaBeli')}
          value={values.hargaBeli}
          style={styles.textInput}
          placeholder='Harga Beli'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
        <TextInput
          onChangeText={handleChange('pembeli')}
          onBlur={handleBlur('pembeli')}
          value={values.pembeli}
          style={styles.textInput}
          placeholder='Pembeli'
          placeholderTextColor="#474747"
        />
        <TextInput
          onChangeText={handleChange('diskon')}
          onBlur={handleBlur('diskon')}
          value={values.diskon}
          style={styles.textInput}
          placeholder='Diskon'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
        <TextInput
          onChangeText={handleChange('pajak')}
          onBlur={handleBlur('pajak')}
          value={values.pajak}
          style={styles.textInput}
          placeholder='Pajak'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
        <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.tanggal ? values.tanggal : "Tanggal Pembelian"}</Text>
            <MaterialIcons name="date-range" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {errors.tanggal && <Text style={styles.errorTxt}>{errors.tanggal}</Text>}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={values.statusBayar}
            onValueChange={(itemValue, itemIndex) => {
              setFieldValue('statusBayar', itemValue)
            }
            }
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            <Picker.Item label="Status Bayar" value="status" style={{ color: "#ED9B83" }} />
            <Picker.Item label="Lunas" value="Lunas" />
            <Picker.Item label="Belum Lunas" value="Belum Lunas" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={values.tipePembayaran}
            onValueChange={(itemValue, itemIndex) => {
              setFieldValue('tipePembayaran', itemValue)
            }
            }
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            <Picker.Item label="Tipe Pembayaran" value="status" style={{ color: "#ED9B83" }} />
            <Picker.Item label="Tunai" value="Tunai" />
            <Picker.Item label="Tempo" value="Tempo" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.textInput} onPress={() => {
          setIsBatasBayar(!isBatasBayar)
          showDatepicker()
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.batasBayar ? values.batasBayar : "Batas Bayar"}</Text>
            <MaterialIcons name="date-range" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TextInput
          onChangeText={handleChange('deskripsi')}
          onBlur={handleBlur('deskripsi')}
          value={values.deskripsi}
          style={styles.textInput}
          placeholder='Deskripsi'
          placeholderTextColor="#474747"
        />
        <TouchableOpacity style={styles.textInput} onPress={() => {
          let isUpdate = false
          pickImageOnly(isUpdate, setImg)
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>Unggah Bukti Jual</Text>
            <MaterialIcons name="file-upload" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {img ? <View style={styles.imageContainer}>
          <Image source={{ uri: img }} style={styles.imageWrap} />
          <TouchableOpacity style={styles.removeBtn} onPress={removePhoto}>
            <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Hapus Foto</Text>
          </TouchableOpacity>
        </View> : null}
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.btnSave} onPress={() => setModalTransaction(!modalTransaction)}>
           <Text style={styles.batalTxt}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
            if (!values.produk) {
              Alert.alert(
                "Perhatian!",
                `Pilih Produk Dahulu!`)
            }
            else if (!values.jumlahProduk || !values.hargaBeli || values.jumlahProduk == '' || values.jumlahProduk == "0" || values.hargaBeli == "" || values.hargaBeli == '0') {
              Alert.alert(
                "Perhatian!",
                `Jumlah dan Harga Jual Harus Lebih Dari 0!`)
            } else if (!isValid) {

              Alert.alert(
                "Perhatian!",
                `Cek Kembali Form Anda.`)

            } else {

              setFieldValue('kategori', 'Pembelian Stok')
              setFieldValue('jumlah', (parseInt(values.jumlahProduk) * parseInt(values.hargaBeli)).toString())
              updateSelectedProduct(selectedProduct, values)
              handleSubmit()
            }

          }}>
            <Text style={styles.txtSave}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SelectProductModal modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} setFieldValue={setFieldValue} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
    </View>
  )
}

export default StockPurchasingForm

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  pickerContainer: {
    backgroundColor: '#DFE1E0',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5
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
    backgroundColor: 'white',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10
  },
  imageWrap: {
    width: undefined,
    height: '100%',
    aspectRatio: 1
  },
  txtSave: { 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center', 
    color: '#FFF' 
  },
  batalTxt: { 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  removeBtn: { 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  wrapperForms: { 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'transparent', 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' 
  },
  errorTxt: { 
    fontSize: 14, 
    color: "red" 
  },
  imageContainer: { 
    width: '90%', 
    height: 150, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 30 
  }
})
