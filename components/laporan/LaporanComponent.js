import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LaporanComponent = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.upTitle}>{props.title}</Text>
            <Text style={[styles.saldoText,props.title == 'Rugi'?{color:'red'}:null]}>{props.saldo}</Text>
        </View>
    )
}

export default LaporanComponent

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:'35%',
        backgroundColor:'white',
        borderRadius:20,
        shadowColor: 'red',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
        borderColor:'#ED9B83',
        borderWidth:2,
        flexDirection:'column',
        justifyContent:'center',
        padding:20,
        marginVertical:10,
    },
    upTitle:{
        fontSize: 24,
        fontWeight:'bold',
        color:'#ED9B83'
    },
    saldoText:{
        fontSize: 26,
        fontWeight:'bold',
        color:'#000'
    }
})
