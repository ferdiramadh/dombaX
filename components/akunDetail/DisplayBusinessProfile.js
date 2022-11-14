import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../../utils/DimensionSetup'

export default function DisplayBusinessProfile({ profileData, isEdit, setIsEdit }) {

  return (
    <View style={styles.container}>
    
      <View style={{width:'100%',alignItems:'center', }}>
            {profileData.namaBisnis? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.namaBisnis}</Text>
            </View> : null }
            {profileData.posisi? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.posisi}</Text>
            </View> : null }
            {profileData.noHpBisnis? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.noHpBisnis}</Text>
            </View> : null }
            {profileData.alamatBisnis? 
            <View style={styles.wrapper}>
                <Text style={styles.text}>{profileData.alamatBisnis}</Text>
            </View> : null }
        </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width:windowWidth, 
       
    },   
    wrapper:{
        justifyContent:'center',
        backgroundColor:'#ED9B83',
        width:'90%',
        height:60,
        padding:8,
        color: "#FFF",
        borderRadius:10,
        marginVertical: 8,
        fontSize:14,
        elevation: 2
    },
    text: {
        fontSize:14,
        color: "#FFF",
    }
})