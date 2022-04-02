import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import { Feather, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase from '../../Firebaseconfig'
import { pickImageOnly, uploadImageProduk } from '../../utils/ImageUpload'

const FeedProductDetail = ({ editData, navigation }) => {

  const [data, setData] = useState(editData)
  const [isUpdate, setIsUpdate] = useState(false)
  const [ tempImg, setTempImg ] = useState(false)

  const removePhoto = (set) => {
    set('image','')
  }
  const updateItem = (item) => {
    return firebase
    .firestore()
    .collection("userproduk")
    .doc(item.id)
    .update(item).then(() => {
      uploadImageProduk(item.image, "UserProduk", item.id, "userproduk")
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
                  navigation.navigate("Inventory")
                }
            }
        ],
    )
    
    
}
  if (editData) {

    return (
      <Formik
        initialValues={data}
        onSubmit={(values, actions) => {
          updateItem(values);
          
          updateNotification()

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
          <ScrollView style={styles.container}>
            <View style={styles.upperSection}>
              <Text style={styles.titlePage}>Pakan</Text>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
                // editItem(item)
                setIsUpdate(!isUpdate)
                setTempImg(false)
              }}>
                {isUpdate ? <MaterialIcons name="cancel" size={24} color="black" /> : <Feather name="edit" size={24} color="black" />}
              </TouchableOpacity>
            </View>

            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Jenis Pakan</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('nama')}
                onBlur={handleBlur('nama')}
                value={values.nama}
                style={styles.textInput}
                placeholder='Jenis Pakan'
              /> : <Text style={styles.itemText}>{data.nama}</Text>}

            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Produsen</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('merk')}
                onBlur={handleBlur('merk')}
                value={values.merk}
                style={styles.textInput}
                placeholder='Produsen'
              /> : <Text style={styles.itemText}>{data.merk}</Text>}

            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Kadaluarsa</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('kadaluarsa')}
                onBlur={handleBlur('kadaluarsa')}
                value={values.kadaluarsa}
                style={styles.textInput}
                placeholder='Kadaluarsa'
              /> : <Text style={styles.itemText}>{data.kadaluarsa}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Harga Beli</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('hargaBeli')}
                onBlur={handleBlur('hargaBeli')}
                value={values.hargaBeli}
                style={styles.textInput}
                placeholder='Harga Beli'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.hargaBeli}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
                value={values.jumlah}
                style={styles.textInput}
                placeholder='Jumlah'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.jumlah} {data.satuan}</Text>}
            </View>
            <Text style={styles.subTitle}>Total</Text>
            <Text style={styles.itemText}>Rp. 12,000</Text>
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
            </View>

          </ScrollView>)}
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

export default FeedProductDetail

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titlePage: {
    fontSize: 24,
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
    alignItems: 'center'

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
})