import { StyleSheet, Text, View,Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { MaterialIcons, Feather,AntDesign,FontAwesome } from '@expo/vector-icons';
import { PhotoContext } from '../../context/PhotoProfileContext';
import firebase from '../../Firebaseconfig'
import { pickImage, pickCamera, removeImage} from '../../utils/ImageUpload';
import { windowWidth, windowHeigth } from '../../utils/DimensionSetup'


const AccountDisplay = ({isEdit, setIsEdit,navigation}) => {
  const profileData = useSelector(state => state.profileReducer)
  const [ dwnldUrl, setDwnldUrl ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)
  const { image, setImage , testStyle} = useContext(PhotoContext)
  const [ percent, setPercent ] = useState("0%")

 
  const funcTest = (a, b, c) => {
    console.log("a adalah:" + a)
    console.log("b adalah:" + b)
    console.log("c adalah:" + c)

  }
  return (
      <View style={styles.main}>
        {isLoading?<ActivityIndicator size="small" color="orange" />: null}
        <View style={styles.upperContent}>
          <View style={{width:'100%',justifyContent:'space-around',alignItems:'flex-start',paddingLeft:10}}>
            <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.goBack()} >
              <Text style={{fontFamily:testStyle}}>Back</Text>
            </TouchableOpacity>
          </View>
          
          {/* <Image source={require('../../assets/images/emma.jpg')} style={styles.photoProfileIcon}/> */}
          {profileData.image ? <Image source={{ uri: profileData.image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={200} color="black" />}
          {/* <Button title="Select a Photo" onPress={pickImage} />
          <Button title="Pick an image from camera roll" onPress={pickCamera} /> */}
          <View style={styles.photoOptionsWrap}>
            <TouchableOpacity  onPress={() => pickCamera("Profile", profileData.id, setIsLoading, "profile", setPercent)} style={styles.photoButton}>
              <Feather name="camera" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Take A Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => removeImage("profile", profileData.id)} style={styles.photoButton}>
              <AntDesign name="delete" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Remove Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => pickImage("Profile", profileData.id, setIsLoading, "profile", setPercent)} style={styles.photoButton}>
              <FontAwesome name="file-image-o" size={24} color="lightgrey" /><Text style={{color:"grey"}}>Select A Photo</Text>
            </TouchableOpacity>
          </View>
          
          {/* <Button title="Remove Photo" onPress={() => {
            let a = null
            let b = null
            funcTest(a,b,"teset")
          }} /> */}
          {/* <View style={styles.progressBar}>
            <View style={[styles.progressPercentage, {width:percent}]}></View>
          </View> */}
          
        </View>
        
          <View style={styles.lowerContent}>
            <Text style={styles.textName}>{profileData.namaDepan} {profileData.namaBelakang}</Text>
            <Text style={styles.textCoorporateName}>{profileData.posisi} </Text>
            <Text style={styles.textCoorporateName}>{profileData.namaBisnis}</Text>
            <Text style={styles.text}>{profileData.email}</Text>
            <Text style={styles.text}>{profileData.whatsApp}</Text>
            <TouchableOpacity style={styles.btnEdit} onPress={() => {

              setIsEdit(!isEdit)
              }} >
              <Text>{isEdit?"Cancel":"Edit"}</Text>
            </TouchableOpacity>
          </View>
      </View>

  );
};

export default AccountDisplay;

const styles = StyleSheet.create({
  main: {
    
    width:'100%',
    height:windowHeigth,
    // backgroundColor:'blue',
    marginTop:'5%',
    paddingTop:30
  },
  lowerContent:{
    // backgroundColor:'yellow',
    width:'100%',
    height:windowHeigth*.5,
    marginTop:50,
    justifyContent:'center',
    alignItems:'center'
  },
  upperContent:{
    // backgroundColor:'cyan',
    width:'100%',
    height:windowHeigth*.4,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'lightgrey',
    paddingBottom:10
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
      width:200,
      height:200,
      borderRadius:100
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
    width:'80%',
    marginTop: 10
  },
  photoButton:{
    justifyContent:'center',
    // backgroundColor:'red',
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
