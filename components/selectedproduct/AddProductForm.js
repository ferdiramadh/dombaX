import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import SelectCategoryModal from '../InventoryComponents/GlobalEditScreen/SelectCategoryModal'
import { pickImageOnly } from '../../utils/ImageUpload'

const AddProductForm = ({ setFieldValue, handleChange, handleBlur, values, handleSubmit, setModalVisible, modalVisible }) => {

  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
  const [category, setCategory] = useState("Kategori")
  const [img, setImg] = useState()

  const removePhoto = () => {
    setImg()
    setFieldValue('image', '')
  }

  useEffect(() => {
    setFieldValue('image', img)
  }, [img])


  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChange('nama')}
        onBlur={handleBlur('nama')}
        value={values.nama}
        style={styles.textInput}
        placeholder='Nama Produk'
      />
      <View style={{ width: '90%', flex: 1 }}>
        <Text style={{ color: '#474747' }}>Contoh: Ear Tag</Text>
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          onChangeText={handleChange('hargaBeli')}
          onBlur={handleBlur('hargaBeli')}
          value={values.hargaBeli}
          style={styles.textInput}
          placeholder='Harga Beli'
          keyboardType='numeric'
        />
        <TextInput
          onChangeText={handleChange('jumlah')}
          onBlur={handleBlur('jumlah')}
          value={values.jumlah}
          style={styles.textInput}
          placeholder='Jumlah'
          keyboardType='numeric'
        />
        <TextInput
          onChangeText={handleChange('deskripsi')}
          onBlur={handleBlur('deskripsi')}
          value={values.deskripsi}
          style={styles.textInput}
          placeholder='Deskripsi'
        />
        <TouchableOpacity style={styles.textInput} onPress={() => setModalCategoryVisible(!modalCategoryVisible)} >
          <View style={styles.wrapper}>
            <Text style={{ color: '#474747' }}>{category}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TextInput
          onChangeText={handleChange('satuan')}
          onBlur={handleBlur('satuan')}
          value={values.satuan}
          style={styles.textInput}
          placeholder='Satuan'
        />
        <TouchableOpacity style={styles.textInput} onPress={() => {
          let isUpdate = false
          pickImageOnly(isUpdate, setImg)
        }}>
          <View style={styles.wrapper}>
            <Text style={{ color: '#474747' }}>Upload Gambar</Text>
            <MaterialIcons name="file-upload" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {img ? <View style={{ width: '90%', height: 150, justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
          <Image source={{ uri: img }} style={styles.imageWrap} />
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={removePhoto}>
            <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Hapus Foto</Text>
          </TouchableOpacity>
        </View> : null}


        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.btnSave} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.batalTxt}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
            setFieldValue("tipe", "tambahproduk")
            handleSubmit()
          }}>
            <Text style={styles.txtSave}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SelectCategoryModal modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />
    </View>
  )
}

export default AddProductForm

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  pickerContainer: {
    backgroundColor: '#DFE1E0',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10
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
    paddingHorizontal: 10,
    marginTop: 10
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
  wrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingRight: 10 
  }
})
