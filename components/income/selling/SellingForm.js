import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { pickImageOnly } from '../../../utils/ImageUpload';
import SelectProductModal from './SelectProductModal';
import firebase from '../../../Firebaseconfig'

const SellingForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit,modalTransaction, setModalTransaction}) => {

  const [ img, setImg ] = useState()
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [ selectedProduct, setSelectedProduct ] = useState({
    nama: 'Pilih Produk'
  })

  const [ stockCount, setStokCount] = useState(false)

  const removePhoto = () => {
    setImg()
    setFieldValue('image','')
  }

  const checkAvailability = (val) => {
    console.log('checkAvailability')
    console.log(val)
    if( selectedProduct.jumlah && values !== 'undefined' ) {
 
    let num = parseInt(val)
    let jml = parseInt(selectedProduct.jumlah) 
    if( num > jml) {
      Alert.alert('Perhatian', 'Item Melebihi Ketersediaan Stok Saat Ini');
      setFieldValue('jumlah', selectedProduct.jumlah);
     }     
    }
  }

  const updateSelectedProduct = (selectedProduct, formValues) => {
    return firebase
      .firestore()
      .collection("userproduk")
      .doc(selectedProduct.id)
      .update({
        "jumlah": (parseInt(selectedProduct.jumlah) - parseInt(formValues.jumlah)).toString()
      }).then(() => {
        console.log('Item Updated')
      }).catch((error) => console.log(error))
  }

  useEffect(() => {
    setFieldValue('image', img)
  },[img])

  useEffect(() => {
    if(selectedProduct.jumlah && values !== 'undefined' ) {
      console.log("Check COK selectedProduct")
    console.log(selectedProduct)
    // checkAvailability(values.jumlah)
    setFieldValue('jumlah', '')
    if(selectedProduct.jumlah) {
      setStokCount(true)
      
    }
  } else {
    console.log("WWW")
  }
  },[selectedProduct])

  useEffect(() => {
    
    if(selectedProduct.jumlah && values !== 'undefined') {
      
      console.log("Check jumlah")
    console.log(values.jumlah)
    checkAvailability(values.jumlah)
    } else {
      console.log("Check Values")
      console.log(values)
    }
  }, [values])
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10, }}>
            <TouchableOpacity style={styles.textInput} onPress={() => setModalProductVisible(!modalProductVisible)} >
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                <Text style={{color:'#474747'}}>{selectedProduct.nama}</Text>   
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>                
            </TouchableOpacity>
            {stockCount? 
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'green'}}>Jumlah Stok Tersedia: {selectedProduct.jumlah}</Text>
            </View>: null}
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah'
              keyboardType='numeric'
              placeholderTextColor="#474747" 
            />
            <TextInput
              onChangeText={handleChange('hargaJual')}
              onBlur={handleBlur('hargaJual')}
              value={values.hargaJual}
              style={styles.textInput}
              placeholder='Harga Jual'
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
            <TextInput
              onChangeText={handleChange('tanggalJual')}
              onBlur={handleBlur('tanggalJual')}
              value={values.tanggalJual}
              style={styles.textInput}
              placeholder='Tanggal Terjual'
              placeholderTextColor="#474747" 
            />
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
                    prompt='Status Bayar'
                    
                    >
                    {/* <Picker.Item label="Status Bayar" value="status" /> */}
                    <Picker.Item label="Lunas" value="lunas" />
                    <Picker.Item label="Belum Lunas" value="belumlunas" />
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.tipeBayar}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                      setFieldValue('tipeBayar',itemValue)
                    }
                    }
                    style={{
                      fontSize: 22,
                      fontWeight:'bold',
                      color: 'black',
                    }}
                    prompt='Tipe Pembayaran'
                    
                    >
                    {/* <Picker.Item label="Tipe Pembayaran" value="status" /> */}
                    <Picker.Item label="Tunai" value="tunai" />
                    <Picker.Item label="Tempo" value="tempo" />
                </Picker>
            </View>
            <TextInput
              onChangeText={handleChange('batasBayar')}
              onBlur={handleBlur('batasBayar')}
              value={values.batasBayar}
              style={styles.textInput}
              placeholder='Batas Bayar'
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
                updateSelectedProduct(selectedProduct, values)
                handleSubmit()
              }}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Simpan</Text>                  
              </TouchableOpacity>
            </View>
            
            </View>
            <SelectProductModal modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} setFieldValue={setFieldValue} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
          </View>
    )
}

export default SellingForm

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