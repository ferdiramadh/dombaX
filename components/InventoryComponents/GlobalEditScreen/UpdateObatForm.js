import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import firebase from '../../../Firebaseconfig';


const UpdateObatForm = ({values, modalVisible, setModalVisible}) => {

    const [ dombaData, setDombaData ] = useState(values)

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
        {({ handleChange, handleBlur, handleSubmit, values }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
                <TextInput
              onChangeText={handleChange('namaObat')}
              onBlur={handleBlur('namaObat')}
              value={values.namaObat}
              style={styles.textInput}
              placeholder='Nama Obat dan Vitamin'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Probiotik</Text>
            </View>
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('merk')}
              onBlur={handleBlur('merk')}
              value={values.merk}
              style={styles.textInput}
              placeholder='Produsen'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Healthy Animal</Text>
            </View>
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
              onChangeText={handleChange('kadaluarsa')}
              onBlur={handleBlur('kadaluarsa')}
              value={values.kadaluarsa}
              style={styles.textInput}
              placeholder='Kadaluarsa'
            />
            <TouchableOpacity style={[styles.btnSave,{backgroundColor:'#ED9B83'}]} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Update</Text>                  
              </TouchableOpacity>
            </View>
          </View>

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default UpdateObatForm

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

