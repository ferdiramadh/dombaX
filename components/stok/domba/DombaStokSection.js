import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , ActivityIndicator, Alert, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import DombaStok from './DombaStok'
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import { useSelector } from 'react-redux'
import { FireSQL } from 'firesql'
import FilterStokModal from '../FilterStokModal';

export const windowWidth = Dimensions.get('window').width;
export const windowHeigth = Dimensions.get('screen').height;

const DombaStokSection = () => {

    const uid = useSelector(state => state.userReducer.uid)

    const [ filterVisible, setFilterVisible ] = useState(false)

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchItems, setSearchItems ] = useState([])
    const [ searchKeyword, setSearchKeyword] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const [ isFilter, setIsFilter ] = useState(false)
    const [ filterItems, setFilterItems ] = useState([])
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
            {/* <Text style={styles.sectionTitle}>Daftar Items</Text> */}
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
                    <TouchableOpacity  onPress={() => {
                      setFilterVisible(!filterVisible)
                    }}>
                       <MaterialIcons name="filter-list" size={30} color="black" />
                    </TouchableOpacity>    
                   
                </View>
            
            {isLoading? <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="orange" />
                </View>:<ScrollView>
                    <DombaStok isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} setIsSearch={setIsSearch} setSearchItems={setSearchItems}/>
                </ScrollView> }         
            
              <FilterStokModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} setFilterBy={setFilterBy} filterList={filterList} setFilterList={setFilterList}/>
        </View>
    )
}

export default DombaStokSection

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'red',
        width:windowWidth,
        flexDirection:'column',
        // paddingBottom: 60,
        // marginBottom: 60,
        paddingHorizontal: 5
        
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
      // backgroundColor: 'green',
      borderBottomWidth: 1,
      borderBottomColor:'lightgrey',
      width:windowWidth,
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
      borderBottomLeftRadius: 5
    },
    searchBtn:{
      width: '10%',
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
      right: '25%',
      // backgroundColor: 'orange',
      height:50,   
      justifyContent:'center',
      alignItems:'center',
      position:'absolute'
    }, 
    loaderContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    //   backgroundColor: 'red',
    }
})
