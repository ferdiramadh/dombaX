import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'

const DombaForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit}) => {
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
            <TextInput
              onChangeText={handleChange('jenisDomba')}
              onBlur={handleBlur('jenisDomba')}
              value={values.jenisDomba}
              style={styles.textInput}
              placeholder='Jenis Domba'
            />
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
              onChangeText={handleChange('hargaJual')}
              onBlur={handleBlur('hargaJual')}
              value={values.hargaJual}
              style={styles.textInput}
              placeholder='Harga Jual'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('usia')}
              onBlur={handleBlur('usia')}
              value={values.usia}
              style={styles.textInput}
              placeholder='Usia'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('berat')}
              onBlur={handleBlur('berat')}
              value={values.berat}
              style={styles.textInput}
              placeholder='Berat'
              keyboardType='numeric'
            />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={values.kategori}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                          setFieldValue('kategori',itemValue)
                        }
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Kategori'
                        
                        >
                        <Picker.Item label="Penggemukan" value="Penggemukan" />
                        <Picker.Item label="Breeding" value="Breeding"  />
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
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Simpan</Text>                  
              </TouchableOpacity>
            </View>
          </View>
    )
}

export default DombaForm

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
      backgroundColor:'white',
      width:'60%',
      height:40,                       
      justifyContent:'center',
      borderRadius:15,
      elevation:4
    }
})
