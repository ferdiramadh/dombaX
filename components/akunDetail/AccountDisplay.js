import { StyleSheet, Text, View,Image, TouchableOpacity, Button, ActivityIndicator, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { MaterialIcons, Feather,AntDesign,FontAwesome } from '@expo/vector-icons';
import { PhotoContext } from '../../context/PhotoProfileContext';
import { pickImage, pickCamera, removeImage} from '../../utils/ImageUpload';
import { windowWidth, windowHeigth } from '../../utils/DimensionSetup'
import EditAccount from './EditAccount';
import DisplayProfile from './DisplayProfile';


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
     
        <View style={styles.upperContent}>
        {isLoading?<ActivityIndicator size="small" color="orange" />: <View>
          {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={100} color="black" />}</View>
        }
          <View style={styles.photoOptionsWrap}>
            {/* <TouchableOpacity  onPress={() => pickCamera("Profile", profileData.id, setIsLoading, "profile", setPercent)} style={styles.photoButton}>
              <Feather name="camera" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Take A Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => removeImage("profile", profileData.id)} style={styles.photoButton}>
              <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Remove Photo</Text>
            </TouchableOpacity> */}
             {isLoading?null:
            <TouchableOpacity  onPress={() => pickImage("Profile", profileData.id, setIsLoading, "profile", setPercent)} style={styles.photoButton}>
              <FontAwesome name="camera" size={24} color="#ED9B83"/>
              {/* <Text style={{color:"grey"}}>Select A Photo</Text> */}
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
  
    
  },
  lowerContent:{
    width:'100%',  
    justifyContent:'center',
    alignItems:'center',  
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
      borderRadius:60
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
    bottom: 30,
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
