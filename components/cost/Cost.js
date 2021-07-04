import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import VarCostSection from './varcost/VarCostSection'
import FixCostSection from './fixcost/FixCostSection'
import TotalCost from './TotalCost'

const Cost = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.insideContainer}>

            {/* <View style={styles.emptyCostNotif}>
                <Text style={styles.text}>Biaya Kamu masih kosong, silakan tambahkan biaya.</Text>
            </View> */}
            <TotalCost />
            <VarCostSection />
            <FixCostSection />
            
            </View>
        </ScrollView>
    )
}

export default Cost

const styles = StyleSheet.create({
    container:{
        
        // justifyContent:'center',
        // alignItems:'center',
        // padding:10,
        // backgroundColor:'purple',
        width:'100%',
       
    },
    insideContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        // backgroundColor:'cyan',
        width:'100%',
       
    },
    text:{
        fontSize: 23,
        fontWeight:'500',
        textAlign:'center'
    },
    emptyCostNotif:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'50%'
    }

})
