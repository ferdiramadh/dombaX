import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileHeader from '../components/laporan/ProfileHeader'
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AppVersion from '../components/AppVersion'

const OthersScreen = () => {

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
            <ProfileHeader navigation={navigation} />
            <View style={styles.main}>
                <TouchableOpacity style={styles.contentWrapper} onPress={() => navigation.navigate('Account')}>
                    <Text style={styles.text}>Profil</Text>
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
        backgroundColor: '#FFF',
    },
    main: {
        height: '90%',
        width: '90%',
        alignItems: 'center',
        marginTop: '40%'
    },
    contentWrapper: {
        justifyContent: 'center',
        backgroundColor: '#ED9B83',
        width: '90%',
        height: 60,
        padding: 8,
        borderRadius: 10,
        marginVertical: 8,
        fontSize: 14,
        elevation: 2
    },
    text: {
        color: "#FFF"
    }
})
