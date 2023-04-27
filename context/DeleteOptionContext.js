import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import { deleteCollection, deleteFile } from '../utils/ImageUpload';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export const DeleteOptionContext = createContext()

const DeleteOptionProvider = (props) => {
    const [ deleteOpt, setDeleteOpt ] = useState({
        allDelete: false,
        isDeleted: false,
        deletedList: [],
        selectDelete: false
      })
      function deleteAllList(dataList) {
        if(!deleteOpt.allDelete || (deleteOpt.allDelete && deleteOpt.deletedList.length <= 0))
        setDeleteOpt(prev =>   
          ( {
            ...prev, 
            deletedList: dataList, 
            allDelete: true
          })
        )
        if(deleteOpt.allDelete || (dataList.length == deleteOpt.deletedList.length))
        setDeleteOpt(prev =>   
          ( {
            ...prev, 
            deletedList: [], 
            allDelete: false
          })
        )
      }
      function cancelDelete () {
        console.log(deleteOpt.deletedList.length)
        setDeleteOpt({
          allDelete: false,
          isDeleted: false,
          deletedList: [],
          selectDelete: false
        })
      }
      const deleteCollectionAndFile = (item, collection, storageCollection) => {
        deleteCollection(collection, item)
        deleteFile(storageCollection, item)
    }
  
      function selectOrDeleteItems(collection, storageCollection) {
        if(deleteOpt.deletedList.length > 0) {
          Alert.alert(
            "Perhatian!",
            `Anda Yakin Hapus Item?`,
              [
      
                  {
                      text: "YA",
                      onPress: () => {   
                          for(let i=0; i < deleteOpt.deletedList.length; i++) {
                          let item = deleteOpt.deletedList[i]
                          deleteCollectionAndFile(item, collection, storageCollection)
                          let filterDeletedItem = deleteOpt.deletedList.filter(x => x.id != item.id)
                          setDeleteOpt(prev => ({...prev, deletedList: filterDeletedItem}))
                          // setDeleteOpt(prev => ({...prev, selectDelete: false, allDelete: false}))
                          Alert.alert("Perhatian!", `${deleteOpt.deletedList.length} Item Telah Dihapus.`)
                        }
                        cancelDelete()
                      }
                  },
                  {
                    text: "TIDAK",
                    onPress: () => {   
                       cancelDelete()
                       Alert.alert("Perhatian!", "Hapus Item Dibatalkan.")
                      }
                    }
                
              ],
          )
       
  
        } else {
          Alert.alert('Perhatian!','Tidak Ada Item Untuk Dihapus.')
          setDeleteOpt(prev => ({...prev, selectDelete: true}))
        }
      }
      function CheckIfInList (val) {
        let ID = val.id    
        let result = deleteOpt.deletedList.find(x => x.id === ID)  
        if(result)
        return true
        return false 
    }

    function AddOrRemoveList (val) {
        let isInList = CheckIfInList(val)
        if(!isInList) {
            setDeleteOpt(prev => ({...prev, deletedList: [...prev.deletedList, val], allDelete: false}))
        } else if(isInList) {
            let filterDeletedItem = deleteOpt.deletedList.filter(x => x.id != val.id)
            setDeleteOpt(prev => ({...prev, deletedList: filterDeletedItem, allDelete: false}))
        }
    }
    const DeleteOptionSection = (dataProps) => {
       
        return(
            <View style={styles.deleteOption}>
                {
                deleteOpt.allDelete || deleteOpt.selectDelete ? 
                <TouchableOpacity style={styles.btnDelete} onPress={cancelDelete}>
                  <Text>Batal</Text>
                </TouchableOpacity> :
                null
                }
                <TouchableOpacity style={styles.btnDelete} onPress={() => selectOrDeleteItems(dataProps.dataProps.collection, dataProps.dataProps.storageCollection)}>
                  <Text>{deleteOpt.allDelete || deleteOpt.selectDelete ? 'Hapus' : 'Pilih'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnDelete, { flexDirection: 'row', justifyContent: 'space-between', width: 80}]} onPress={() => deleteAllList(dataProps.dataProps.dataList)}>
                  <Text>Semua</Text>
                {dataProps.dataProps.dataList.length == deleteOpt.deletedList.length ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <DeleteOptionContext.Provider value={{deleteOpt, setDeleteOpt, cancelDelete, DeleteOptionSection, CheckIfInList, AddOrRemoveList}}>
            {props.children}
        </DeleteOptionContext.Provider>
    )
}

export default DeleteOptionProvider;

const styles = StyleSheet.create({
    deleteOption: {
      paddingRight: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 10
    },
    btnDelete:{
      marginLeft: 10,
      padding: 5,
      alignItems: 'center'
    },
    square: {
        width: 18, 
        height: 18, 
        borderWidth: 1
    }
})