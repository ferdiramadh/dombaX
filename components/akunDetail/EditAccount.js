import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import AccountDetailForm from './AccountDetailForm';
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'

const EditAccount = ({isEdit, setIsEdit}) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
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
          "Confirmation",
          `Item has been updated`,
          
      )
      
      
  }


    
  return (
    <Formik
        initialValues={profileData}
        onSubmit={(values, actions) => {  
          updateItem(values);
          updateNotification()
          setIsEdit(!isEdit)
      
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'100%', justifyContent:'center',alignItems:'center',paddingBottom:20}}>
          <AccountDetailForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} isEdit={isEdit} setIsEdit={setIsEdit}/>
        </View>
      </ScrollView>
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
