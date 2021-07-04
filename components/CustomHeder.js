import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from 'react-redux'

const CustomHeder = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ leftOn, setLeftOn ] = useState(true);
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
            <View style={styles.headerContent}>
                <View style={[styles.leftSide]}>
                    <View style={[styles.leftSideSubMenus,props.home?{display:'none'}:null]}>
                        <TouchableOpacity style={{ marginLeft:20,}} onPress={() => {
                            setLeftOn(!leftOn)
                            props.setState(true)
                        }} disabled={props.leftSubMenu == 'Simulasi' || props.leftSubMenu == 'Laporan'?true:false}><Text style={[styles.subMenuTitle,leftOn?{borderBottomColor: '#000'}:null,props.styleFont]} >{props.leftSubMenu}</Text></TouchableOpacity>
                    </View>
                    <View style={[{width:'10%', flexDirection:'column', justifyContent:'center',alignItems:'center'},props.home?{display:'none'}:null]}>
                        <Text style={styles.pipeSeparator}>{props.leftSubMenu == 'Simulasi' || props.leftSubMenu == 'Laporan' ?'':'|'}</Text>
                    </View>

                    <View style={[styles.leftSideSubMenus]}>
                        <TouchableOpacity onPress={() => {
                            setLeftOn(!leftOn)
                            props.setState(false)
                        }}><Text style={[styles.subMenuTitle,leftOn?null:{borderBottomColor: '#000'},props.styleFont]}>{props.rightSubMenu}</Text></TouchableOpacity>
                    </View>
                </View>
               
                <View style={styles.righhtSide}>
                    <TouchableOpacity onPress={() => {
                        signOut()
                        navigation.replace("Login")
                    }}>
                        <FontAwesome name="sign-out" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <Image source={require('../assets/images/emma.jpg')} style={styles.photoProfileIcon}/>
                </View>
            </View>
        </View>
    )
}

export default CustomHeder

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:80,
        backgroundColor:'#fff',
        position:'absolute',
        top:20,
        elevation:2
    },
    headerContent:{
        flexDirection:'row',
        width:'100%',
        height:'100%'
    },
    leftSide:{
        flexDirection:'row',
        width:'70%',
        height:'100%',
    },

    leftSideSubMenus:{
        
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'flex-start',
        // backgroundColor:'blue'

    },
    pipeSeparator:{
        fontSize:40,
        fontWeight:'bold',
    },
    subMenuTitle:{
        fontSize:26,
        fontWeight:'bold',
        borderBottomColor: 'transparent', // Add this to specify bottom border color
        borderBottomWidth: 3 // Add this to specify bottom border thickness
        
    },
    righhtSide:{
       
        width:'30%',
        // flex: 1,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',

    },
    photoProfileIcon:{
        width:70,
        height:70,
        borderRadius:35
    }
})