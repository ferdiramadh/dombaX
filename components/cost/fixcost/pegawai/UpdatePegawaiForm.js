import React, {useState} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import firebase from '../../../../Firebaseconfig'


const UpdatePegawaiForm = ({values, modalVisible, setModalVisible}) => {


    const [ pegawaiData, setPegawaiData ] = useState(values)

    const updateItem = (item) => {
      return firebase
      .firestore()
      .collection("pegawaicost")
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
        initialValues={pegawaiData}
        onSubmit={(values, actions) => {  
          updateItem(values);
          updateNotification()
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>

          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
            
          <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.tipePegawai}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            setFieldValue('tipePegawai',itemValue)
                          }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Tipe Pegawai'
                       
                        >
                        <Picker.Item label="Manajerial" value="Manajerial" />
                        <Picker.Item label="Pekerja Kasar" value="Pekerja Kasar" />
                    </Picker>
                </View>
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah (orang)'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('gaji')}
              onBlur={handleBlur('gaji')}
              value={values.gaji}
              style={styles.textInput}
              placeholder='Gaji/Bulan'
              keyboardType='numeric'
            />
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Update</Text>                  
              </TouchableOpacity>
          </View>

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default UpdatePegawaiForm

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

