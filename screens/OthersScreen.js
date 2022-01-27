import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomHeder from '../components/CustomHeder';
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'

const OthersScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.profileReducer)
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            dispatch({type:'SIGN_OUT_CLEAR_DATA'})
            dispatch({type:'LOGOUT'})
            console.log('Sign Out nih')
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    }
  return (
    <View style={styles.container}>
        <CustomHeder descProfile={profileData.namaBisnis} styleFont={{fontSize:24}}/>
        <View style={styles.main}>
            <TouchableOpacity style={styles.contentWrapper} onPress={() => navigation.navigate('Account')}>
                <Text>Detail Akun</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentWrapper} onPress={() => {
                signOut()
                navigation.replace("Login")
            }}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default OthersScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',  
    },
    main: {
        // backgroundColor:'blue',
        height:'90%',
        width:'90%',
        alignItems:'center',
        marginTop:'40%'
    },
    contentWrapper:{
        alignItems:'flex-start',
        justifyContent:'center',
        // backgroundColor:'yellow',
        width:'90%',
        height:'10%',
        padding:8,
        borderWidth:2,
        borderRadius:10,
        borderColor:'grey',
        marginVertical: 8
    }
});
