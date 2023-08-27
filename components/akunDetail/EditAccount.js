import { StyleSheet, View, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import AccountDetailForm from './AccountDetailForm'
import firebase from '../../Firebaseconfig'

const EditAccount = ({ profileData, isEdit, setIsEdit, setEnableShift}) => {
    
    
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
          updateItem(values)
          updateNotification()
          setIsEdit(!isEdit)
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
     
        <View style={styles.container}>
          <AccountDetailForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setEnableShift={setEnableShift}/>
        </View>
      
    )}
    </Formik>
  )
}

export default EditAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
})
