import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload';
import DateTimePicker from '@react-native-community/datetimepicker';

const SavingOrInvestingForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit,modalTransaction, setModalTransaction}) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [ isBatasBayar, setIsBatasBayar ] = useState(false)

  const onChange = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate;
        setShow(false);
        setFieldValue('tanggal', selectedDate.toDateString())
    } else {
        console.log("eweuh")
        setShow(false);
        setFieldValue('tanggal', '')
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

  const [ img, setImg ] = useState()
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10, }}>
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
              onChangeText={handleChange('namaTransaksi')}
              onBlur={handleBlur('namaTransaksi')}
              value={values.namaTransaksi}
              style={styles.textInput}
              placeholder='Nama Transaksi'
              placeholderTextColor="#474747" 
            />
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('aktivitas')}
              onBlur={handleBlur('aktivitas')}
              value={values.aktivitas}
              style={styles.textInput}
              placeholder='Aktivitas'
              placeholderTextColor="#474747" 
            />
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah'
              keyboardType='numeric'
              placeholderTextColor="#474747" 
            />           
            <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggal?values.tanggal:"Tanggal"}</Text>   
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
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>Unggah Bukti Jual</Text>   
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
                if(!values.jumlah || values.jumlah == '' || values.jumlah == "0") {
                  Alert.alert(
                    "Perhatian!",
                    `Jumlah Harus Lebih Dari 0!`)
                } else {
                  
                  setFieldValue('kategori', 'Tabungan atau Investasi')
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

export default SavingOrInvestingForm

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
