import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { pickImageOnly } from '../../utils/ImageUpload';
import { windowWidth, windowHeigth } from '../../utils/DimensionSetup'

const PhotoSectionOnboarding = ({title, value, setFieldValue,field}) => {
  return (
    <View style={styles.upperContent}>
        <Text style={styles.title}>{title}</Text>
        <View>
            <View>  
            {value? <Image source={{ uri: value }} style={styles.photoProfileIcon} />: <MaterialIcons name="account-circle" size={100} color="black" /> }
            </View>
        </View>
        <View style={styles.photoOptionsWrap}>
            <TouchableOpacity onPress={() => pickImageOnly(true, setFieldValue, field)} style={styles.photoButton}>
                <FontAwesome name="camera" size={24} color="#ED9B83"/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PhotoSectionOnboarding

const styles = StyleSheet.create({
    upperContent:{
        width:'100%',
        height:windowHeigth*.2,
        justifyContent:'center',
        alignItems:'center',
        position: 'relative',
        padding: 20
      },
      title:{
        alignSelf: 'flex-start',
        fontSize: 24,
        fontFamily: 'Baloo'
      },
      photoOptionsWrap: {
        flexDirection:'row',
        justifyContent:'space-around',
       
        marginVertical: 10,
        position: 'absolute',
        bottom: 30,
        right: windowWidth/2 - 55
      },
      photoButton:{
        justifyContent:'center',
        alignItems:'center'
      },
      photoProfileIcon:{
          width:100,
          height:100,
          borderRadius:60
      },
})