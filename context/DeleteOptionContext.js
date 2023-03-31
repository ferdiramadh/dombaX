import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import { deleteCollection, deleteFile } from '../utils/ImageUpload';

export const DeleteOptionContext = createContext()

const DeleteOptionProvider = (props) => {
    const [ deleteOpt, setDeleteOpt ] = useState({
        allDelete: false,
        isDeleted: false,
        deletedList: [],
        selectDelete: false
      })
      function deleteAllList() {
        if(!deleteOpt.allDelete || (deleteOpt.allDelete && deleteOpt.deletedList.length <= 0))
        setDeleteOpt(prev =>   
          ( {
            ...prev, 
            deletedList: DATA, 
            allDelete: true
          })
        )
        if(deleteOpt.allDelete)
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
      const deleteCollectionAndFile = (item) => {
        deleteCollection("userproduk", item)
        deleteFile("UserProduk", item)
    }
  
      function selectOrDeleteItems() {
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
                          deleteCollectionAndFile(item)
                          let filterDeletedItem = deleteOpt.deletedList.filter(x => x.id != item.id)
                          setDeleteOpt(prev => ({...prev, deletedList: filterDeletedItem}))
                          setDeleteOpt(prev => ({...prev, selectDelete: false}))
                          Alert.alert("Perhatian!", `${deleteOpt.deletedList.length} Item Telah Dihapus.`)
                        }
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
          setDeleteOpt(prev => ({...prev, selectDelete: true}))
        }
      }
    const deleteOptionSection = () => {
        return(
            <View style={styles.deleteOption}>
                {
                deleteOpt.allDelete || deleteOpt.selectDelete ? 
                <TouchableOpacity style={styles.btnDelete} onPress={cancelDelete}>
                <Text>Batal</Text>
                </TouchableOpacity> :
                null
                }
                <TouchableOpacity style={styles.btnDelete} onPress={selectOrDeleteItems}>
                <Text>{deleteOpt.allDelete || deleteOpt.selectDelete ? 'Hapus' : 'Pilih'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnDelete, { flexDirection: 'row', justifyContent: 'space-between', width: 80}]} onPress={deleteAllList}>
                <Text>Semua</Text>
                {deleteOpt.allDelete && deleteOpt.deletedList.length > 0? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={{width: 18, height: 18, borderWidth: 1}} />}
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <DeleteOptionContext.Provider value={{deleteOpt, setDeleteOpt, deleteAllList, cancelDelete, deleteCollectionAndFile, deleteOptionSection}}>
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
    }
})