import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AppVersion from '../components/AppVersion'
import { MaterialIcons } from '@expo/vector-icons'

const OthersScreen = () => {

    const profileData = useSelector(state => state.profileReducer)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'DELETE_PROFILE_DATA' })
            dispatch({ type: 'SIGN_OUT_CLEAR_DATA' })
            dispatch({ type: 'LOGOUT' })
            console.log('Sign Out nih')
        }).catch((error) => {
            alert("Error.", error.message)
        })
    }
    const clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.upperContent}>
                {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} /> : <MaterialIcons name="account-circle" size={100} color="black" />}
                <Text style={styles.textName}>{profileData.namaDepan} {profileData.namaBelakang}</Text>
            </View>
            <View style={styles.main}>
                <TouchableOpacity style={styles.contentWrapper} onPress={() => navigation.navigate('Account')}>
                    <Text style={styles.text}>Profil Saya</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentWrapper} onPress={() => {
                    clearAll()
                    signOut()
                    navigation.replace("Login")
                }}>
                    <Text style={styles.text}>Keluar</Text>
                </TouchableOpacity>
                <AppVersion />
            </View>
        </View>
    )
}

export default OthersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    main: {
        height: '90%',
        width: '90%',
        alignItems: 'center'
    },
    contentWrapper: {
        justifyContent: 'center',
        backgroundColor: '#ED9B83',
        width: '90%',
        height: 60,
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
        fontSize: 14,
        elevation: 2
    },
    text: {
        color: "#FFF",
        fontFamily: 'Quicksand',
        fontSize: 16
    },
    upperContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 250
    },
    photoProfileIcon: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
    textName: {
        fontSize: 16,
        fontFamily: 'Quicksand',
        color: '#000',
        marginTop: 10
    }
})
