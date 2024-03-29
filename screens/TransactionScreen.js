import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import CustomButton from '../components/CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import ModalAddTransaction from '../components/transactionsComponents/ModalAddTransaction'
import TopTabTransaction from '../navigation/transactiontoptab/TopTabTransaction'
import { windowWidth, windowHeigth } from '../utils/DimensionSetup'
import { PhotoContext } from '../context/PhotoProfileContext'
import { useSelector } from 'react-redux'
import firebase from '../Firebaseconfig'
import { FireSQL } from 'firesql'
import FilterIncomeModal from '../components/income/FilterIncomeModal'
import { FilterTransactionContext } from '../context/FilterTransactionContext'

const TransactionScreen = () => {

  const uid = useSelector(state => state.userReducer.uid)
  const [purchasing, setPurchasing] = useState(true)
  const [modalTransaction, setModalTransaction] = useState(false)
  const { topTabTransactionFocus, setTopTabTransactionFocus } = useContext(PhotoContext)
  const { tambahPengeluaran, setTambahPengeluaran } = useContext(FilterTransactionContext)
  const transactionsData = useSelector(state => state.transactionsReducer)
  const listIncome = transactionsData.listIncome
  const listExpense = transactionsData.listExpense
  const [transaction, setTransaction] = useState('income')

  const [isSearch, setIsSearch] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [filterVisible, setFilterVisible] = useState(false)

  const [isFilter, setIsFilter] = useState(false)

  const [filterBy, setFilterBy] = useState()

  const dbRef = firebase.firestore()
  const fireSQL = new FireSQL(dbRef)

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const searchProduct = () => {

    fireSQL.query(`SELECT * FROM ${transaction} WHERE ( namaTransaksi LIKE '${searchKeyword}%' OR namaTransaksi LIKE '${Capitalize(searchKeyword)}%' OR namaTransaksi LIKE '${searchKeyword.toLowerCase()}%' ) AND userId = "${uid}" `).then(documents => {
      const items = []
      documents.forEach(doc => {

        let newValue = doc
        items.push(newValue)

      })
      setSearchItems(items)
    })

  }

  useEffect(() => {
    if (tambahPengeluaran) {
      setTransaction('expense')
      setTopTabTransactionFocus("Expense")
      setTambahPengeluaran(false)
      setModalTransaction(!modalTransaction)
    }
  }, [tambahPengeluaran])

  const loadingWait = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1800)
  }

  return (
    <View style={styles.container}>
      <CustomHeader leftSubMenu='Transaksi' styleFont={{ fontSize: 48 }} state={purchasing} setState={setPurchasing} />
      <View style={{ marginTop: 100, width: windowWidth, height: windowHeigth * .8 }}>
        <View style={{ flex: 1, width: windowWidth }}>


          {listIncome.length > 0 || listExpense.length > 0 ? <View style={styles.searchWrap}>
            <TextInput
              style={styles.textInput}
              placeholder='Cari Transaksi'
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

              if (searchKeyword.length != 0) {
                setIsFilter(false)
                loadingWait()
                setIsSearch(true)
                searchProduct()
              } else {
                Alert.alert(
                  "Keyword Kosong",
                  `Harap masukkan keyword terlebih dahulu.`,
                )
              }

            }}>
              <MaterialIcons name="search" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setFilterVisible(!filterVisible)
            }}>
              <MaterialIcons name="filter-list" size={30} color="black" />
            </TouchableOpacity>

          </View> : null}
          <TopTabTransaction isSearch={isSearch} searchItems={searchItems} searchKeyword={searchKeyword} isLoading={isLoading} setSearchItems={setSearchItems} setTransaction={setTransaction} setIsSearch={setIsSearch} setSearchKeyword={setSearchKeyword} />
        </View>
      </View>
      <ModalAddTransaction setModalTransaction={setModalTransaction} modalTransaction={modalTransaction} topTabTransactionFocus={topTabTransactionFocus} />
      <CustomButton onPress={() => setModalTransaction(!modalTransaction)} />
      <FilterIncomeModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} isIncome={transaction} />
    </View>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    width: windowWidth,
    marginBottom: 5
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
    borderBottomRightRadius: 5,
    marginRight: 5
  },
  clearBtn: {
    width: '10%',
    right: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
})
