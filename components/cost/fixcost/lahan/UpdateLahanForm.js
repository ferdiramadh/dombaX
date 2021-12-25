import React, {useState} from 'react'
import { StyleSheet, TouchableOpacity, View , ScrollView,Text, TextInput, Alert} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import firebase from '../../../../Firebaseconfig'


const UpdateLahanForm = ({values, modalVisible, setModalVisible}) => {


    const [ lahanData, setLahanData ] = useState(values)

    const updateItem = (item) => {
      return firebase
      .firestore()
      .collection("lahancost")
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
        initialValues={lahanData}
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
                        selectedValue={values.jenisLahan}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            setFieldValue('jenisLahan',itemValue)
                          }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Jenis Lahan'
                       
                        >
                        <Picker.Item label="Tanah" value="Tanah" />
                        <Picker.Item label="Semen" value="Semen"  />
                    </Picker>
                </View>
            <TextInput
              onChangeText={handleChange('luas')}
              onBlur={handleBlur('luas')}
              value={values.luas}
              style={styles.textInput}
              placeholder='Luas (m2)'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('lokasi')}
              onBlur={handleBlur('lokasi')}
              value={values.lokasi}
              style={styles.textInput}
              placeholder='Lokasi'
            />
            <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.statusKepemilikan}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            setFieldValue('statusKepemilikan',itemValue)
                          }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Kepemilikan'
                       
                        >
                        <Picker.Item label="Sendiri" value="Sendiri" />
                        <Picker.Item label="Sewa" value="Sewa"  />
                    </Picker>
                </View>
            <TextInput
              onChangeText={handleChange('hargaBeli')}
              onBlur={handleBlur('hargaBeli')}
              value={values.hargaBeli}
              style={styles.textInput}
              placeholder='Harga Beli'
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

export default UpdateLahanForm

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

