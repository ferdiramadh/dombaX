import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import { ActivityIndicator, LogBox, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from '@expo-google-fonts/inter'
import { CustomFonts } from '../utils/CustomFonts'

SplashScreen.preventAutoHideAsync()

LogBox.ignoreAllLogs()

const Routes = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [isSignIn, setIsSignIn] = useState(false)
    const [fontsLoaded] = useFonts(CustomFonts)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value) {
                setIsSignIn(true)
            }
        } catch (e) {
            alert("error", e.message)
        }
    }
    useEffect(() => {
        getData()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)


    }, [])
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync()
        }
        prepare()
    }, [])
    if (!fontsLoaded) {
        return null
    } else {
        SplashScreen.hideAsync()
    }
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <AuthStack isSignIn={isSignIn} />
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
export default Routes
