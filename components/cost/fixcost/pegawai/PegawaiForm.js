import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'

const PegawaiForm = ({setFieldValue,handleChange,handleBlur, values, handleSubmit}) => {
    
    return (
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
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Simpan</Text>                  
              </TouchableOpacity>
          </View>
    )
}

export default PegawaiForm

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
