import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const PDFTemplate = () => {
    const localFile = '../assets/pdftemplate.html'
    return (
        <WebView
        
        originWhitelist={['*']}
        source={{html:localFile}} 
        style={{ marginTop: 20 }}
      />
    )
}

export default PDFTemplate

const styles = StyleSheet.create({})
