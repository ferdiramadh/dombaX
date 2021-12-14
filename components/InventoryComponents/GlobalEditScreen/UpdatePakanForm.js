import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import {useSelector, useDispatch} from 'react-redux'
import {Picker} from '@react-native-picker/picker'
import firebase from '../../../Firebaseconfig';


const UpdatePakanForm = ({values, modalVisible, setModalVisible}) => {

    

    const [selectedProduct, setSelectedProduct] = useState();

    const [ dombaData, setDombaData ] = useState(values)

    const updateItem = (item) => {
      return firebase
      .firestore()
      .collection("pakanstok")
      .doc(item.id)
      .update(item).then(() => {
        console.log('Item Updated')
      }).catch((error) => console.log(error))
    }

    const updateNotification = () => {
      Alert.alert(
          "Confirmation",
          `Item has been updated`,
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
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
                <TextInput
              onChangeText={handleChange('jenisPakan')}
              onBlur={handleBlur('jenisPakan')}
              value={values.jenisPakan}
              style={styles.textInput}
              placeholder='Jenis Pakan'
            />
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('merk')}
              onBlur={handleBlur('merk')}
              value={values.merk}
              style={styles.textInput}
              placeholder='Nama/Merk'
            />
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
              placeholder='Jumlah (kg)'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('kadaluarsa')}
              onBlur={handleBlur('kadaluarsa')}
              value={values.kadaluarsa}
              style={styles.textInput}
              placeholder='Kadaluarsa'
            />
            <TextInput
              onChangeText={handleChange('petunjuk')}
              onBlur={handleBlur('petunjuk')}
              value={values.petunjuk}
              style={[styles.textInput,{height:100,paddingVertical:5}]}
              placeholder='Petunjuk Penggunaan/Deskripsi'
              multiline={true}
            />
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Update</Text>                  
              </TouchableOpacity>
            </View>
          </View>

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default UpdatePakanForm

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
        backgroundColor:'white',
        width:'60%',
        height:50,                       
        borderColor:'black',
        borderWidth:2,                
        borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10
      },
      textInput:{
        backgroundColor:'white',
        width:'60%',
        height:50,                       
        borderColor:'black',
        borderWidth:2,                
        borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10
      },
      btnSave:{
        backgroundColor:'white',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        borderRadius:15,
        elevation:4
      }
})

