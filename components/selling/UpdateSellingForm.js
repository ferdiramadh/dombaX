import React, {useState} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import firebase from '../../Firebaseconfig'


const UpdateSellingForm = ({values, modalVisible, setModalVisible}) => {


    const [ sellingData, setSellingData ] = useState(values)

    const updateItem = (item) => {
      return firebase
      .firestore()
      .collection("selling")
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
        initialValues={sellingData}
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
                    onChangeText={handleChange('produk')}
                    onBlur={handleBlur('produk')}
                    value={values.produk}
                    style={styles.textInput}
                    placeholder='Produk'
                />
                <TextInput
                    onChangeText={handleChange('deskripsi')}
                    onBlur={handleBlur('deskripsi')}
                    value={values.deskripsi}
                    style={styles.textInput}
                    placeholder='Deskripsi'
                />
                <TextInput
                    onChangeText={handleChange('kuantitas')}
                    onBlur={handleBlur('kuantitas')}
                    value={values.kuantitas}
                    style={styles.textInput}
                    placeholder='Kuantitas'
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={handleChange('hargaJual')}
                    onBlur={handleBlur('hargaJual')}
                    value={values.hargaJual}
                    style={styles.textInput}
                    placeholder='Harga Jual'
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={handleChange('diskon')}
                    onBlur={handleBlur('diskon')}
                    value={values.diskon}
                    style={styles.textInput}
                    placeholder='Diskon'
                />
                <TextInput
                    onChangeText={handleChange('pajak')}
                    onBlur={handleBlur('pajak')}
                    value={values.pajak}
                    style={styles.textInput}
                    placeholder='Pajak'
                />
                <TextInput
                    onChangeText={handleChange('batasBayar')}
                    onBlur={handleBlur('batasBayar')}
                    value={values.batasBayar}
                    style={styles.textInput}
                    placeholder='Batas Bayar'
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.status}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            setFieldValue('status',itemValue)
                          }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Tipe Pembayaran'
                        
                        >
                        <Picker.Item label="Belum Lunas" value="Belum Lunas" />
                        <Picker.Item label="Lunas" value="Lunas" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#000'}}>Update</Text>                  
              </TouchableOpacity>
          </View>

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default UpdateSellingForm

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

