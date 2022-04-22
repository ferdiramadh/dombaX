import { Alert, Modal, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, Button, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import firebase from '../../../Firebaseconfig'
import { FireSQL } from 'firesql'
import { windowHeigth, windowWidth } from '../../../utils/DimensionSetup';
import ModalAddStok from '../../InventoryComponents/ModalAddStok';
import FilterStokModal from '../../stok/FilterStokModal'
import DombaStok from '../../stok/domba/DombaStok';

const SelectProductModal = ({modalProductVisible, setModalProductVisible, setSelectedProduct}) => {

    const [modalVisible, setModalVisible] = useState(false);
    
    const [ filterVisible, setFilterVisible ] = useState(false)
    const [ isFilter, setIsFilter ] = useState(false)
    const [ filterBy, setFilterBy ] = useState();
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
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    const uid = useSelector(state => state.userReducer.uid)
    const sortData = DATA.sort((a, b) => {
      let bd = objToDate(b.createdAt);
      let ad = objToDate(a.createdAt);
      return ad - bd;
    });

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchItems, setSearchItems ] = useState([])
    const dbRef = firebase.firestore();
    const fireSQL = new FireSQL(dbRef);

    const [ searchKeyword, setSearchKeyword] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

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


      function objToDate (obj) {
          let result = new Date(0);
          if( obj !== null) {
              result.setSeconds(obj.seconds);
              result.setMilliseconds(obj.nanoseconds/1000000);
              return result;
          }
          
      }

      const loadingWait = () => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        },1800)
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
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setFilterVisible(!filterVisible)}>
                            <MaterialIcons name="filter-list" size={30} color="black" />
                        </TouchableOpacity>
                      </View>
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
                            console.log("keyword kosong")
                          }
                        }}>
                          <MaterialIcons name="search" size={30} color="black" />
                        </TouchableOpacity>  
                      </View>
                      <TouchableOpacity style={styles.addProductBtn} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{fontFamily:'Inter', color: '#FFF'}}>Tambah Produk</Text>
                      </TouchableOpacity>
                      
                  </View>
                              
            </View>
            {isLoading? <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="orange" />
                    </View>:
                  <ScrollView>
                    <View style={styles.listItemWrapper}>
                      <DombaStok isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isTransaction={true} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible}/>
                    </View>
                  </ScrollView>}      
            <ModalAddStok setModalVisible={setModalVisible}  modalVisible={modalVisible}/>
            <FilterStokModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} setFilterBy={setFilterBy} filterList={filterList} />
        </View>
      </Modal>

  )
}

export default SelectProductModal

const styles = StyleSheet.create({
    centeredView: {
      height:windowHeigth,
      backgroundColor:'#FFF',
      position:'relative'
    },
    upperWrap:{
        width: '100%',
        // backgroundColor:'red',
        height: 60,
        justifyContent:'space-between',
        padding: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    lowerWrap: {
      justifyContent:'center',
      alignItems:'center',
      // backgroundColor:'red',
      // position:'relative',
      
     
    },
    title:{
        fontFamily:'Baloo',
        fontSize:24
    },
    titleWrap:{
        // backgroundColor:'blue',
        width:'90%'
    },
    backBtn:{
        width:'10%',
        // backgroundColor:'green',
    },
    searchAndAddWrapper: {
      width:windowWidth,
      height: windowHeigth*.1,
      flexDirection: 'row',
      justifyContent:'space-around',
      alignItems:'center',
      // backgroundColor: 'blue'
      borderBottomWidth: 1,
      borderBottomColor:'lightgrey',
      paddingHorizontal: 10
    },
    filterWrapper:{
      width:windowWidth*.1,
      
      // backgroundColor: 'blue',
      justifyContent:'center',
      alignItems:'flex-end',
      paddingHorizontal: 5
    },
    searchWrap:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      // backgroundColor: 'green',

      width:windowWidth*.5,
      marginBottom: 5
    },
    textInput:{
      // backgroundColor:'#DFE1E0',
      width:'70%',
      height:50,                       
      borderColor:'black',
      borderWidth:1,                
      justifyContent:'center', 
      paddingLeft:20,
      marginVertical:10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    searchBtn:{
      width: '20%',
      // backgroundColor: 'orange',
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
      right: '30%',
      // backgroundColor: 'orange',
      height:50,   
      justifyContent:'center',
      alignItems:'center',
      position:'absolute'
    }, 
    addProductBtn:{
      width: .8 * (windowWidth * .4),
      height:50, 
      backgroundColor:'#ED9B83',
      borderRadius: 5,
      justifyContent:'center',
      alignItems: 'center'
    },
    listItemWrapper: {
      width:windowWidth,
      marginBottom: windowHeigth*.15,
      // backgroundColor:'orange',
      justifyContent:'center',
      alignItems: 'center',
      position: 'relative',
      paddingHorizontal: 5
    }, 
    loaderContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      position: 'absolute',
      marginTop: windowHeigth*.5,
      // backgroundColor:'red',
      paddingHorizontal:windowWidth*.5
    }
  });
  