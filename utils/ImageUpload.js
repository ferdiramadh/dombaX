import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../Firebaseconfig'
import React, { useContext, useEffect } from 'react';

export const storeImgData = async (image) => {
    try {
      // const jsonValue = JSON.stringify(image);
      await AsyncStorage.setItem('@img_Key', image);
      console.log('data telah disimpan')
    } catch (e) {
      // saving error
      console.log('data GAGAL disimpan!')
    }
  }

 export const getData = async (setFunc) => {
    try {
      const value = await AsyncStorage.getItem('@img_Key')
      // const data = JSON.parse(value)
      
      if(value !== null) {
        setFunc(value);
        console.log('datanya adalah'+value);
        
      } else {
        
       console.log('kosong nih')
      }
      
    } catch(e) {
      console.log('error baca nih');
      console.log(e)
    }
  }

  export const removeImage = async (setFunc) => {
    try {
      setFunc(null);
      await AsyncStorage.removeItem('@img_Key')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }



  export const pickCamera = async (setFunc) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    });

    console.log(result);

    

    if (!result.cancelled) {
      // setImage(result.uri);
      setFunc(result.uri);
      
      
    }
  };
  
  

  export const pickImage = async (setFunc) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    });

    console.log(result);

    if (!result.cancelled) {
        setFunc(result.uri);
    }
  };
  

  export const uploadImage = async (image) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref('Test Images/Images/' + new Date().toISOString())
    const snapshot = ref.put(blob)

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED),
    snapshot => {
            console.log("Sukses")
            console.log(snapshot)
            console.log("snapshot" + snapshot.state)
            console.log("PROGRES" + snapshot.bytesTransferred/snapshot.totalBytes * 100)
  
            // if(snapshot.state === firebase.storage.TaskEvent.SUCCESS){
            //   console.log("Sukses")
            // }
          },
    error => {
      // unsubscribe()
      console.log("error wak" + error)
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL()
      .then((downloadUrl) => {
        console.log("File available at" + downloadUrl)
      })
    }
 
  }


  // const uploadImage = async () => {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function() {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function() {
  //       reject(new TypeError('Network request failed'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', image, true);
  //     xhr.send(null);
  //   });

  //   const ref = firebase.storage().ref().child(new Date().toISOString())
  //   const snapshot = ref.put(blob)

  //   snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED),
  //   snapshot => {
  //           console.log("Sukses")
  //           console.log(snapshot)
  //           console.log("snapshot" + snapshot.state)
  //           console.log("PROGRES" + snapshot.bytesTransferred/snapshot.totalBytes * 100)
  
  //           // if(snapshot.state === firebase.storage.TaskEvent.SUCCESS){
  //           //   console.log("Sukses")
  //           // }
  //         },
  //   error => {
  //     // unsubscribe()
  //     console.log("error wak" + error)
  //   },
  //   () => {
  //     snapshot.snapshot.ref.getDownloadURL()
  //     .then((downloadUrl) => {
  //       console.log("File available at" + downloadUrl)
  //     })
  //   }
 
  //   // if(image != null) {
  //   //   const fileExtension = image.split('.').pop();
  //   //   console.log("FILE EXT:" + fileExtension)

  //   //   var imgId = "1"
  //   //   const fileName = `${imgId}.${fileExtension}`
  //   //   console.log(fileName)

  //   //   var storageRef = firebase.storage().ref.child(`food/images/${fileName}`)
  //   //   storageRef.put(image)
  //   //   .on(
  //   //     firebase.storage.TaskEvent.STATE_CHANGED,
  //   //     snapshot => {
  //   //       console.log("Sukses")
  //   //       console.log(snapshot)
  //   //       // console.log("snapshot" + snapshot.state)
  //   //       // console.log("PROGRES" + snapshot.bytesTransferred/snapshot.totalBytes * 100)

  //   //       // if(snapshot.state === firebase.storage.TaskEvent.SUCCESS){
  //   //       //   console.log("Sukses")
  //   //       // }
  //   //     },
  //   //     error => {
  //   //       unsubscribe()
  //   //       console.log("error wak" + error)
  //   //     },
  //   //     () => {
  //   //       storageRef.getDownloadURL()
  //   //       .then((downloadUrl) => {
  //   //         console.log("File available at" + downloadUrl)
  //   //       })
  //   //     }
  //   //   )
  //   // }
  // }