import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { windowWidth } from '../../utils/DimensionSetup'

const LaporanComponent = (props) => {
    const [isLoading,setIsLoading ] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },1000)
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
                {isLoading ? <ActivityIndicator size="small" color="orange" />:
                <View>
                    <Text style={styles.upTitle}>{props.title1}</Text>
                    <Text style={styles.saldoText}>{props.saldo}</Text>
                </View>     }
            </View>
            <View style={styles.sectionContainer}>
            {isLoading ? <ActivityIndicator size="small" color="orange" />:
                <View>
                    <Text style={styles.upTitle}>{props.title2 == false ?"Rugi":"Untung"}</Text>
                    <Text style={[styles.saldoText,props.title2 == false ?{color:'red'}:{color:'#0EFA33'}]}>{props.profit}</Text>
                </View>}
            </View>
        </View>
        
    )
}

export default LaporanComponent

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: windowWidth,
        paddingHorizontal:'5%'
    },
    sectionContainer:{
        
        height:'35%',
        backgroundColor:'white',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
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
