import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../../utils/DimensionSetup'
import { MaterialIcons } from '@expo/vector-icons'

export default function DisplayProfile({ profileData, isEdit, setIsEdit }) {
    
  const [ isShowPass, setIsShowPass ] = useState(false)

  return (    
        <View style={styles.container}>
            {profileData.namaDepan? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.namaDepan}</Text>
            </View> : null }
            {profileData.namaBelakang ? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.namaBelakang}</Text>
            </View> : null }
            {profileData.whatsApp? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.whatsApp}</Text>
            </View> : null }
            {profileData.email? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.email}</Text>
            </View> : null }
            {profileData.jenisKelamin? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.jenisKelamin}</Text>
            </View> : null }
            {profileData.tanggalLahir? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.tanggalLahir.slice(4)}</Text>
            </View> : null }
            {profileData.domisili? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.domisili}</Text>
            </View> : null}
            {profileData.password? 
            <View style={[styles.wrapper, {position:'relative'}]}>
                <TextInput 
                    style={{color:'#FFF'}}
                    secureTextEntry={!isShowPass}
                    value={profileData.password}
                    editable={false}
                />
                <TouchableOpacity style={styles.eyePass} onPress={() => setIsShowPass(!isShowPass)}>
                    { isShowPass? <MaterialIcons name="cancel" size={24} color="#FFF" />:
                    <MaterialIcons name="remove-red-eye" size={24} color="#FFF" />}
                </TouchableOpacity>
            </View> : null}
            <TouchableOpacity style={styles.btnSave} onPress={() => setIsEdit(!isEdit)}>
                <Text style={styles.txtUbah}>UBAH</Text>                  
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth, 
        alignItems: 'center',
        height: '100%',
    },   
    wrapper: {
        justifyContent: 'center',
        width: '90%',
        height: 40,
        padding: 8,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        color: "#000",
    },
    btnSave: {
      backgroundColor: '#ED9B83',
      width: windowWidth * .9,
      height: 60,                     
      justifyContent: 'center',
      elevation: 2,
      borderRadius: 10, 
      position: 'absolute',
      bottom: 30,
    },
    eyePass: {
        position: 'absolute',
        right: 10
    },
    txtUbah: {
        fontSize: 18, 
        fontWeight: '700', 
        textAlign: 'center',
        color: '#FFF'
    }
})