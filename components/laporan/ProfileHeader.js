import { StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native'
import React from 'react'
import { windowHeigth } from '../../utils/DimensionSetup'
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux'

const ProfileHeader = ({navigation}) => {
  const profileData = useSelector(state => state.profileReducer)
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={windowHeigth*.09} color="black" />}
        </TouchableOpacity>
        <View style={styles.wrapperProfileText}>
            <Text style={styles.textCoorporateName}>{profileData.namaBisnis}</Text>
            <Text style={styles.textName}>Hai, {profileData.namaDepan} {profileData.namaBelakang}</Text>
        </View>
        
      </View>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:windowHeigth*.09,
        backgroundColor:'#fff',
        position:'absolute',
        top:20,
        marginTop: 10,
    },
    wrapper:{
        flexDirection: 'row',
        // backgroundColor: 'green',
        marginHorizontal: 20,
        alignItems: 'center',
        height: '100%'
    },
    photoProfileIcon:{
        width:60,
        height:60,
        borderRadius:30
    },
    wrapperProfileText: {
        marginLeft: 10
    },
    textCoorporateName:{
    fontSize: 16,
    fontWeight:'bold'
  },
    textName: {
    fontSize: 14,
    fontWeight:'500'
  }
})