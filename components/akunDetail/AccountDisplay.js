import { StyleSheet, View,Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { pickImage } from '../../utils/ImageUpload'
import { windowWidth, windowHeigth } from '../../utils/DimensionSetup'
import EditAccount from './EditAccount'
import DisplayProfile from './DisplayProfile'
import CustomHeader from '../CustomHeader'

const AccountDisplay = ({navigation}) => {

  const [isEdit, setIsEdit ] = useState(false)

  const profileData = useSelector(state => state.profileReducer)
  const [ isLoading, setIsLoading ] = useState(false)

  return (
      <View style={{ flex: 1 }}>
        <View style={styles.main}>
        <CustomHeader leftSubMenu='Profil' styleFont={{fontSize:48}}/>
        <View style={styles.upperContent}>
            {isLoading?<ActivityIndicator size="small" color="orange" /> : <View>
              {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} /> : <MaterialIcons name="account-circle" size={100} color="black" />}</View>
            }
            <View style={styles.photoOptionsWrap}>
              {isLoading? null :
              <TouchableOpacity  onPress={() => pickImage("Profile", profileData.id, setIsLoading, "profile", setPercent, "image")} style={styles.photoButton}>
                <FontAwesome name="camera" size={24} color="#ED9B83"/>
              </TouchableOpacity>}
            </View>
          </View>
          <View style={styles.lowerContent}>
            { isEdit? <EditAccount navigation={navigation} profileData={profileData} isEdit={isEdit} setIsEdit={setIsEdit}/> : <DisplayProfile profileData={profileData} isEdit={isEdit} setIsEdit={setIsEdit}/> }
          </View>
        </View>
      </View>
  );
};

export default AccountDisplay;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF'
  },
  lowerContent:{
    width: '100%',  
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop: 80,
  },
  upperContent:{
    width: '100%',
    height: windowHeigth*.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  photoProfileIcon:{
      width: 100,
      height: 100,
      borderRadius: 60,
      marginTop: 160
  },
  photoOptionsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    position: 'absolute',
    bottom: -20,
    right: windowWidth/2 - 60
  },
  photoButton:{
    justifyContent: 'center',
    alignItems: 'center'
  },
});
