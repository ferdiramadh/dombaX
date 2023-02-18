import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import ProfileHeader from '../components/laporan/ProfileHeader';
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';



const OthersScreen = () => {

    const navigation = useNavigation();
    // console.log(navigation.getState())

    
    const dispatch = useDispatch();
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            dispatch({type:'DELETE_PROFILE_DATA'})
            dispatch({type:'SIGN_OUT_CLEAR_DATA'})
            dispatch({type:'LOGOUT'})
            console.log('Sign Out nih')
          }).catch((error) => {
            // An error happened.
            alert("Error.", error.message)
          });
    }
    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }
  return (
    <View style={styles.container}>
        <ProfileHeader navigation={navigation}/>
        <View style={styles.main}>
            <TouchableOpacity style={styles.contentWrapper} onPress={() => navigation.navigate('Account')}>
                <Text style={styles.text}>Profil</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.contentWrapper} onPress={() => navigation.navigate('BusinessProfile')}>
                <Text style={styles.text}>Profil Bisnis</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.contentWrapper} onPress={() => null}>
                <Text style={styles.text}>Bantuan</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.contentWrapper} onPress={() => {
                clearAll()
                signOut()
                navigation.replace("Login")
            }}>
                <Text style={styles.text}>Keluar</Text>
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
        backgroundColor:'#FFF',  
    },
    main: {
        // backgroundColor:'blue',
        height:'90%',
        width:'90%',
        alignItems:'center',
        marginTop:'40%'
    },
    contentWrapper:{
        justifyContent:'center',
        backgroundColor:'#ED9B83',
        width:'90%',
        height:60,
        padding:8,
        borderRadius:10,
        marginVertical: 8,
        fontSize:14,
        elevation: 2
    },
    text: {
        color: "#FFF"
    }
});
