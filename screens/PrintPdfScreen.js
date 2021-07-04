import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import * as Print from 'expo-print';
import { useSelector } from 'react-redux'
import PDFTemplate from '../components/PDFTemplate'

const PrintPdfScreen = () => {
    const globalState = useSelector(state => state.stokReducer)
    const listDomba = globalState.listDomba
    const imageIcon = {uri:'../assets/Lahan.png'}
    const createPDF = async() => {

        let filePath = await Print.printToFileAsync({
          html: "<h1>PDF TEST</h1>",
          width : 612,
          height : 792,
          base64 : false
        });
    
        alert('PDF Generated', filePath.uri);
      }

    return (
        <View style={styles.container}>
            <Text>Test PDF</Text>
            <Button title='test PDF Print' onPress={
                () => {
                    Print.printAsync(
                        {
                            
                            html:`<!DOCTYPE html>
                            <html>
                            <head>
                                <title></title>
                            </head>
                            <body>
                                <header style="border-bottom: solid;border-width: .2rem;display: inline-block;">
                                    <img src="data:image/jpeg;base64,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" style="width: 500px;height: 500px">
                                    <h1>Gembul</h1>
                                </header>
                                
                            </body>
                            </html>`
                            
                        }
                    )
                    // Print.printToFileAsync(options={
                    
                    //         html:`<html><h1>Hello</h1><h1 style="color:red">List Domba:${listDomba.length}</h1></html>`
                            
                    // }
                    // )
                }
            }/>
            <Button title='Test Log' onPress={() => console.log(imageIcon) } />
            <Button title='createPDF' onPress={createPDF} />
        </View>
    )
}

export default PrintPdfScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
