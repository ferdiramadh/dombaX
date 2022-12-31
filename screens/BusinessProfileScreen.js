import { StyleSheet, View,Image, ActivityIndicator, Alert, TextInput, TouchableOpacity, Text} from 'react-native';
import React, { useState} from 'react'
import {useSelector} from 'react-redux'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import firebase from '../Firebaseconfig'
import DisplayBusinessProfile from '../components/akunDetail/DisplayBusinessProfile';
import { pickImage } from '../utils/ImageUpload';
import { windowWidth, windowHeigth } from '../utils/DimensionSetup';

const BusinessProfileScreen = () => {
   
    const profileData = useSelector(state => state.profileReducer)
    const [ isLoading, setIsLoading ] = useState(false)
    console.log({profileData})
    const [isEdit, setIsEdit ] = useState(false)
    const [ percent, setPercent ] = useState("0%")
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
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
            <View style={styles.container}>
              <View style={styles.upperContent}>
                {isLoading?<ActivityIndicator size="small" color="orange" />: <View>
                  {profileData.imageBisnis ? <Image source={{ uri: profileData.imageBisnis }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={100} color="black" />}</View>
                }
                <View style={styles.photoOptionsWrap}>
                  {isLoading?null:
                  <TouchableOpacity  onPress={() => pickImage("Profile", profileData.id, setIsLoading, "profile", setPercent, "imageBisnis")} style={styles.photoButton}>
                    <FontAwesome name="camera" size={24} color="#ED9B83"/>
                  </TouchableOpacity>}
                </View>
              </View>
                  { isEdit? 
                    <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
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
                    </View>: <DisplayBusinessProfile profileData={profileData} isEdit={isEdit} setIsEdit={setIsEdit} />}
                    <TouchableOpacity style={styles.btnSave} onPress={() => {
                      if(isEdit) {
                        handleSubmit()
                        setIsEdit(!isEdit)
                      } else {
                        setIsEdit(!isEdit)
                      }
                    }}>
                        <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'white'}}>{isEdit? 'Simpan': 'Ubah'}</Text>                  
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
      width:100,
      height:100,
      borderRadius:60
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
      photoOptionsWrap: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical: 10,
        position: 'absolute',
        bottom: 30,
        right: windowWidth/2 - 60
    },
    photoButton:{
      justifyContent:'center',
      alignItems:'center'
    },
    upperContent:{
      width:'100%',
      height:windowHeigth*.2,
      justifyContent:'center',
      alignItems:'center',
      position: 'relative'
    },
})