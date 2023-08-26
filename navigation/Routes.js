import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import { ActivityIndicator, LogBox, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts, Inter_400Regular, Inter_300Light, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter'
import {
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2'

SplashScreen.preventAutoHideAsync()

LogBox.ignoreAllLogs()

const Routes = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [isSignIn, setIsSignIn] = useState(false)
    let customFonts = {
        'Baloo': require('../assets/font/baloo/Baloo.ttf'),
        'Baloo-Medium' : Baloo2_500Medium,
        'Baloo-SemiBold' : Baloo2_600SemiBold,
        'Baloo-Bold' : Baloo2_700Bold,
        'Baloo-ExtraBold' : Baloo2_800ExtraBold,
        'Inter-Light': Inter_300Light,
        'Inter': Inter_400Regular,
        'Inter-SemiBold': Inter_600SemiBold,
        'Inter-Bold': Inter_800ExtraBold,
        'Poppins': require('../assets/font/poppins/Poppins-Medium.ttf'),
        'PoppinsBold': require('../assets/font/poppins/Poppins-Bold.ttf'),
    }
    const [fontsLoaded] = useFonts(customFonts)
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
