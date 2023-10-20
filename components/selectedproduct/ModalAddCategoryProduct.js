import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../Firebaseconfig'
import { useDispatch } from 'react-redux'

const ModalAddCategoryProduct = ({ modalAddCategory, setModalAddCategory, uid, listCategory, setEditData, editCategory, setEditCategory, setIsPressed }) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState({
    name: ''
  })

  const updateItem = (item) => {
    let checkItem = listCategory.map(item => item.name)

    if (checkItem.includes(editCategory.name)) {
      Alert.alert('Perhatian!', 'Item Sudah Ada.')
    } else {
      return firebase
        .firestore()
        .collection("userkategoriproduk")
        .doc(item.id)
        .update(item).then(() => {
          updateNotification()
          setModalAddCategory(!modalAddCategory)
          setEditData({})
          setEditCategory({})
        }).catch((error) => alert(error))

    }

  }

  const updateNotification = () => {
    Alert.alert(
      "Perhatian!",
      `Item telah diubah.`,
      [
        {
          text: "OK",
          onPress: () => { setIsPressed(false) }
        }
      ]
    )


  }

  const addUserCategoryProduct = (values) => {

    const datas = {
      id: firebase.firestore()
        .collection("userkategoriproduk")
        .doc().id
    }
    let addedProperties = { id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(), userId: uid }
    const newValue = Object.assign(values, addedProperties)
    const db = firebase.firestore();
    db.collection("userkategoriproduk")
      .doc(datas.id)
      .set(newValue)
    dispatch({ type: 'STORE_DATA_USER_KATEGORI', results: newValue })


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
          <Text style={[styles.textStyle, { color: '#000' }]}>{editCategory.id ? "Update Kategori" : "Tambah Kategori"}</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Nama Kategori'
            value={editCategory.id ? editCategory.name : category.name}
            onChangeText={text => {
              if (editCategory.id) {
                setEditCategory(curState => ({ ...curState, name: text }))
              } else {
                setCategory({ name: text })
              }
            }}
          />
          <View style={styles.btnWrap}>
            <TouchableOpacity style={styles.btnSave} onPress={() => {
              setModalAddCategory(!modalAddCategory)
              setCategory({ name: '' })
              if(editCategory.id) {
                setEditData({})
                setEditCategory({})
              }
            

            }}>
              <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSave, { backgroundColor: '#ED9B83' }]} onPress={() => {
              if (editCategory.name) {
                updateItem(editCategory)
              } else {

                let checkItem = listCategory.map(item => item.name)

                if (checkItem.includes(category.name)) {
                  Alert.alert('Perhatian!', 'Item Sudah Ada.')
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
              }

              setCategory({ name: '' })
            }}>
              <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color: '#FFF' }}>{editCategory.id ? "Update" : "Simpan"}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalView: {
    width: '80%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#DFE1E0',
    backgroundColor: 'white'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Baloo',
  },
  textInput: {
    backgroundColor: '#DFE1E0',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10
  },
  btnSave: {
    backgroundColor: 'white',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10
  }
})