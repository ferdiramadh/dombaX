import { Alert, Modal, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import CustomButton from '../../CustomButton'
import CategoryItem from '../../selectedproduct/CategoryItem'
import { useSelector } from 'react-redux'
import firebase from '../../../Firebaseconfig'
import { FireSQL } from 'firesql'
import ModalAddCategoryProduct from '../../selectedproduct/ModalAddCategoryProduct'

const SelectCategoryModal = (props) => {

  const listCategory = useSelector(state => state.userCategoryProductReducer.listUserCategoryProduct)
  const uid = useSelector(state => state.userReducer.uid)
  const [modalAddCategory, setModalAddCategory] = useState(false)
  const sortData = listCategory.sort((a, b) => {
    let bd = objToDate(b.createdAt)
    let ad = objToDate(a.createdAt)
    return ad - bd
  })
  const modalCategoryVisible = props.modalCategoryVisible
  const setModalCategoryVisible = props.setModalCategoryVisible

  const [isSearch, setIsSearch] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  const dbRef = firebase.firestore()
  const fireSQL = new FireSQL(dbRef)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const searchCategory = () => {

    fireSQL.query(`SELECT * FROM userkategoriproduk WHERE (name LIKE '${searchKeyword}%' OR name LIKE '${Capitalize(searchKeyword)}%' OR name LIKE '${searchKeyword.toLowerCase()}%') AND userId="${uid}"`).then(documents => {
      const items = []
      documents.forEach(doc => {

        let newValue = doc
        items.push(newValue)

      })
      setSearchItems(items)
    })

  }

  const deleteItem = (item) => {
    Alert.alert(
      "Perhatian!",
      `Hapus "${item.name} ?`,
      [
        {
          text: "Batal",
          onPress: () => Alert.alert("Dibatalkan."),
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
              const isEmptyKeyword = searchKeyword.length == 0
              if (isEmptyKeyword) {
                Alert.alert('Perhatian!', "Keyword Kosong!")
              } else {
                loadingWait()
                setIsSearch(true)
                searchCategory()
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
              return <CategoryItem item={item} key={item.id} deleteItem={deleteItem} uid={uid} listCategory={listCategory} />
            }) : null}

            {isSearch ? <View style={{ paddingTop: 10 }}>

              <Text style={{ marginLeft: 20 }}>{searchItems.length} hasil ditemukan untuk "{searchKeyword}"</Text>
              {
                searchItems.map((item, i) => {
                  return <CategoryItem item={item} key={item.id} deleteItem={deleteItem} uid={uid} listCategory={listCategory} />
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
      <ModalAddCategoryProduct modalAddCategory={modalAddCategory} setModalAddCategory={setModalAddCategory} uid={uid} editCategory={{}} listCategory={listCategory} />
    </Modal>

  )
}

export default SelectCategoryModal

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
