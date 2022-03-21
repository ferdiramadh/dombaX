import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import firebase from '../../Firebaseconfig';
import { MaterialIcons } from '@expo/vector-icons'
import UpdateSelectCategoryModal from '../InventoryComponents/GlobalEditScreen/UpdateSelectCategoryModal'

const UpdateUserProductForm = ({values, modalVisible, setModalVisible}) => {

    const [ dombaData, setDombaData ] = useState(values)
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [category, setCategory] = useState("Kategori");

    const updateItem = (item) => {
      return firebase
      .firestore()
      .collection("userproduk")
      .doc(item.id)
      .update(item).then(() => {
        console.log('Item Updated')
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
                    setModalVisible(!modalVisible)   
                  }
              }
          ],
      )
      
      
  }

    return (
        <Formik
        initialValues={dombaData}
        onSubmit={(values, actions) => {  
          updateItem(values);
          updateNotification()
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
            <TextInput
              onChangeText={handleChange('namaProduk')}
              onBlur={handleBlur('namaProduk')}
              value={values.namaProduk}
              style={styles.textInput}
              placeholder='Nama Produk'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Ear Tag</Text>
            </View>
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('hargaBeli')}
              onBlur={handleBlur('hargaBeli')}
              value={values.hargaBeli}
              style={styles.textInput}
              placeholder='Harga Beli'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('deskripsi')}
              onBlur={handleBlur('deskripsi')}
              value={values.deskripsi}
              style={styles.textInput}
              placeholder='Deskripsi'
            />
            {/* <TextInput
              onChangeText={handleChange('kategori')}
              onBlur={handleBlur('kategori')}
              value={values.kategori}
              style={styles.textInput}
              placeholder='Kategori'
            /> */}
            <TouchableOpacity style={styles.textInput} onPress={() => setModalCategoryVisible(!modalCategoryVisible)} >
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.kategori}</Text>   
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>                
            </TouchableOpacity>
            <TextInput
              onChangeText={handleChange('satuan')}
              onBlur={handleBlur('satuan')}
              value={values.satuan}
              style={styles.textInput}
              placeholder='Satuan'
            />
            <TouchableOpacity style={[styles.btnSave,{backgroundColor:'#ED9B83'}]} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Update</Text>                  
              </TouchableOpacity>
            </View>
          </View>
          
          </View>
          <UpdateSelectCategoryModal modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />
          </ScrollView>
        )}
      </Formik>
    )
}

export default UpdateUserProductForm

const styles = StyleSheet.create({
    container:{
    width:'100%',
    flexDirection:'column',
    marginVertical:'10%',
    // backgroundColor:'green'
    
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
  paddingLeft:20,
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
})

