import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const AccountDetailForm = ({ handleChange, handleBlur, handleSubmit, values,isEdit, setIsEdit }) => {
  return (
    <View style={{width:'100%', justifyContent:'center',alignItems:'center',paddingTop:40}}>
      <TouchableOpacity style={styles.btnEdit} onPress={() => {

      setIsEdit(!isEdit)
      }} >
      <Text>{isEdit?"Cancel":"Edit"}</Text>
      </TouchableOpacity>

      
        <TextInput
          style={styles.textInput}
          placeholder='Nama Depan...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaDepan')}
          onBlur={handleBlur('namaDepan')}
          value={values.namaDepan}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Nama Belakang...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaBelakang')}
          onBlur={handleBlur('namaBelakang')}
          value={values.namaBelakang}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Posisi Sebagai...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('posisi')}
          onBlur={handleBlur('posisi')}
          value={values.posisi}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Nama Bisnis...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('namaBisnis')}
          onBlur={handleBlur('namaBisnis')}
          value={values.namaBisnis}
          maxLength={23}
        />
        <TextInput
          style={styles.textInput}
          placeholder='WhatsApp...'
          placeholderTextColor="#fff" 
          onChangeText={handleChange('whatsApp')}
          onBlur={handleBlur('whatsApp')}
          value={values.whatsApp}
          keyboardType='numeric'
        />
      
         <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'white'}}>Simpan</Text>                  
        </TouchableOpacity>

    </View>
  );
};

export default AccountDetailForm;

const styles = StyleSheet.create({
    textInput:{
        alignItems:'flex-start',
          justifyContent:'center',
          backgroundColor:'#ED9B83',
          width:'90%',
          height:60,
          padding:8,
          borderWidth:2,
          borderRadius:10,
          marginVertical: 8,
          fontSize:16
      },
      btnSave:{
        backgroundColor:'#ED9B83',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        borderWidth:2,
        borderRadius:10,
        marginTop: 10,  
      },
      btnEdit:{
          height: 40,
          width: '15%',
          backgroundColor:'white',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:5,
          borderWidth:2,
          left: 20,
          position:'absolute',
          top:0
          
      }
});
