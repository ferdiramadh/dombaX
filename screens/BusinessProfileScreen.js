import { StyleSheet, View,Image, ActivityIndicator, Alert, TextInput, TouchableOpacity, Text} from 'react-native';
import React, { useState} from 'react'
import {useSelector} from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import firebase from '../Firebaseconfig'
import { useNavigation } from '@react-navigation/native';

const BusinessProfileScreen = () => {
    const navigation = useNavigation();
    const profileData = useSelector(state => state.profileReducer)
    const [ isLoading, setIsLoading ] = useState(false)

    const updateItem = (item) => {
        return firebase
        .firestore()
        .collection("profile")
        .doc(item.id)
        .update(item).then(() => {
          console.log('Item Updated')
        }).catch((error) => console.log(error))
      }
  
      const updateNotification = () => {
        Alert.alert(
            "Konfirmasi",
            `Profil Bisnis Telah Dirubah`,
            
        )
        
        
    }
  return (
    <Formik
        initialValues={profileData}
        onSubmit={(values, actions) => {  
          updateItem(values);
          updateNotification()
          navigation.goBack()
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
            <View style={styles.container}>
            {isLoading?<ActivityIndicator size="small" color="orange" />: <View>
                {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={200} color="black" />}</View>
            }
                    <TextInput
                    style={styles.textInput}
                    placeholder='Nama Bisnis'
                    placeholderTextColor="#fff" 
                    onChangeText={handleChange('namaBisnis')}
                    onBlur={handleBlur('namaBisnis')}
                    value={values.namaBisnis}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Posisi Sebagai'
                    placeholderTextColor="#fff" 
                    onChangeText={handleChange('posisi')}
                    onBlur={handleBlur('posisi')}
                    value={values.posisi}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder='No. HP Bisnis'
                    placeholderTextColor="#fff" 
                    onChangeText={handleChange('noHpBisnis')}
                    onBlur={handleBlur('noHpBisnis')}
                    value={values.noHpBisnis}
                    keyboardType='numeric'
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Alamat Bisnis'
                    placeholderTextColor="#fff" 
                    onChangeText={handleChange('alamatBisnis')}
                    onBlur={handleBlur('alamatBisnis')}
                    value={values.alamatBisnis}
                    />

                    <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                        <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'white'}}>Simpan</Text>                  
                    </TouchableOpacity>
            </View>)}
    </Formik>
  )
}

export default BusinessProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
    },
    photoProfileIcon:{
        width:120,
        height:120,
        borderRadius:60,
        marginVertical: 10
    }, 
    textInput:{
        justifyContent:'center',
        backgroundColor:'#ED9B83',
        width:'90%',
        height:60,
        padding:8,
        color: "#FFF",
        borderRadius:10,
        marginVertical: 8,
        fontSize:14,
        elevation: 2
    },
    btnSave:{
        backgroundColor:'#ED9B83',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        elevation: 2,
        borderRadius:10,
        marginTop: 10,  
        marginBottom: 20
      },
})