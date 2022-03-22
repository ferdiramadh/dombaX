import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons';

const DombaForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit}) => {
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10, }}>
            <TextInput
              onChangeText={handleChange('nama')}
              onBlur={handleBlur('nama')}
              value={values.nama}
              style={styles.textInput}
              placeholder='Jenis Hewan Ternak'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Domba</Text>
            </View>
            <TextInput
              onChangeText={handleChange('jenisSpesifik')}
              onBlur={handleBlur('jenisSpesifik')}
              value={values.jenisSpesifik}
              style={styles.textInput}
              placeholder='Jenis Spesifik'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Garut</Text>
            </View>
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
              onChangeText={handleChange('deskripsi')}
              onBlur={handleBlur('deskripsi')}
              value={values.deskripsi}
              style={styles.textInput}
              placeholder='Deskripsi'
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
                        selectedValue={values.kategoriHewanTernak}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                          setFieldValue('kategoriHewanTernak',itemValue)
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
            <TouchableOpacity style={styles.textInput} onPress={() => null}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>Upload Gambar</Text>   
                    <MaterialIcons name="file-upload" size={24} color="black" />      
                </View>                
            </TouchableOpacity>
            <View style={styles.btnWrap}>
              <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Batal</Text>                  
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSave,{backgroundColor:'#ED9B83'}]} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Simpan</Text>                  
              </TouchableOpacity>
            </View>
            
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
    btnWrap:{
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%',
      paddingHorizontal: 10
    }
})
