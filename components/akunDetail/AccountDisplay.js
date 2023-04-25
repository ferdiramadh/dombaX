import { StyleSheet, View,Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import {useSelector} from 'react-redux'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { PhotoContext } from '../../context/PhotoProfileContext';
import { pickImage } from '../../utils/ImageUpload';
import { windowWidth, windowHeigth } from '../../utils/DimensionSetup'
import EditAccount from './EditAccount';
import DisplayProfile from './DisplayProfile';
import CustomHeader from '../CustomHeader';

const AccountDisplay = ({navigation}) => {

  const [isEdit, setIsEdit ] = useState(false)

  const profileData = useSelector(state => state.profileReducer)
  const [ dwnldUrl, setDwnldUrl ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)
  const { image, setImage , testStyle} = useContext(PhotoContext)
  const [ percent, setPercent ] = useState("0%")

  return (
      <ScrollView>
      <View style={styles.main}>
      <CustomHeader leftSubMenu='Profil' styleFont={{fontSize:48}}/>
        <View style={styles.upperContent}>
        {isLoading?<ActivityIndicator size="small" color="orange" />: <View>
          {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={100} color="black" />}</View>
        }
          <View style={styles.photoOptionsWrap}>
             {isLoading?null:
            <TouchableOpacity  onPress={() => pickImage("Profile", profileData.id, setIsLoading, "profile", setPercent, "image")} style={styles.photoButton}>
              <FontAwesome name="camera" size={24} color="#ED9B83"/>
            </TouchableOpacity>}
          </View>

          
        </View>
        
          <View style={styles.lowerContent}>
            { isEdit? <EditAccount navigation={navigation} profileData={profileData} isEdit={isEdit} setIsEdit={setIsEdit}/>: <DisplayProfile profileData={profileData} isEdit={isEdit} setIsEdit={setIsEdit}/>}
          </View>
      </View>
      </ScrollView>
  );
};

export default AccountDisplay;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width:'100%',
    backgroundColor: '#FFF'
  },
  lowerContent:{
    width:'100%',  
    justifyContent:'center',
    alignItems:'center',  
    backgroundColor: '#FFF',
    marginTop: 80
  },
  upperContent:{
    width:'100%',
    height:windowHeigth*.2,
    justifyContent:'center',
    alignItems:'center',
    position: 'relative'
  },
  textName:{
    fontSize: 28,
    fontWeight:'500'
  },
  textCoorporateName:{
    fontSize: 30,
    fontWeight:'bold'
  },
  text:{
    fontSize: 20,
   
  },
  photoProfileIcon:{
      width:100,
      height:100,
      borderRadius:60,
      marginTop: 160
  },
  btnEdit:{
      height: 40,
      width: '15%',
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      borderWidth:2,
      marginTop:5
      
  },
  photoOptionsWrap: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical: 10,
    position: 'absolute',
    bottom: -20,
    right: windowWidth/2 - 60
  },
  photoButton:{
    justifyContent:'center',
    alignItems:'center'
  },
  progressBar: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    marginTop: 10
  },
  progressPercentage:{
    height: '100%',
    // width: '50%',
    backgroundColor: 'yellow'
  }
});
