import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

const AccountDetailForm = ({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [ isBatasBayar, setIsBatasBayar ] = useState(false)

  const onChange = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate;
        setShow(false);
        setFieldValue('tanggalLahir', selectedDate.toDateString())
    } else {
        console.log("eweuh")
        setShow(false);
        setFieldValue('tanggalLahir', '')
    }
    
  };

  const onChangeBatasBayar = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate;
        setShow(false);
        setFieldValue('batasBayar', selectedDate.toDateString())
        setIsBatasBayar(false)
    } else {
        console.log("eweuh")
        setShow(false);
        setFieldValue('batasBayar', '')
        setIsBatasBayar(false)
    }
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
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
          placeholder='Nama Depan...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaDepan')}
          onBlur={handleBlur('namaDepan')}
          value={values.namaDepan}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Nama Belakang...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaBelakang')}
          onBlur={handleBlur('namaBelakang')}
          value={values.namaBelakang}
        />
        <TextInput
          style={styles.textInput}
          placeholder='No. HP'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('whatsApp')}
          onBlur={handleBlur('whatsApp')}
          value={values.whatsApp}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email...'
          placeholderTextColor="#fff" 
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
                fontSize: 22,
                fontWeight:'bold',
                color: "#FFF",
              }} 
              >
              <Picker.Item label="Jenis Kelamin" value="jenisKelamin" style={{color:"#ED9B83"}}/>
              <Picker.Item label="Laki-laki" value="Laki-laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                <Text style={{color:'#FFF'}}>{values.tanggalLahir?values.tanggalLahir:"Tanggal Lahir"}</Text>   
                <MaterialIcons name="date-range" size={24} color="#000" />    
            </View>                
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder='Domisili'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('domisili')}
          onBlur={handleBlur('domisili')}
          value={values.domisili}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Kata Sandi'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        {/* <TextInput
          style={styles.textInput}
          placeholder='Nama Bisnis...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaBisnis')}
          onBlur={handleBlur('namaBisnis')}
          value={values.namaBisnis}
          maxLength={23}
        /> */}
        
      
         <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'white'}}>Simpan</Text>                  
        </TouchableOpacity>

    </View>
  );
};

export default AccountDetailForm;

const styles = StyleSheet.create({
    textInput:{
          justifyContent:'center',
          backgroundColor:'#ED9B83',
          width:'90%',
          height:60,
          padding:8,
          color: "#FFF",
          borderRadius:10,
          marginVertical: 8,
          fontSize:14,
          elevation: 2
      },
      pickerContainer:{
       backgroundColor:'#ED9B83',
       width:'90%',
       height:60,                      
       borderRadius:10,
       justifyContent:'center', 
       marginVertical:10
     },
      btnSave:{
        backgroundColor:'#ED9B83',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        elevation: 2,
        borderRadius:10,
        marginTop: 10,  
        marginBottom: 20
      },
      btnEdit:{
          height: 40,
          width: '15%',
          backgroundColor:'white',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:5,
          borderWidth:2,
          left: 20,
          position:'absolute',
          top:0
          
      }
});
