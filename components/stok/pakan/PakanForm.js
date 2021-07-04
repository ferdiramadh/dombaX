import React from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity, Text } from 'react-native'


const PakanForm = ({selectedShipCategory,setSelectedShipCategory,handleChange,handleBlur, values,handleSubmit}) => {
    
    return (
          <View style={{width:'100%',flex: 1, justifyContent:'center',alignItems:'center', marginBottom:10}}>
            <TextInput
              onChangeText={handleChange('jenisPakan')}
              onBlur={handleBlur('jenisPakan')}
              value={values.jenisPakan}
              style={styles.textInput}
              placeholder='Jenis Pakan'
            />
            <View style={{width:'100%',height:'100%', backgroundColor:'transparent', flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TextInput
              onChangeText={handleChange('merk')}
              onBlur={handleBlur('merk')}
              value={values.merk}
              style={styles.textInput}
              placeholder='Nama/Merk'
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
              onChangeText={handleChange('jumlah')}
              onBlur={handleBlur('jumlah')}
              value={values.jumlah}
              style={styles.textInput}
              placeholder='Jumlah (kg)'
              keyboardType='numeric'
            />
            <TextInput
              onChangeText={handleChange('kadaluarsa')}
              onBlur={handleBlur('kadaluarsa')}
              value={values.kadaluarsa}
              style={styles.textInput}
              placeholder='Kadaluarsa'
            />
            <TextInput
              onChangeText={handleChange('petunjuk')}
              onBlur={handleBlur('petunjuk')}
              value={values.petunjuk}
              style={[styles.textInput,{height:100,paddingVertical:5}]}
              placeholder='Petunjuk Penggunaan/Deskripsi'
              multiline={true}
            />
            <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'white'}}>Simpan</Text>                  
              </TouchableOpacity>
            </View>
          </View>
    )
}

export default PakanForm

const styles = StyleSheet.create({
    container:{
    width:'100%',
    flexDirection:'column',
    marginBottom:15,
    borderBottomColor:'lightgrey',
    borderBottomWidth: 2
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
