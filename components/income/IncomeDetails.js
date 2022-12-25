import { StyleSheet, Text, View, ScrollView, Image,  TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import { MaterialIcons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase from '../../Firebaseconfig'
import { pickImageOnly, uploadImageProduk } from '../../utils/ImageUpload'
import { formatTotalToCurrency, formatToCurrencyLight } from '../../utils/FormatCurrency';
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import DateTimePicker from '@react-native-community/datetimepicker';
import SellingDetail from './selling/SellingDetail';
import CapitalDetail from './capital/CapitalDetail';
import CreditDetail from './credit/CreditDetail';
import GrantDetail from './grant/GrantDetail';
import LoanDetail from './loan/LoanDetail';
import { onChangeNew } from '../../utils/DatePickerUtil';

const IncomeDetails = ({ editData, navigation, isUpdate, setIsUpdate }) => {

    const purchaseCategoryIcon = 
    {
        penjualan: require('../../assets/images/purchasingcategory/Sell.png'),
        modal: require('../../assets/images/purchasingcategory/Request_Money.png'),
        hibah: require('../../assets/images/purchasingcategory/Gift.png'),
        pinjam: require('../../assets/images/purchasingcategory/Lend.png'),
        piutang: require('../../assets/images/purchasingcategory/Piutang.png'),
        
    }

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [ isBatasBayar, setIsBatasBayar ] = useState(false)

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [data, setData] = useState(editData)
  
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
      uploadImageProduk(item.image, "Income", item.id, "income", "image")
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
                onChange={!isBatasBayar?(event, selectedDate) => onChangeNew(event, selectedDate, setShow, setFieldValue):(event, selectedDate) => {
                  if(selectedDate){
                    const currentDate = selectedDate;
                    setShow(false);
                    setFieldValue('batasBayar', selectedDate.toDateString())
                    setIsBatasBayar(false)
                } else {
                    console.log("eweuh")
                    setShow(false);
                    setIsBatasBayar(false)
                }   
                }}
              />
            )}
          <View style={[styles.container, isUpdate? {height: windowHeigth*.8, marginTop:windowHeigth*.03}: {height: windowHeigth*.35}]}>
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
                {data.kategori == 'Penjualan'?<Image source={purchaseCategoryIcon.penjualan} style={styles.img} resizeMode='contain'/>: null  }
                {data.kategori == 'Penambahan Modal'?<Image source={purchaseCategoryIcon.modal} style={styles.img} resizeMode='contain'/>: null  }
                {data.kategori == 'Hibah'?<Image source={purchaseCategoryIcon.hibah} style={styles.img} resizeMode='contain'/>: null  }
                {data.kategori == 'Pinjaman'?<Image source={purchaseCategoryIcon.pinjam} style={styles.img} resizeMode='contain'/>: null  }     
                {data.kategori == 'Piutang'?<Image source={purchaseCategoryIcon.piutang} style={styles.img} resizeMode='contain'/>: null  }  
              <Text style={styles.totalIncomeCount}>{formatTotalToCurrency(parseInt(data.jumlah), '#43B88E')}</Text>
            </View> : null}
            <ScrollView style={styles.containerScroll}>      
            {data.kategori == 'Penjualan'?<SellingDetail data={data} isUpdate={isUpdate} showDatepicker={showDatepicker} values={values} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} isBatasBayar={isBatasBayar} setIsBatasBayar={setIsBatasBayar}/> : null  }  
            {data.kategori == 'Penambahan Modal'?<CapitalDetail data={data} isUpdate={isUpdate} showDatepicker={showDatepicker} values={values} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/> : null  }  
            {data.kategori == 'Piutang'?<CreditDetail data={data} isUpdate={isUpdate} showDatepicker={showDatepicker} values={values} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/> : null  }  
            {data.kategori == 'Hibah'?<GrantDetail data={data} isUpdate={isUpdate} showDatepicker={showDatepicker} values={values} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/> : null  }  
            {data.kategori == 'Pinjaman'?<LoanDetail data={data} isUpdate={isUpdate} showDatepicker={showDatepicker} values={values} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue}/> : null  }  
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
                  pickImageOnly(isTrue, setFieldValue, 'image')
                  
                }} style={styles.photoButton}>
                  <FontAwesome name="file-image-o" size={24} color="lightgrey" /><Text style={{ color: "grey" }}>Select A Photo</Text>
                </TouchableOpacity>
              </View> : null}
              {isUpdate?<TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
                if (values.jumlahProduk == '' || values.jumlahProduk == "0" || values.hargaJual == "" || values.hargaJual == '0' && data.kategori == "Penjualan") {
                  Alert.alert(
                    "Perhatian!",
                    `Jumlah dan Harga Jual Harus Lebih Dari 0!`)
                }else if(values.jumlah == '' || values.jumlah == '0' && data.kategori !== 'Penjualan') {
                  Alert.alert(
                    "Perhatian!",
                    `Jumlah Harus Lebih Dari 0!`)
                } else if( data.kategori == "Penjualan" ) {
                  setFieldValue('jumlah', (parseInt(values.jumlahProduk) * parseInt(values.hargaJual)).toString())
                  handleSubmit() } 
                  else {
                  handleSubmit()
                }
              }}>
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color: '#FFF' }}>Update</Text>
              </TouchableOpacity>:null}
            </View>
            </ScrollView>
            </View>
            { data.statusBayar !== 'status' && data.statusBayar && !isUpdate ? 
            <View style={styles.statusBayarSection}>
            <Text style={[styles.statusText, data.statusBayar == 'Lunas'?{color:'#43B88E'}:{color:'#EB3223'}]}>{data.statusBayar == 'Lunas'?'Lunas': 'Belum Lunas'}</Text>
            </View>: null}
                        
            { data.image && data.image !== '' && !isUpdate ?<Image source={{ uri: values.image }} resizeMode="cover" style={{ width: windowWidth*.7, height: windowHeigth*.2, }} />:null}
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

export default IncomeDetails

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#DFE1E0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    width: windowWidth*.9,  
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
    width: windowWidth*.9,
    marginBottom: 10
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