import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import EditAccount from '../components/akunDetail/EditAccount';
import AccountDisplay from '../components/akunDetail/AccountDisplay';
import {useSelector} from 'react-redux'

const AccountScreen = () => {
    const [isEdit, setIsEdit ] = useState(false)
    const [editData, setEditData] = useState({});
    const profileData = useSelector(state => state.profileReducer)


  return (
    <View style={styles.container}>
        {/* <TouchableOpacity style={styles.btnEdit} onPress={() => {

            setIsEdit(!isEdit)
        }} >
            <Text>{isEdit?"Cancel":"Edit"}</Text>
        </TouchableOpacity> */}
        {
            isEdit?<EditAccount isEdit={isEdit} setIsEdit={setIsEdit} editData={editData}/> : <AccountDisplay isEdit={isEdit} setIsEdit={setIsEdit}/>
        }
        
      
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
        // backgroundColor:'red',  
        
    }
});
