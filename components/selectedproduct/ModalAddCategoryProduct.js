import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert} from 'react-native'
import React, { useState } from 'react'
import firebase from '../../Firebaseconfig'
import {useSelector, useDispatch} from 'react-redux'

const ModalAddCategoryProduct = ({ modalAddCategory , setModalAddCategory,uid,listCategory}) => {
  const dispatch = useDispatch();
  
  const [category , setCategory ] = useState({
    name:''
  })

  const addUserCategoryProduct = (values) => {
     
    const datas = {
      id: firebase.firestore()
      .collection("userkategoriproduk")
      .doc().id
  }
  let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}
  const newValue = Object.assign(values,addedProperties)
      const db = firebase.firestore();
      db.collection("userkategoriproduk")
      .doc(datas.id)
      .set(newValue)
      dispatch({type:'STORE_DATA_USER_KATEGORI',results:newValue})
    
  
  }

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalAddCategory}
        onRequestClose={() => {
          
            setModalAddCategory(!modalAddCategory);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
              style={styles.textInput}
              placeholder='Nama Kategori'
              value={category.name}
              onChangeText={text => setCategory({name:text})}
            />
            <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.btnSave} onPress={() => setModalAddCategory(!modalAddCategory)}>
                    <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Batal</Text>                  
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnSave,{backgroundColor:'#ED9B83'}]} onPress={() => {
                  let checkItem = listCategory.map(item => item.name)

                  if(checkItem.includes(category.name)){
                    Alert.alert('Perhatian!','Item Sudah Ada.')
                  } else {
                  addUserCategoryProduct(category)
                  Alert.alert(
                    'Perhatian!',
                    'Item Baru Telah Ditambahkan',
                    [
                      {
                        text: 'OK',
                        
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
                
                  setModalAddCategory(!modalAddCategory)
                  
                }
                setCategory({name:''})
                }}>
                    <Text style={{fontSize:18, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Simpan</Text>                  
                </TouchableOpacity>
              </View>
          </View>
        </View>
        
      </Modal>
  )
}

export default ModalAddCategoryProduct

const styles = StyleSheet.create({
    centeredView: {
        
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent:'center',
        alignItems:'center',
        flex:1
        
      },
      modalView: {
        width:'80%',
        height:'30%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2 ,
        borderRadius: 15,
        borderColor:'#DFE1E0',
        backgroundColor:'white',
        // shadowColor: '#000',
        // shadowOffset: {
        // width: 0,
        // height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
       
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Baloo',
      },
      modalText: {
        
        
      },
      textInput:{
        backgroundColor:'#DFE1E0',
        width:'90%',
        height:50,                       
        // borderColor:'black',
        // borderWidth:2,                
        // borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10
      },
      btnSave:{
        backgroundColor:'white',
        width:'45%',
        height:40,                       
        justifyContent:'center',
        borderRadius:5,
        elevation: 2
      },
      btnWrap:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        paddingHorizontal: 10
      }
})