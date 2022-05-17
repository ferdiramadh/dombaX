import React , { useState, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import { MaterialIcons } from '@expo/vector-icons';
import ModalAddTransaction from '../components/transactionsComponents/ModalAddTransaction'
import TopTabTransaction from '../navigation/transactiontoptab/TopTabTransaction'
import { windowWidth, windowHeigth } from '../utils/DimensionSetup'
import { PhotoContext } from '../context/PhotoProfileContext'
import { useSelector} from 'react-redux'
import firebase from '../Firebaseconfig';
import { FireSQL } from 'firesql'
import FilterIncomeModal from '../components/income/FilterIncomeModal';

const TransactionScreen = () => {

    const uid = useSelector(state => state.userReducer.uid)
    const [ purchasing, setPurchasing ] = useState(true)
    const [modalTransaction, setModalTransaction] = useState(false);
    const { topTabTransactionFocus} = useContext(PhotoContext)

    const transactionsData = useSelector(state => state.transactionsReducer)
    const listIncome = transactionsData.listIncome

    const [ isSearch, setIsSearch ] = useState(false)
    const [ searchItems, setSearchItems ] = useState([])
    const [ searchKeyword, setSearchKeyword] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const [ filterVisible, setFilterVisible ] = useState(false)

    const [ isFilter, setIsFilter ] = useState(false)
    const [ filterItems, setFilterItems ] = useState([])
    const filterList = [
      {
        id: 1,
        sortBy: 'Hari Ini',
      },
      {
        id: 2,
        sortBy: '7 Hari Terakhir',
      },
      {
        id: 3,
        sortBy: '30 Hari Terakhir',
      },
      {
        id: 4,
        sortBy: 'Bulan Ini',
      },
      {
        id: 5,
        sortBy: 'Pilih Tanggal',
      }
    ]
    const [ filterBy, setFilterBy ] = useState();

    const dbRef = firebase.firestore();
    const fireSQL = new FireSQL(dbRef);

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const searchProduct = () => {

        fireSQL.query(`SELECT * FROM income WHERE ( produk LIKE '${searchKeyword}%' OR produk LIKE '${Capitalize(searchKeyword)}%' OR produk LIKE '${searchKeyword.toLowerCase()}%' ) AND userId = "${uid}" `).then(documents => {
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
            <CustomHeder leftSubMenu='Transaksi' styleFont={{fontSize:48}} state={purchasing} setState={setPurchasing}/>     
            <View style={{marginTop:100, width:windowWidth, height:windowHeigth * .8 }}>
                <View style={{flex: 1, width: windowWidth}}>

                
            { listIncome.length > 0?<View style={styles.searchWrap}>
                    <TextInput
                      style={styles.textInput}
                      placeholder='Cari Transaksi'
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
                   
                </View>: null}
                <TopTabTransaction listIncome={listIncome} isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isFilter={isFilter} filterBy={filterBy} setIsFilter={setIsFilter} isLoading={isLoading}/>
                </View>
            </View>    
            <ModalAddTransaction setModalTransaction={setModalTransaction}  modalTransaction={modalTransaction} purchasing={purchasing}/>
            <CustomButton onPress={() => {
                if(topTabTransactionFocus == 'Income'){
                    setModalTransaction(!modalTransaction)
                } else {
                    console.log('Apaan tuh')
                }
                
            }}/>
            <FilterIncomeModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} setFilterBy={setFilterBy} filterList={filterList} />
        </View>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
       
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
})
