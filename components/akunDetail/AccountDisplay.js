import { StyleSheet, Text, View,Image, TouchableOpacity,Button } from 'react-native';
import React, { useContext } from 'react';
import {useSelector} from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { PhotoContext } from '../../context/PhotoProfileContext';

const AccountDisplay = ({isEdit, setIsEdit}) => {
  const profileData = useSelector(state => state.profileReducer)
  
  const { image,setImage } = useContext(PhotoContext)
  
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
      <View style={styles.main}>

        <View style={styles.upperContent}>
          {/* <Image source={require('../../assets/images/emma.jpg')} style={styles.photoProfileIcon}/> */}
          {image ? <Image source={{ uri: image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={250} color="black" />}
          <Button title="Pick an image from camera roll" onPress={pickImage} />

          {/* <Button title="Check Image Uri" onPress={() => console.log(test)} /> */}
            
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
    height:'100%',
    // backgroundColor:'blue',
    marginTop:20
  },
  lowerContent:{
    // backgroundColor:'yellow',
    width:'100%',
   
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  upperContent:{
    backgroundColor:'cyan',
    width:'100%',
    height:'30%',
    justifyContent:'center',
    alignItems:'center'
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
      
  }
});
