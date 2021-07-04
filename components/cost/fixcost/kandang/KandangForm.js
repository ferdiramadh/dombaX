import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'

const KandangForm = ({setFieldValue,handleChange,handleBlur, values, handleSubmit}) => {
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.tipeKandang}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                          setFieldValue('tipeKandang',itemValue)
                        }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Tipe Kandang'
                       
                        >
                        <Picker.Item label="Koloni" value="Koloni" />
                        <Picker.Item label="Satuan" value="Satuan" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.bahanKandang}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                          setFieldValue('bahanKandang',itemValue)
                        }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Bahan Kandang'
                       
                        >
                        <Picker.Item label="Kayu" value="Kayu" />
                        <Picker.Item label="Bambu" value="Bambu"  />
                        <Picker.Item label="Baja Ringan" value="Baja Ringan" />
                    </Picker>
                </View>
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('luas')}
              onBlur={handleBlur('luas')}
              value={values.luas}
              style={styles.textInput}
              placeholder='Luas'
              keyboardType='numeric'
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
                        <Picker.Item label="Sewa" value="Sewa" />
                    </Picker>
                </View>
            <TextInput
              onChangeText={handleChange('biayaBuat')}
              onBlur={handleBlur('biayaBuat')}
              value={values.biayaBuat}
              style={styles.textInput}
              placeholder='Biaya Buat'
              keyboardType='numeric'
            />
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Simpan</Text>                  
              </TouchableOpacity>
          </View>
    )
}

export default KandangForm

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
