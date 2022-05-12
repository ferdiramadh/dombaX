import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload';
import DateTimePicker from '@react-native-community/datetimepicker';

const LoanForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit,modalTransaction, setModalTransaction}) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate;
        setShow(false);
        setFieldValue('tanggalPinjam', selectedDate.toDateString())
    } else {
        console.log("eweuh")
        setShow(false);
        setFieldValue('tanggalPinjam', '')
    }
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [ img, setImg ] = useState()

  const removePhoto = () => {
    setImg()
    setFieldValue('image','')
  }


  useEffect(() => {
    setFieldValue('image', img)
  },[img])

    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10, }}>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah Pinjaman'
              keyboardType='numeric'
              placeholderTextColor="#474747" 
            />
            <TextInput
              onChangeText={handleChange('pinjamanDari')}
              onBlur={handleBlur('pinjamanDari')}
              value={values.pinjamanDari}
              style={styles.textInput}
              placeholder='Pinjam Dari'
              placeholderTextColor="#474747" 
            />
            <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggalPinjam?values.tanggalPinjam:"Tanggal Pinjam"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.statusBayar}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                      setFieldValue('statusBayar',itemValue)
                    }
                    }
                    style={{
                      fontSize: 22,
                      fontWeight:'bold',
                      color: 'black',
                    }}                    
                    >
                    <Picker.Item label="Status Bayar" value="status" style={{color:"#ED9B83"}}/>
                    <Picker.Item label="Lunas" value="Lunas" />
                    <Picker.Item label="Belum Lunas" value="Belum Lunas" />
                </Picker>
            </View>
            <TextInput
              onChangeText={handleChange('bunga')}
              onBlur={handleBlur('bunga')}
              value={values.bunga}
              style={styles.textInput}
              placeholder='Bunga'
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
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>Unggah Bukti Pinjam</Text>   
                    <MaterialIcons name="file-upload" size={24} color="black" />      
                </View>                
            </TouchableOpacity>
            {img? <View style={{width: '90%', height:150,  justifyContent:'center', alignItems:'center', marginVertical: 30}}>
                      <Image source={{ uri:img }} style={styles.imageWrap} />
                      <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={removePhoto}>
                        <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Hapus Foto</Text>
                      </TouchableOpacity>
                    </View>:null}
            <View style={styles.btnWrap}>
              <TouchableOpacity style={styles.btnSave} onPress={() => setModalTransaction(!modalTransaction)}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Batal</Text>                  
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSave,{backgroundColor:'#ED9B83'}]} onPress={() => {
                if (!values.jumlah || values.jumlah == '' || values.jumlah == "0") {
                  Alert.alert(
                    "Perhatian!",
                    `Jumlah Harus Lebih Dari 0!`)
                } else {
                setFieldValue('kategori', 'Pinjaman')
                handleSubmit()
                }
              }}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Simpan</Text>                  
              </TouchableOpacity>
            </View>
            
            </View>
          </View>
    )
}

export default LoanForm

const styles = StyleSheet.create({
    container:{
    width:'100%',
    flexDirection:'column',
    marginBottom:15,
    borderBottomColor:'lightgrey',
    borderBottomWidth: 2
},
     pickerContainer:{
      // position:'absolute',
      // top: 30,
      backgroundColor:'#DFE1E0',
      width:'90%',
      height:50,                       
      // borderColor:'black',
      // borderWidth:2,                
      // borderRadius:20,
      justifyContent:'center', 
      paddingLeft:10,
      marginVertical:10
    },
    textInput:{
      backgroundColor:'#DFE1E0',
      width:'90%',
      height:50,                       
      // borderColor:'black',
      // borderWidth:2,                
      // borderRadius:20,
      justifyContent:'center', 
      paddingLeft:20,
      marginVertical:10,
    },
    btnSave:{
      backgroundColor:'white',
      width:'45%',
      height:40,                       
      justifyContent:'center',
      borderRadius:5,
      elevation: 2
    },
    btnWrap:{
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%',
      paddingHorizontal: 10
    },
    imageWrap:{
      width: undefined,
      height: '100%',
      aspectRatio: 1
      
    }
})
