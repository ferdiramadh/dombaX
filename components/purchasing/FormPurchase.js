import React, {useState} from 'react'
import { StyleSheet, TextInput, View ,TouchableOpacity, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'

const FormPurchase = ({modalTransaction, setModalTransaction}) => {
    const dispatch = useDispatch();
    const transactionState = useSelector(state => state.transactionsReducer);
    const dataPurchasing = transactionState.dataPurchasing

    const [ firebaseSetup, setFirebaseSetup ] = useState({
      collection:'purchasing',
      typeReducer:'STORE_PURCHASING'
    })

    const addToFirebase = (values) => {
     
      const datas = {
        id: firebase.firestore()
        .collection(firebaseSetup.collection)
        .doc().id
    }
    let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp()}
    const newValue = Object.assign(values,addedProperties)
        const db = firebase.firestore();
        db.collection(firebaseSetup.collection)
        .doc(datas.id)
        .set(newValue)
        dispatch({type:firebaseSetup.typeReducer,results:newValue})
      
  
}
    return (
        <Formik
        initialValues={dataPurchasing}
        onSubmit={(values, actions) => {
          addToFirebase(values)
          setModalTransaction(!modalTransaction)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue}) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
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
                    onChangeText={handleChange('hargaBeli')}
                    onBlur={handleBlur('hargaBeli')}
                    value={values.hargaBeli}
                    style={styles.textInput}
                    placeholder='Harga Beli'
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={handleChange('diskon')}
                    onBlur={handleBlur('diskon')}
                    value={values.diskon}
                    style={styles.textInput}
                    placeholder='Diskon'
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={handleChange('pajak')}
                    onBlur={handleBlur('pajak')}
                    value={values.pajak}
                    style={styles.textInput}
                    placeholder='Pajak'
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={handleChange('tanggalBeli')}
                    onBlur={handleBlur('tanggalBeli')}
                    value={values.tanggalBeli}
                    style={styles.textInput}
                    placeholder='Tanggal Beli'
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
                        prompt='Status'
                        
                        >
                        <Picker.Item label="Belum Lunas" value="Belum Lunas" />
                        <Picker.Item label="Lunas" value="Lunas" />
                    </Picker>
                </View>
                <TouchableOpacity style={[styles.textInput,{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}]}>
                        <Text>Upload Bukti Beli</Text>
                        <MaterialIcons name="cloud-upload" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Simpan</Text>                  
              </TouchableOpacity>

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default FormPurchase

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
        width: '25%',
        height:40,
        backgroundColor:'lightblue',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        position:'absolute',
        borderColor:'grey',
        borderWidth:2,
        bottom:0
      },
      btnSave:{
        backgroundColor:'blue',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        borderRadius:15,
        elevation:4
      }
})

