import { Alert, Modal, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../../CustomButton'
import ModalAddCategoryProduct from '../../selectedproduct/ModalAddCategoryProduct'
import CategoryItem from '../../selectedproduct/CategoryItem'
import { useSelector } from 'react-redux'
import firebase from '../../../Firebaseconfig'

const UpdateSelectCategoryModal = (props) => {

  const listCategory = useSelector(state => state.userCategoryProductReducer.listUserCategoryProduct)
  const uid = useSelector(state => state.userReducer.uid)
  const [modalAddCategory, setModalAddCategory] = useState(false)
  const modalCategoryVisible = props.modalCategoryVisible
  const setModalCategoryVisible = props.setModalCategoryVisible
  const setFieldValue = props.setFieldValue
  const setCategory = props.setCategory
  const sortData = listCategory.sort((a, b) => {
    let bd = objToDate(b.createdAt)
    let ad = objToDate(a.createdAt)
    return ad - bd
  })
  const [editData, setEditData] = useState({})
  const [editCategory, setEditCategory] = useState({})
  const [isSearch, setIsSearch] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchCategory = () => {

    return firebase
      .firestore()
      .collection("userkategoriproduk").where("name", ">=", `${searchKeyword}`).where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach(function (doc) {
          let newValue = doc.data()
          items.push(newValue)


        })

        setSearchItems(items)
        console.log(items)
      })

  }

  const deleteItem = (item) => {
    Alert.alert(
      "Perhatian!",
      `Hapus "${item.name} ?`,
      [
        {
          text: "Batal",
          onPress: () => Alert.alert("Canceled"),
          style: 'cancel'
        },
        {
          text: "OK",
          onPress: () => {
            return firebase
              .firestore()
              .collection("userkategoriproduk")
              .doc(item.id)
              .delete()
          }
        }
      ],
      {
        cancelable: true,

      }
    )

  }

  const editItem = (item) => {

    return firebase
      .firestore()
      .collection("userkategoriproduk")
      .doc(item.id)
      .get()
      .then((i) => {
        setEditData(i.data())
        setEditCategory(i.data())
      })


  }

  const setCategoryValue = (item) => {
    setFieldValue('kategori', item)
    setCategory(item)
    setModalCategoryVisible(!modalCategoryVisible)
  }

  useEffect(() => {
    if (editData !== undefined) {
    }
    if (editData.name) {
      setModalAddCategory(!modalAddCategory)
    }

  }, [editData])

  function objToDate(obj) {
    let result = new Date(0)
    if (obj !== null) {
      result.setSeconds(obj.seconds)
      result.setMilliseconds(obj.nanoseconds / 1000000)
      return result
    }

  }

  const loadingWait = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalCategoryVisible}
      onRequestClose={() => {

        setModalCategoryVisible(!modalCategoryVisible)
        setSearchKeyword('')
        setSearchItems([])
        setIsSearch(false)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.upperWrap}>
          <TouchableOpacity style={styles.backBtn} onPress={() => {
            setModalCategoryVisible(!modalCategoryVisible)
            setSearchKeyword('')
            setSearchItems([])
            setIsSearch(false)

          }}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Kategori Produk Lainnya</Text>
          </View>
        </View>

        {listCategory.length > 0 ?
          <View style={styles.searchWrap}>
            <TextInput
              style={styles.textInput}
              placeholder='Cari Kategori'
              value={searchKeyword}
              onChangeText={text => setSearchKeyword(text)}
            />
            {searchKeyword.length > 0 ?
              <TouchableOpacity style={styles.clearBtn} onPress={() => {
                setSearchKeyword('')
                setSearchItems([])
                setIsSearch(false)

              }}>
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity> : null}
            <TouchableOpacity style={styles.searchBtn} onPress={() => {
              loadingWait()
              if (searchKeyword.length != 0) {

                setIsSearch(true)
                searchCategory()
              } else {
                console.log("keyword kosong")
              }
            }}>
              <MaterialIcons name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>


          : null
        }


        {isLoading ? <View style={styles.container}>
          <ActivityIndicator size="large" color="orange" />
        </View> :
          <ScrollView style={styles.modalView}>
            {listCategory.length > 0 && !isSearch ? sortData.map((item, i) => {
              return <CategoryItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} editData={editData} setCategoryValue={setCategoryValue} />
            }) : null}

            {isSearch ? <View style={{ paddingTop: 10 }}>

              <Text style={{ marginLeft: 20 }}>{searchItems.length} hasil ditemukan untuk "{searchKeyword}"</Text>
              {
                searchItems.map((item, i) => {
                  return <CategoryItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} editData={editData} setCategoryValue={setCategoryValue} />
                })
              }
            </View> : null}
            {listCategory.length < 1 ?
              <View style={styles.emptyStokNotif}>
                <Text style={styles.text}>Tekan tombol tambah untuk menambahkan kategori baru</Text>
              </View> : null
            }
          </ScrollView>}
      </View>
      <CustomButton onPress={() => setModalAddCategory(!modalAddCategory)} />
      <ModalAddCategoryProduct modalAddCategory={modalAddCategory} setModalAddCategory={setModalAddCategory} setFieldValue={setFieldValue} uid={uid} listCategory={listCategory} editData={editData} setEditData={setEditData} editItem={editItem} editCategory={editCategory} setEditCategory={setEditCategory} />
    </Modal>

  )
}

export default UpdateSelectCategoryModal

const styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  modalView: {
    marginBottom: '20%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Baloo',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  upperWrap: {
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Baloo',
    fontSize: 24
  },
  titleWrap: {
    width: '90%'
  },
  backBtn: {
    width: '10%',
  },
  text: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center'
  },
  emptyStokNotif: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '75%'
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  textInput: {
    width: '70%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  searchBtn: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  clearBtn: {
    width: '10%',
    right: '20%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
