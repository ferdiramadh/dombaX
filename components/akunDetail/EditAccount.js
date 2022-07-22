import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import AccountDetailForm from './AccountDetailForm';
import {useSelector} from 'react-redux'
import firebase from '../../Firebaseconfig'

const EditAccount = ({navigation}) => {
    
    const profileData = useSelector(state => state.profileReducer)
    
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
          `Profil Telah Dirubah`,
          
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
     
        <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
          <AccountDetailForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>
        </View>
      
    )}
    </Formik>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
    container:{
      width:'100%',
      flexDirection:'column',
      marginVertical:'10%',
    },

    main: {
        backgroundColor:'blue',
        height:'90%',
        width:'90%',
        alignItems:'center',
        marginTop:'40%'
    },
});
