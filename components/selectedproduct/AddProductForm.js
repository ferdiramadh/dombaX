import React, { useState } from 'react';
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import SelectCategoryModal from '../InventoryComponents/GlobalEditScreen/SelectCategoryModal'

const AddProductForm = ({setFieldValue,handleChange,handleBlur, values,handleSubmit}) => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategpry] = useState("Kategori");
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
            <TextInput
              onChangeText={handleChange('namaProduk')}
              onBlur={handleBlur('namaProduk')}
              value={values.namaProduk}
              style={styles.textInput}
              placeholder='Nama Produk'
            />
            <View style={{width:'90%',flex: 1}}>
              <Text style={{color:'#474747'}}>Contoh: Ear Tag</Text>
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
            {/* <TextInput
              onChangeText={handleChange('hargaJual')}
              onBlur={handleBlur('hargaJual')}
              value={values.hargaJual}
              style={styles.textInput}
              placeholder='Harga Jual'
              keyboardType='numeric'
            /> */}
            <TextInput
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('deskripsi')}
              onBlur={handleBlur('deskripsi')}
              value={values.deskripsi}
              style={styles.textInput}
              placeholder='Deskripsi'
            />
            {/* <TextInput
              onChangeText={handleChange('kategori')}
              onBlur={handleBlur('kategori')}
              value={values.kategori}
              style={styles.textInput}
              placeholder='Kategori'
            /> */}
            <TouchableOpacity style={styles.textInput} onPress={() => setModalVisible(!modalVisible)} >
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{category}</Text>   
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>                
            </TouchableOpacity>
            <TextInput
              onChangeText={handleChange('satuan')}
              onBlur={handleBlur('satuan')}
              value={values.satuan}
              style={styles.textInput}
              placeholder='Satuan'
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
            <SelectCategoryModal modalVisible={modalVisible} setModalVisible={setModalVisible} setFieldValue={setFieldValue} />
          </View>
    )
}

export default AddProductForm

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
      marginVertical:10
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
