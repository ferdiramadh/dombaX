import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import Profit from '../components/simulasiprofit/Profit'
import TitikImpas from '../components/simulasi_titik_impas/TitikImpas'

const SimulationScreen = () => {
    const [ profit, setProfit ] = useState(true);
    return (
        <View style={styles.container}>
            <CustomHeader leftSubMenu='Simulasi'/>
            <View style={styles.subTitleChoices}>
                <TouchableOpacity style={styles.subTitleOptions} onPress={() => setProfit(true)}>
                    <Text style={[styles.textOptions, profit?{borderBottomColor:'#000'}:null]}>Profit</Text>
                </TouchableOpacity>
                <View style={styles.subTitleOptions}>
                    <Text style={{fontSize:26,color:'#000'}}>|</Text>
                </View>
                <TouchableOpacity style={styles.subTitleOptions} onPress={() => setProfit(false)}>
                    <Text style={[styles.textOptions, profit ?null:{borderBottomColor:'#000'}]}>Titik Impas</Text>
                </TouchableOpacity>
                {/* <Text style={styles.textOptions}>Profit</Text>
                <Text style={styles.textOptions}>Titik Impas</Text> */}
            </View>
            {profit? <Profit />: <TitikImpas />}
            
            <View style={styles.bottomBorder}></View>
        </View>
    )
}

export default SimulationScreen

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
       
    },
    subTitleChoices:{
        flexDirection:'row', 
        // backgroundColor:'blue',
        width:'100%',
        height:50,
        marginTop:100,
        paddingLeft:20,
        marginBottom:20

    },
    subTitleOptions:{
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'flex-start',
        marginRight:5,
        
    },
    textOptions:{
        fontSize:18,
        color:'#000',
        fontWeight:'bold',
        textAlign:'center',
        borderBottomColor: 'transparent', // Add this to specify bottom border color
        borderBottomWidth: 3 // Add this to specify bottom border thickness
        
    },
    bottomBorder:{
        marginBottom:90,
        backgroundColor:'blue',
        width:'100%'
    }
})

