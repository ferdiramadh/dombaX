import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload'
import DateTimePicker from '@react-native-community/datetimepicker'

const GrantForm = ({ setFieldValue, handleChange, handleBlur, values, handleSubmit, modalTransaction, setModalTransaction, errors, isValid }) => {

  const [ mode, setMode ] = useState('date')
  const [ show, setShow ] = useState(false)

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setShow(false)
      setFieldValue('tanggal', selectedDate.toDateString())
    } else {
      setShow(false)
      setFieldValue('tanggal', '')
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

  const removePhoto = () => {
    setImg()
    setFieldValue('image', '')
  }


  useEffect(() => {
    setFieldValue('image', img)
  }, [img])


  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={values.bentukHibah}
          onValueChange={(itemValue, itemIndex) => {
            setFieldValue('bentukHibah', itemValue)
          }
          }
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          <Picker.Item label="Bentuk Hibah" value="status" style={{ color: "#ED9B83" }} />
          <Picker.Item label="Uang" value="Uang" />
          <Picker.Item label="Barang" value="Barang" />
        </Picker>
      </View>
      <View style={styles.wrapperForms}>
        <TextInput
          onChangeText={handleChange('jumlah')}
          onBlur={handleBlur('jumlah')}
          value={values.jumlah}
          style={styles.textInput}
          placeholder='Jumlah Hibah'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
        <TextInput
          onChangeText={handleChange('diberikanDari')}
          onBlur={handleBlur('diberikanDari')}
          value={values.diberikanDari}
          style={styles.textInput}
          placeholder='Diberikan Dari'
          placeholderTextColor="#474747"
        />
        <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.tanggal ? values.tanggal : "Tanggal Hibah Masuk"}</Text>
            <MaterialIcons name="date-range" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {errors.tanggal && <Text style={styles.errorTxt}>{errors.tanggal}</Text>}
        <TextInput
          onChangeText={handleChange('pajak')}
          onBlur={handleBlur('pajak')}
          value={values.pajak}
          style={styles.textInput}
          placeholder='Pajak'
          keyboardType='numeric'
          placeholderTextColor="#474747"
        />
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
            <Text style={{ color: '#474747' }}>Unggah Bukti Hibah</Text>
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
            if (!values.jumlah || values.jumlah == '' || values.jumlah == "0") {
              Alert.alert(
                "Perhatian!",
                `Jumlah Harus Lebih Dari 0!`)
            } else if (!isValid) {

              Alert.alert(
                "Perhatian!",
                `Cek Kembali Form Anda.`)

            } else {
              setFieldValue('kategori', 'Hibah')
              handleSubmit()
            }
          }}>
            <Text style={styles.txtSave}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default GrantForm

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
