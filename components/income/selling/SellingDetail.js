import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import { MaterialIcons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import { pickImageOnly, uploadImageProduk } from '../../../utils/ImageUpload'
import { formatTotalToCurrency, formatToCurrencyLight } from '../../../utils/FormatCurrency';
import { windowHeigth } from '../../../utils/DimensionSetup';
import { windowWidth } from '../../stok/FilterStokModal';
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

const SellingDetail = ({ editData, navigation }) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [data, setData] = useState(editData)
  const [isUpdate, setIsUpdate] = useState(false)
  const [ tempImg, setTempImg ] = useState(false)

  const removePhoto = (set) => {
    set('image','')
  }
  const updateItem = (item) => {
    return firebase
    .firestore()
    .collection("income")
    .doc(item.id)
    .update(item).then(() => {
      uploadImageProduk(item.image, "Income", item.id, "income")
    }).catch((error) => console.log(error))
    
  }

  const updateNotification = () => {
    Alert.alert(
      "Perhatian!",
      `Item sudah diubah.`,
        [

            {
                text: "OK",
                onPress: () => {   
                  navigation.navigate("Transaction")
                }
            }
        ],
    )
    
    
}
  if (data) {

    return (
      <Formik
        initialValues={data}
        onSubmit={(values, actions) => {
          updateItem(values);
          
          updateNotification()

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
          <View style={{justifyContent: 'center', alignItems:'center'}}>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date}
                mode={mode}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  if(selectedDate){
                      setShow(false);
                      setFieldValue('tanggalJual', selectedDate.toDateString())
                  } else {
                      console.log("eweuh")
                      setShow(false);
                      setFieldValue('tanggalJual', '')
                  }           
                }}
              />
            )}
          <View style={[styles.container, isUpdate? {height: windowHeigth*.7}: {height: windowHeigth*.35}]}>
            <View style={styles.upperSection}>
              <Text style={styles.titlePage}>{data.kategori}</Text>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
                // editItem(item)
                setIsUpdate(!isUpdate)
                setTempImg(false)
              }}>
                {isUpdate ? <MaterialIcons name="cancel" size={24} color="black" /> : <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />}
              </TouchableOpacity>
            </View>
            { !isUpdate? 
            <View style={styles.upperImageSection}>
              <Image source={require('../../../assets/images/purchasingcategory/Sell.png')} style={styles.img} resizeMode='contain'/>
              <Text style={styles.totalIncomeCount}>{formatTotalToCurrency(parseInt(data.jumlah))}</Text>
            </View> : null}
            <ScrollView style={styles.containerScroll}>       
            <View>  
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Nama Produk</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('produk')}
                onBlur={handleBlur('produk')}
                value={values.produk}
                style={styles.textInput}
                placeholder='Nama Produk'
              /> : <Text style={styles.itemText}>{data.produk}</Text>}

            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlahProduk')}
                onBlur={handleBlur('jumlahProduk')}
                value={values.jumlahProduk}
                style={styles.textInput}
                placeholder='Jumlah'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.jumlahProduk}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Harga Jual</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('hargaJual')}
                onBlur={handleBlur('hargaJual')}
                value={values.hargaJual}
                style={styles.textInput}
                placeholder='Harga Jual'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{formatToCurrencyLight(data.hargaJual)}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Diskon</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('diskon')}
                onBlur={handleBlur('diskon')}
                value={values.diskon}
                style={styles.textInput}
                placeholder='Diskon'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.diskon}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Pajak</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('pajak')}
                onBlur={handleBlur('pajak')}
                value={values.pajak}
                style={styles.textInput}
                placeholder='Pajak'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.pajak}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Tanggal Jual</Text>
              {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggalJual?values.tanggalJual:"Tanggal Terjual"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity> : <Text style={styles.itemText}>{data.tanggalJual}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Status Bayar</Text>
              {isUpdate ? <View style={styles.pickerContainer}>
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
                    prompt="Status Bayar"
                    >
                    <Picker.Item label="Lunas" value="lunas" />
                    <Picker.Item label="Belum Lunas" value="belumlunas" />
                </Picker>
            </View> : null }
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Tipe Pembayaran</Text>
              {isUpdate ? <View style={styles.pickerContainer}>
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
                    prompt="Tipe Pembayaran"
                    >
                    <Picker.Item label="Tunai" value="tunai" />
                    <Picker.Item label="Tempo" value="tempo" />
                </Picker>
            </View> : <Text style={styles.itemText}>{data.tipePembayaran}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Batas Bayar</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('batasBayar')}
                onBlur={handleBlur('batasBayar')}
                value={values.batasBayar}
                style={styles.textInput}
                placeholder='Batas Bayar'
              /> : <Text style={styles.itemText}>{data.batasBayar}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Deskripsi</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('deskripsi')}
                onBlur={handleBlur('deskripsi')}
                value={values.deskripsi}
                style={styles.textInput}
                placeholder='Deskripsi'
              /> : <Text style={styles.itemText}>{data.deskripsi}</Text>}
            </View>
            </View>  
            <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              {values.image && isUpdate ?
                <Image source={{ uri: values.image }} resizeMode="cover" style={{ width: 300, height: 200, }} />

                : null}
              {isUpdate? <View style={styles.photoOptionsWrap}>
              <TouchableOpacity onPress={() => {
                  removePhoto(setFieldValue)
                  // setTempImg(true)
                  
                }} style={styles.photoButton}>
                  <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Remove Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  let isTrue = true
                  pickImageOnly(isTrue, setFieldValue)
                  
                }} style={styles.photoButton}>
                  <FontAwesome name="file-image-o" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Select A Photo</Text>
                </TouchableOpacity>
              </View> : null}
              {isUpdate?<TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
                setFieldValue('jumlah', (parseInt(values.jumlahProduk) * parseInt(values.hargaJual)).toString())
                handleSubmit()
              }}>
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color: '#FFF' }}>Update</Text>
              </TouchableOpacity>:null}
            </View>
            </ScrollView>
            {/* <Text style={styles.subTitle}>Total</Text>
            <Text style={styles.itemText}>{formatToCurrency(parseInt(data.jumlah) * parseInt(data.hargaBeli))}</Text>
            <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              {values.image ?
                <Image source={{ uri: values.image }} resizeMode="cover" style={{ width: 300, height: 200, }} />

                : null}
              {isUpdate? <View style={styles.photoOptionsWrap}>
              <TouchableOpacity onPress={() => {
                  removePhoto(setFieldValue)
                  // setTempImg(true)
                  
                }} style={styles.photoButton}>
                  <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Remove Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  let isTrue = true
                  pickImageOnly(isTrue, setFieldValue)
                  
                }} style={styles.photoButton}>
                  <FontAwesome name="file-image-o" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Select A Photo</Text>
                </TouchableOpacity>
              </View> : null}
              {isUpdate?<TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={handleSubmit}>
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color: '#FFF' }}>Update</Text>
              </TouchableOpacity>:null}
            </View> */}
            </View>
            { data.statusBayar !== 'status' && data.statusBayar && !isUpdate ? 
            <View style={styles.statusBayarSection}>
            <Text style={[styles.statusText, data.statusBayar == 'lunas'?{color:'#43B88E'}:{color:'#EB3223'}]}>{data.statusBayar == 'lunas'?'Lunas': 'Belum Lunas'}</Text>
            </View>: null}
                        
            { data.image && data.image !== '' && !isUpdate ?<Image source={{ uri: values.image }} resizeMode="cover" style={{ width: 300, height: 200, marginTop: 10 }} />:null}
          </View>)}
          
      </Formik>
    )
  } return(
    <View>
            <TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
             navigation.navigate("Home")
            }}>
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color: '#FFF' }}>Go Home</Text>
              </TouchableOpacity>
    </View>
  )
}

export default SellingDetail

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#DFE1E0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    width: windowWidth*.9
  },
  containerScroll:{
    padding: 10,

  },
  titlePage: {
    fontSize: 18,
    fontFamily: 'Inter-Light',
    fontWeight: '700',
    marginBottom: 10
  },
  itemWrap: {
    width: '100%',
    paddingVertical: 5,
    // backgroundColor:'green',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#A8A8A8'
  },
  itemText: {
    fontSize: 18
  },
  textInput: {
    backgroundColor:'#DFE1E0',
    width:'100%',
    height:50,                       
    // borderColor:'black',
    // borderWidth:2,                
    // borderRadius:20,
    justifyContent:'center', 
    paddingLeft:20,
    marginVertical:10,
  },
  upperSection: {
    // backgroundColor:'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperImageSection:{
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusBayarSection:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DFE1E0',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: windowWidth*.9
  },
  btnSave: {
    backgroundColor: 'white',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
    marginVertical: 10
  },
  photoOptionsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10
  },
  photoButton: {
    justifyContent: 'center',
    // backgroundColor:'red',
    alignItems: 'center'
  },
  img: {
      width: 50,
      height: undefined,
      aspectRatio: 1,
      // backgroundColor: 'maroon'
  },
  totalIncomeCount:{
      fontSize: 20,
      fontWeight:'700',
      fontFamily:'Inter',
      color: '#43B88E'
  },
  statusText: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 20,
  },
  pickerContainer:{
   backgroundColor:'#DFE1E0',
   width:'100%',
   height:50,                       
   justifyContent:'center', 
   paddingLeft:10,
   marginVertical:10
 },
})