import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { windowWidth } from '../../utils/DimensionSetup'

const SecondPageProfileRegister = ({ handleChange, handleBlur, values }) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Nama Bisnis"
                onChangeText={handleChange('namaBisnis')}
                onBlur={handleBlur('namaBisnis')}
                value={values.namaBisnis}
            />
            <TextInput
                style={styles.input}
                placeholder="Posisi Sebagai"
                onChangeText={handleChange('posisi')}
                onBlur={handleBlur('posisi')}
                value={values.posisi}
            />
            <TextInput
                style={styles.input}
                placeholder="Jenis Hewan Ternak"
                onChangeText={handleChange('jenisHewanTernak')}
                onBlur={handleBlur('jenisHewanTernak')}
                value={values.jenisHewanTernak}

            />
            <Text style={styles.exampleText}>Contoh: Domba</Text>
            <TextInput
                style={styles.input}
                placeholder="Lokasi Bisnis"
                onChangeText={handleChange('lokasiBisnis')}
                onBlur={handleBlur('lokasiBisnis')}
                value={values.lokasiBisnis}

            />
            <TextInput
                style={styles.input}
                placeholder="Tahu Gembul Dari"
                onChangeText={handleChange('dapatInfo')}
                onBlur={handleBlur('dapatInfo')}
                value={values.dapatInfo}
            />
        </View>
    )
}

export default SecondPageProfileRegister

const styles = StyleSheet.create({
    input: {
        width: windowWidth * .9,
        height: 60,
        borderRadius: 12,
        paddingLeft: 60,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
        fontFamily: "Quicksand-SemiBold"
    },
    exampleText: { 
        fontFamily: 'Quicksand-SemiBold', 
        color: '#ED9B83', 
        marginLeft: 60 
    }
})
