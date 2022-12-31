import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../Firebaseconfig'

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

  export const removeImage = async (collection, id) => {
    if(id){
      return firebase
      .firestore()
      .collection(collection)
      .doc(id)
      .update({
        "image": ""
      }).then(() => {
        console.log('Item Updated')
      }).catch((error) => console.log(error))
    } else {
      console.log("tidak ada yeuh")
    }
  }

  export const deleteCollection = (collection, item) => {
    return firebase
    .firestore()
    .collection(collection)
    .doc(item.id)
    .delete()
}

  export const deleteFile = (collection, item) => {
    if(item.image) {
        var desertRef = firebase.storage().ref(`${collection}/Images/${item.id}`)
        // Delete the file
        desertRef.delete().then(() => {
            console.log("Dihapus file")
        }).catch((error) => {
            console.log("Error loh" + error)
        });
    }     
}

  export const pickImage = async (storageFolder, id, setLoad, collection, setPercent, field) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    });

    console.log(result);

    if (!result.canceled) {
      uploadImage(result.assets[0].uri, storageFolder, id, setLoad, collection, setPercent, field);
    }
  };

  export const pickImageOnly = async (isUpdate, setFunc, field) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    });

    // console.log(result);

    if (!result.canceled && isUpdate) {
      setFunc(field, result.assets[0].uri);
      // console.log(result.assets[0].uri);
    }

    if (!result.canceled) {
      setFunc(result.assets[0].uri);
    }
  };

  export const updateImageDoc = (collection, itemId, downloadUrl, field) => {
    const item =  { [field] : downloadUrl}
    if(downloadUrl){
      return firebase
      .firestore()
      .collection(collection)
      .doc(itemId)
      .update(item).then(() => {
        console.log('Item Updated')
      }).catch((error) => console.log(error))
    } else {
      console.log("tidak ada yeuh")
    }
  }

  
  export const uploadImage = async (image, storageFolder, id, setLoad, collection, setPercent, field) => {
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

    const ref = firebase.storage().ref(`${storageFolder}/Images/${id}`)
    const snapshot = ref.put(blob)

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
            let progress = snapshot.bytesTransferred/snapshot.totalBytes * 100
            setLoad(true)
            console.log("Sukses")
            console.log(snapshot)
            console.log("snapshot" + snapshot.state)
            console.log("PROGRES" + progress)
            // console.log((snapshot.bytesTransferred/snapshot.totalBytes * 100).toString + "%")
            setPercent(progress.toString() + "%")
            if(snapshot.state === firebase.storage.TaskEvent.SUCCESS){
              console.log("Sukses")
            }
          },
    (error) => {
      // unsubscribe()
      setLoad(false)
      console.log("error wak" + error)
      blob.close()
      return
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL()
      .then((downloadUrl) => {
        console.log("File available at" + downloadUrl)
        updateImageDoc(collection, id, downloadUrl, field)
        // setFunc(downloadUrl)
        setLoad(false)
        blob.close()
        return downloadUrl
      })
    }
    )
  }

  export const uploadImageProduk = async (image, storageFolder, id, collection, field) => {
    

    if(image) {
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

    const ref = firebase.storage().ref(`${storageFolder}/Images/${id}`)
    const snapshot = ref.put(blob)
    
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
            let progress = snapshot.bytesTransferred/snapshot.totalBytes * 100
            
            console.log("Sukses")
            console.log(snapshot)
            console.log("snapshot" + snapshot.state)
            console.log("PROGRES" + progress)
            // console.log((snapshot.bytesTransferred/snapshot.totalBytes * 100).toString + "%")
           
            if(snapshot.state === firebase.storage.TaskEvent.SUCCESS){
              console.log("Sukses")
            }
          },
    (error) => {
      // unsubscribe()
      
      console.log("error wak" + error)
      blob.close()
      return
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL()
      .then((downloadUrl) => {
        console.log("File available at" + downloadUrl)
        updateImageDoc(collection, id, downloadUrl, field)
        // setFunc(downloadUrl)
        
        blob.close()
        return downloadUrl
      })
    }
    )} else {
      let tempObj = {
        id: id,
        image: 'test_hapus'
      }
      console.log("Hapuslah nih file")
      deleteFile(storageFolder, tempObj)
    }
  }