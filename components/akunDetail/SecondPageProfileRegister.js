import { StyleSheet, Text, View, Image, TouchableOpacity , TextInput,BackHandler,Alert, ActivityIndicator} from 'react-native'
import React from 'react';

const SecondPageProfileRegister = ({handleChange,handleBlur, values}) => {
  return (
    <View>
            <TextInput 
                style={styles.input}
                placeholder="Posisi Anda Sebagai"
                onChangeText={handleChange('posisi')}
                onBlur={handleBlur('posisi')}
                value={values.posisi}      
            />
            <TextInput 
                style={styles.input}
                placeholder="Nama Bisnis"
                onChangeText={handleChange('namaBisnis')}
                onBlur={handleBlur('namaBisnis')}
                value={values.namaBisnis}     
            />
            <TextInput 
                style={styles.input}
                placeholder="Jumlah Domba"
                onChangeText={handleChange('jumlahDomba')}
                onBlur={handleBlur('jumlahDomba')}
                value={values.jumlahDomba} 
    
            />
            <TextInput 
                style={styles.input}
                placeholder="Omzet/Bulan"
                onChangeText={handleChange('omzet')}
                onBlur={handleBlur('omzet')}
                value={values.omzet} 
  
            />
            <TextInput 
                style={styles.input}
                placeholder="Dapat Info Dari"
                onChangeText={handleChange('dapatInfo')}
                onBlur={handleBlur('dapatInfo')}
                value={values.dapatInfo}       
            />
        </View>
  );
};

export default SecondPageProfileRegister;

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
