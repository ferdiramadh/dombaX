import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'

const LahanForm = ({setFieldValue,handleChange,handleBlur, values, handleSubmit}) => {
    
    return (
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
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Simpan</Text>                  
              </TouchableOpacity>
          </View>
    )
}

export default LahanForm

const styles = StyleSheet.create({
    container:{
    width:'100%',
    flexDirection:'column',
    marginBottom:15,
    borderBottomColor:'lightgrey',
    borderBottomWidth: 2
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
      backgroundColor:'blue',
      width:'60%',
      height:40,                       
      justifyContent:'center',
      borderRadius:15,
      elevation:4
    }
})
