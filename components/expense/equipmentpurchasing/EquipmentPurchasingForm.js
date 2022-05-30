import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload';
import DateTimePicker from '@react-native-community/datetimepicker';

const EquipmentPurchasingForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit,modalTransaction, setModalTransaction}) => {

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
  const [modalProductVisible, setModalProductVisible] = useState(false);


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
            <TextInput
              onChangeText={handleChange('produk')}
              onBlur={handleBlur('produk')}
              value={values.produk}
              style={styles.textInput}
              placeholder='Nama Produk'
              placeholderTextColor="#474747" 
            />
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
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
              placeholder='Harga Jual'
              keyboardType='numeric'
              placeholderTextColor="#474747" 
            />
            <TextInput
              onChangeText={handleChange('beliDari')}
              onBlur={handleBlur('beliDari')}
              value={values.beliDari}
              style={styles.textInput}
              placeholder='Beli Dari'
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
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggal?values.tanggal:"Tanggal Terjual"}</Text>   
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
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.tipePembayaran}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                      setFieldValue('tipePembayaran',itemValue)
                    }
                    }
                    style={{
                      fontSize: 22,
                      fontWeight:'bold',
                      color: 'black',
                    }}     
                    >
                    <Picker.Item label="Tipe Pembayaran" value="status" style={{color:"#ED9B83"}}/>
                    <Picker.Item label="Tunai" value="Tunai" />
                    <Picker.Item label="Tempo" value="Tempo" />
                </Picker>
            </View>
            <TouchableOpacity style={styles.textInput} onPress={() => {
              setIsBatasBayar(!isBatasBayar)
              showDatepicker()
            }}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.batasBayar?values.batasBayar:"Batas Bayar"}</Text>   
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
                if(!values.jumlahProduk || values.jumlahProduk == '' || values.jumlahProduk == "0" || values.hargaBeli == "" || values.hargaBeli == '0') {
                  Alert.alert(
                    "Perhatian!",
                    `Jumlah dan Harga Beli Harus Lebih Dari 0!`)
                } else {
                  
                  setFieldValue('kategori', 'Pembelian Alat dan Mesin')
                  setFieldValue('jumlah', (parseInt(values.jumlahProduk) * parseInt(values.hargaBeli)).toString())
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

export default EquipmentPurchasingForm

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
