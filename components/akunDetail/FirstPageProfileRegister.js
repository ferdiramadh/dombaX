import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react';
import { windowWidth } from '../../utils/DimensionSetup'

const FirstPageProfileRegister = ({handleChange,handleBlur, values, errors, isValid}) => {
  return (
    <View>
            <TextInput 
                style={styles.input}
                placeholder="Nama Depan"
                onChangeText={handleChange('namaDepan')}
                onBlur={handleBlur('namaDepan')}
                value={values.namaDepan}    
                placeholderTextColor="#CBCBCB"                    
            />
            { errors.namaDepan && <Text style={{fontSize: 14, color: "red", textAlign: 'center'}}>{errors.namaDepan}</Text>}
            <TextInput 
                style={styles.input}
                placeholder="Nama Belakang"
                onChangeText={handleChange('namaBelakang')}
                onBlur={handleBlur('namaBelakang')}
                value={values.namaBelakang}    
                placeholderTextColor="#CBCBCB"  
            />
            <TextInput 
                style={styles.input}
                placeholder="No. HP"
                onChangeText={handleChange('whatsApp')}
                onBlur={handleBlur('whatsApp')}
                value={values.whatsApp}      
                keyboardType="numeric"
                placeholderTextColor="#CBCBCB"  
            />
            <TextInput 
                style={styles.input}
                placeholder="Jenis Kelamin"
                onChangeText={handleChange('jenisKelamin')}
                onBlur={handleBlur('jenisKelamin')}
                value={values.jenisKelamin}   
                placeholderTextColor="#CBCBCB"     
            />
            <TextInput 
                style={styles.input}
                placeholder="Tanggal Lahir"
                onChangeText={handleChange('tanggalLahir')}
                onBlur={handleBlur('tanggalLahir')}
                value={values.tanggalLahir}                  
                placeholderTextColor="#CBCBCB"  
            />
            <TextInput 
                style={styles.input}
                placeholder="Domisili"
                onChangeText={handleChange('domisili')}
                onBlur={handleBlur('domisili')}
                value={values.domisili}     
                placeholderTextColor="#CBCBCB"  
            />
            { errors.domisili && <Text style={{fontSize: 14, color: "red", textAlign: 'center'}}>{errors.domisili}</Text>}
        </View>
  );
};

export default FirstPageProfileRegister;

const styles = StyleSheet.create({
    input:{
        width: windowWidth * .9,
        height: 60,
        borderRadius:12,
        paddingLeft: 60,
        backgroundColor:'#F5F5F5',
        marginVertical:10,
        fontFamily: "Poppins"
    },
});
