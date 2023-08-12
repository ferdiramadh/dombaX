import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constant from 'expo-constants'

const AppVersion = () => {
    const { expoConfig } = Constant
    const { version } = expoConfig
    const getAppBuildNumber = (appVersion) => {
        const { android } = appVersion
        const { versionCode } = android
        return versionCode
    }
    return (
        <View style={styles.container}>
            <Text style={styles.versionText}>Version {version} ({getAppBuildNumber(expoConfig)})</Text>
        </View>
    )
}

export default AppVersion

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 60
    },
    versionText: {
        color: 'grey'
    }
})