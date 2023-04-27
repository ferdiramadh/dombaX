import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import DombaStok from './DombaStok'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import { useSelector } from 'react-redux'
import { FireSQL } from 'firesql'
import FilterStokModal from '../FilterStokModal';
import { deleteCollection, deleteFile } from '../../../utils/ImageUpload';

export const windowWidth = Dimensions.get('window').width;
export const windowHeigth = Dimensions.get('screen').height;

const DombaStokSection = () => {

    const uid = useSelector(state => state.userReducer.uid)
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    const [ filterVisible, setFilterVisible ] = useState(false)

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchItems, setSearchItems ] = useState([])
    const [ searchKeyword, setSearchKeyword] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const [ isFilter, setIsFilter ] = useState(false)
    const [filterList, setFilterList ] = useState([
      {
        id: 1,
        sortBy: 'Stok Terendah',
        isChecked: false,
      },
      {
        id: 2,
        sortBy: 'Stok Tertinggi',
        isChecked: false,
      },
      {
        id: 3,
        sortBy: 'Harga Beli Terendah',
        isChecked: false,
      },
      {
        id: 4,
        sortBy: 'Harga Beli Tertinggi',
        isChecked: false,
      }
    ])
    const [ filterBy, setFilterBy ] = useState();
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
      if(deleteOpt.allDelete || (DATA.length == deleteOpt.deletedList.length))
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
        Alert.alert('Perhatian!','Tidak Ada Item Untuk Dihapus.')
        setDeleteOpt(prev => ({...prev, selectDelete: true}))
      }
    }
    const dbRef = firebase.firestore();
    const fireSQL = new FireSQL(dbRef);

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const searchProduct = () => {

        fireSQL.query(`SELECT * FROM userproduk WHERE ( nama LIKE '${searchKeyword}%' OR nama LIKE '${Capitalize(searchKeyword)}%' OR nama LIKE '${searchKeyword.toLowerCase()}%' ) AND userId = "${uid}" `).then(documents => {
        const items = []
        documents.forEach(doc => {

          let newValue = doc
          items.push(newValue)
          
        })
        console.log(items)
          setSearchItems(items)
        ;
      });

      }


      const loadingWait = () => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        },1800)
      }

    return (
        <View style={styles.container}>
            <View style={styles.searchWrap}>
                    <TextInput
                      style={styles.textInput}
                      placeholder='Cari Produk'
                      value={ searchKeyword }
                      onChangeText={text => setSearchKeyword(text)}
                    />
                    {searchKeyword.length > 0 ?
                    <TouchableOpacity style={styles.clearBtn} onPress={() => {
                      setSearchKeyword('')
                      setSearchItems([])
                      setIsSearch(false)
                      
                    }}>
                      <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>   : null } 
                    <TouchableOpacity style={styles.searchBtn} onPress={() => {
                      setIsFilter(false)
                      loadingWait()
                      if(searchKeyword.length != 0) {
                        
                        setIsSearch(true)
                        searchProduct()
                      } else {
                       alert("keyword kosong")
                      }
                    }}>
                      <MaterialIcons name="search" size={30} color="black" />
                    </TouchableOpacity>    
                    <TouchableOpacity  onPress={() => {
                      setFilterVisible(!filterVisible)
                    }}>
                       <MaterialIcons name="filter-list" size={30} color="black" />
                    </TouchableOpacity>        
                </View>
                {isLoading? <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="orange" />
                    </View>:
                    <ScrollView style={{ paddingTop: 10}}>
                      {
                        deleteOpt.selectDelete &&
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
                            {DATA.length == deleteOpt.deletedList.length ? <FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={{width: 18, height: 18, borderWidth: 1}} />}
                          </TouchableOpacity>
                        </View>
                      }
                        <DombaStok isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} setIsSearch={setIsSearch} setSearchItems={setSearchItems} deleteOpt={deleteOpt} setDeleteOpt={setDeleteOpt} />
                    </ScrollView> }         
                  <FilterStokModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} setFilterBy={setFilterBy} filterList={filterList} setFilterList={setFilterList}/>
        </View>
    )
}

export default DombaStokSection

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:windowWidth,
        flexDirection:'column',     
    },
    sectionTitle:{
        fontSize: 26,
        fontWeight:'bold',
        marginBottom:10
    },
    searchWrap:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderBottomWidth: 1,
      borderBottomColor:'lightgrey',
      width:windowWidth,
    },
    textInput:{
      width:'70%',
      height:50,                       
      borderColor:'black',
      borderWidth:1,                
      justifyContent:'center', 
      paddingLeft:20,
      marginVertical:10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    searchBtn:{
      width: '10%',
      height:50,   
      justifyContent:'center',
      alignItems:'center',
      borderColor:'black',
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      marginRight: 5
    },
    clearBtn: {
      width: '10%',
      right: '25%',
      height:50,   
      justifyContent:'center',
      alignItems:'center',
      position:'absolute'
    }, 
    loaderContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
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
