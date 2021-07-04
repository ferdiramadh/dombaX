import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

const TitikImpasComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.subtitle}>
                <Text style={styles.textTitle}>{props.title}</Text>
            </View>
            <View style={styles.firstRow}>
                <View style={styles.firstCol}>
                    <Text>{props.firstLabel}</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.firstCol}>
                    <Text>{props.secondLabel}</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
            <View style={styles.firstRow}>
                <View style={styles.firstCol}>
                    <Text>{props.thirdLabel}</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.firstCol}>
                    <Text>{props.fourthLabel}</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
            <View style={styles.totalRow}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Simulasikan</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.totalRow}>
                <Text style={styles.textTotal}>{props.total}</Text>
            </View>
        </View>
    )
}

export default TitikImpasComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        // backgroundColor:'yellow',
        width:'100%',
        borderBottomWidth:2,
        marginBottom:30,
        borderColor:'grey',
    },
    subtitle:{
        flexDirection:'row',
        // backgroundColor:'blue',
        paddingHorizontal:20
    },
    textTitle:{
        fontSize:18,
        fontWeight:'bold',
        borderBottomColor:'#000',
        borderBottomWidth:2,
        
    },
    firstRow:{
        flexDirection:'row',
        // backgroundColor:'purple'
    },
    firstCol:{
        width:'50%',
        flexDirection:'column',
        // backgroundColor:'grey',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    input:{
        width:'80%',
        height:40,
        borderWidth:2,
        borderColor:'#ED9B83',
        borderRadius:10,
        marginTop:10,
        padding:10
    },
    totalRow:{
        flexDirection:'column',
        // height:50,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    textTotal:{
        fontSize: 22,
        fontWeight:'bold',
        color: '#0EFA33'
    },
    btn:{
        width:'40%',
        backgroundColor:'#ED9B83',
        height:40,
        borderWidth:2,
        borderColor:'#000',
        borderRadius:10,
        marginTop:30,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'700'
    }
})
