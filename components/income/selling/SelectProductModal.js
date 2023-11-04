import { Modal, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import firebase from '../../../Firebaseconfig'
import { FireSQL } from 'firesql'
import { windowHeigth, windowWidth } from '../../../utils/DimensionSetup'
import ModalAddStok from '../../InventoryComponents/ModalAddStok'
import FilterStokModal from '../../stok/FilterStokModal'
import DombaStok from '../../stok/domba/DombaStok'
import { DeleteOptionContext } from '../../../context/DeleteOptionContext'

const SelectProductModal = ({ modalProductVisible, setModalProductVisible, setSelectedProduct }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const { deleteOpt, setDeleteOpt } = useContext(DeleteOptionContext)
  const [filterVisible, setFilterVisible] = useState(false)
  const [isFilter, setIsFilter] = useState(false)
  const [filterBy, setFilterBy] = useState()
  const filterList = [
    {
      id: 1,
      sortBy: 'Stok Terendah',
    },
    {
      id: 2,
      sortBy: 'Stok Tertinggi',
    },
    {
      id: 3,
      sortBy: 'Harga Beli Terendah',
    },
    {
      id: 4,
      sortBy: 'Harga Beli Tertinggi',
    }
  ]
  const userProducts = useSelector(state => state.userProductReducer)
  const DATA = userProducts.listUserProduct
  const uid = useSelector(state => state.userReducer.uid)
  const sortData = DATA.sort((a, b) => {
    let bd = objToDate(b.createdAt)
    let ad = objToDate(a.createdAt)
    return ad - bd
  })

  const [isSearch, setIsSearch] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  const dbRef = firebase.firestore()
  const fireSQL = new FireSQL(dbRef)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }



  const searchProduct = () => {

    fireSQL.query(`SELECT * FROM userproduk WHERE ( nama LIKE '${searchKeyword}%' OR nama LIKE '${Capitalize(searchKeyword)}%' OR nama LIKE '${searchKeyword.toLowerCase()}%' ) AND userId = "${uid}" `).then(documents => {
      const items = []
      documents.forEach(doc => {

        let newValue = doc
        items.push(newValue)

      })
      setSearchItems(items)
    })

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
    }, 1800)
  }


  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalProductVisible}
      onRequestClose={() => {

        null
      }}>
      <View style={styles.centeredView}>
        <View style={styles.upperWrap}>
          <TouchableOpacity style={styles.backBtn} onPress={() => {
            setModalProductVisible(!modalProductVisible)

          }}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Daftar Produk</Text>
          </View>


        </View>
        <View style={styles.lowerWrap}>
          <View style={styles.searchAndAddWrapper}>
            <View style={styles.filterWrapper}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setFilterVisible(!filterVisible)}>
                <MaterialIcons name="filter-list" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchWrap}>
              <TextInput
                style={styles.textInput}
                placeholder='Cari Produk'
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

                setIsFilter(false)
                loadingWait()
                if (searchKeyword.length != 0) {

                  setIsSearch(true)
                  searchProduct()
                } else {
                  alert("Keyword Kosong!")
                }
              }}>
                <MaterialIcons name="search" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addProductBtn} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.tambahProdukBtn}>Tambah Produk</Text>
            </TouchableOpacity>

          </View>

        </View>
        {isLoading ? <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="orange" />
        </View> :
          <ScrollView>
            <View style={styles.listItemWrapper}>
              <DombaStok isSearch={isSearch} searchItems={searchItems} setSearchItems={setSearchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isTransaction={true} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteOpt={deleteOpt} setDeleteOpt={setDeleteOpt} />
            </View>
          </ScrollView>}
        <ModalAddStok setModalVisible={setModalVisible} modalVisible={modalVisible} />
        <FilterStokModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} setFilterBy={setFilterBy} filterList={filterList} />
      </View>
    </Modal>

  )
}

export default SelectProductModal

const styles = StyleSheet.create({
  centeredView: {
    height: windowHeigth,
    backgroundColor: '#FFF',
    position: 'relative'
  },
  upperWrap: {
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  lowerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
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
  searchAndAddWrapper: {
    width: windowWidth,
    height: windowHeigth * .1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingHorizontal: 20
  },
  filterWrapper: {
    width: windowWidth * .1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 5
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: windowWidth * .5,
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
    borderBottomLeftRadius: 5,
    fontFamily: 'Quicksand'
  },
  searchBtn: {
    width: '20%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginRight: 5
  },
  clearBtn: {
    width: '10%',
    right: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  addProductBtn: {
    width: .8 * (windowWidth * .4),
    height: 50,
    backgroundColor: '#ED9B83',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemWrapper: {
    width: windowWidth,
    marginBottom: windowHeigth * .15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 5
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: windowHeigth * .5,
    paddingHorizontal: windowWidth * .5
  },
  tambahProdukBtn: {
    fontFamily: 'Baloo',
    color: '#FFF',
    fontSize: 16
  }
})
