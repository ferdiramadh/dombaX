import { StyleSheet, Text, View, Image, TouchableOpacity , TextInput,BackHandler,Alert, ActivityIndicator} from 'react-native'
import React from 'react';

const FirstPageProfileRegister = ({handleChange,handleBlur, values, errors, isValid}) => {
  return (
    <View>
            <TextInput 
                style={styles.input}
                placeholder="Nama Depan"
                onChangeText={handleChange('namaDepan')}
                onBlur={handleBlur('namaDepan')}
                value={values.namaDepan}                        
            />
            { errors.namaDepan && <Text style={{fontSize: 14, color: "red"}}>{errors.namaDepan}</Text>}
            <TextInput 
                style={styles.input}
                placeholder="Nama Belakang"
                onChangeText={handleChange('namaBelakang')}
                onBlur={handleBlur('namaBelakang')}
                value={values.namaBelakang}    
            />
            <TextInput 
                style={styles.input}
                placeholder="WhatsApp"
                onChangeText={handleChange('whatsApp')}
                onBlur={handleBlur('whatsApp')}
                value={values.whatsApp}      
            />
            <TextInput 
                style={styles.input}
                placeholder="Domisili"
                onChangeText={handleChange('domisili')}
                onBlur={handleBlur('domisili')}
                value={values.domisili}     
            />
            { errors.domisili && <Text style={{fontSize: 14, color: "red"}}>{errors.domisili}</Text>}
            <TextInput 
                style={styles.input}
                placeholder="Tanggal Lahir"
                onChangeText={handleChange('tanggalLahir')}
                onBlur={handleBlur('tanggalLahir')}
                value={values.tanggalLahir}                  
                
            />
        </View>
  );
};

export default FirstPageProfileRegister;

const styles = StyleSheet.create({
    input:{
        width: 181,
        height: 40,
        borderColor:'black',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        backgroundColor:'white',
        marginVertical:10
    },
});
