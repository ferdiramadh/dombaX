import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import SellingItem from './SellingItem'
import { MaterialIcons } from '@expo/vector-icons';

const SellingSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.downloadInvoiceSection}>
                <Text style={styles.downloadInvoiceText}>Download Semua Invoice (.PDF)</Text>
                <TouchableOpacity>
                    <MaterialIcons name="cloud-download" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <SellingItem />
        </View>
    )
}

export default SellingSection

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        width:'100%',
        flexDirection:'column',
        marginBottom:15,
        borderBottomColor:'lightgrey',
        borderBottomWidth: 2
    },
    downloadInvoiceSection:{
        flexDirection:'row',
        alignSelf:'flex-end',
        paddingHorizontal:10
    },
    downloadInvoiceText:{
        fontSize: 16,
        fontWeight:'700',
        marginBottom:10,
        textAlign:'right',
        marginRight:10
    }
})
