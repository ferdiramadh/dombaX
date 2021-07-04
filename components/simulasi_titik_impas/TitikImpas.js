import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import TitikImpasComponent from './TitikImpasComponent'

const TitikImpas = () => {
    return (
        <ScrollView>
            <TitikImpasComponent firstLabel='Biaya Tetap' secondLabel='Biaya Variabel' thirdLabel='Jumlah (Ekor)' fourthLabel='Harga Jual' title='Titik Impas Rupiah' total='Rp. 375.000.000'/>
            <TitikImpasComponent firstLabel='Biaya Tetap' secondLabel='Biaya Variabel' thirdLabel='Jumlah (Ekor)' fourthLabel='Harga Jual' title='Titik Impas Unit' total='200 Ekor'/>
        </ScrollView>
    )
}

export default TitikImpas

const styles = StyleSheet.create({})
