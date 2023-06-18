import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons'
import { windowWidth } from '../../utils/DimensionSetup'

const AccountDetailForm = ({ handleChange, handleBlur, handleSubmit, values, setFieldValue, setEnableShift }) => {
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const [ isBatasBayar, setIsBatasBayar ] = useState(false)

  const onChange = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate
        setShow(false)
        setFieldValue('tanggalLahir', selectedDate.toDateString())
    } else {
        console.log("eweuh")
        setShow(false)
        setFieldValue('tanggalLahir', '')
    }
    
  }

  const onChangeBatasBayar = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate
        setShow(false)
        setFieldValue('batasBayar', selectedDate.toDateString())
        setIsBatasBayar(false)
    } else {
        console.log("eweuh")
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

  return (
    <View style={styles.container}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date}
            mode={mode}
            is24Hour={true}
            onChange={isBatasBayar?onChangeBatasBayar:onChange}
          />
        )}
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(false)}
          placeholder='Nama Depan'
          placeholderTextColor="#000" 
          onChangeText={handleChange('namaDepan')}
          onBlur={handleBlur('namaDepan')}
          value={values.namaDepan}
        />
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(false)}
          placeholder='Nama Belakang'
          placeholderTextColor="#000" 
          onChangeText={handleChange('namaBelakang')}
          onBlur={handleBlur('namaBelakang')}
          value={values.namaBelakang}
        />
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(false)}
          placeholder='No. HP'
          placeholderTextColor="#000" 
          onChangeText={handleChange('whatsApp')}
          onBlur={handleBlur('whatsApp')}
          value={values.whatsApp}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(false)}
          placeholder='Email'
          placeholderTextColor="#000" 
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
      <View style={styles.pickerContainer}>
          <Picker
              selectedValue={values.jenisKelamin}
              onValueChange={(itemValue, itemIndex) =>
              {
                setFieldValue('jenisKelamin',itemValue)
              }
              }
              style={{
                fontSize: 18,
                fontWeight:'bold',
                color: "#000",
              }} 
              >
              <Picker.Item label="Jenis Kelamin" value="jenisKelamin" style={{color:"#ED9B83"}}/>
              <Picker.Item label="Laki-laki" value="Laki-laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                <Text style={{color:'#000'}}>{values.tanggalLahir?values.tanggalLahir:"Tanggal Lahir"}</Text>   
                <MaterialIcons name="date-range" size={24} color="#000" />    
            </View>                
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(true)}
          placeholder='Domisili'
          placeholderTextColor="#000" 
          onChangeText={handleChange('domisili')}
          onBlur={handleBlur('domisili')}
          value={values.domisili}
        />
        <TextInput
          style={styles.textInput}
          onFocus={() => setEnableShift(true)}
          placeholder='Kata Sandi'
          placeholderTextColor="#000" 
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={styles.txtSimpan}>SIMPAN</Text>                  
        </TouchableOpacity>

    </View>
  )
}

export default AccountDetailForm

const styles = StyleSheet.create({
    container: {
      width: windowWidth, 
      alignItems: 'center',
      height: '100%',
  },   
    textInput:{
      justifyContent: 'center',
      width: '90%',
      height: 40,
      padding: 8,
      marginBottom: 10,
      borderBottomWidth: 1,
    },
    pickerContainer:{
      justifyContent: 'center',
      width: '90%',
      height: 40,
      padding: 8,
      marginBottom: 10,
      borderBottomWidth: 1
    },
    btnSave:{
      backgroundColor: '#ED9B83',
      width: windowWidth * .9,
      height: 60,                     
      justifyContent: 'center',
      elevation: 2,
      borderRadius: 10, 
      marginTop: 60
    },
    txtSimpan: {
      fontSize: 18, 
      fontWeight: '700', 
      textAlign: 'center',
      color: '#FFF'
  }
})
