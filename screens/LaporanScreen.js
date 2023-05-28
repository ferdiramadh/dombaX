import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View , Dimensions, BackHandler, Alert, ScrollView, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import CustomButton from '../components/CustomButton'
import { PieChart } from 'react-native-chart-kit'
import LaporanComponent from '../components/laporan/LaporanComponent'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../Firebaseconfig'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { windowHeigth, windowWidth } from '../utils/DimensionSetup'
import ProfileHeader from '../components/laporan/ProfileHeader'
import ExpenseChart from '../components/laporan/ExpenseChart'
import { MaterialIcons } from '@expo/vector-icons';
import FilterLaporanModal from '../components/laporan/FilterLaporanModal'
import { formatToCurrencyWithoutStyle } from '../utils/FormatCurrency'
import AsyncStorage from '@react-native-async-storage/async-storage';


const InitialEmpty = ({navigation}) => {
    const imgEmptyHome = require('../assets/images/home/empty_home.png')
    return(
        <View style={styles.initialEmptyWrapper}>
            <View style={styles.imageAndText}>
                <Image source={imgEmptyHome} />
                <Text style={styles.textInitialEmpty}>Stok dan transaksi Kamu masih kosong nih</Text>
            </View>
            <TouchableOpacity style={styles.btnCatat} onPress={() => navigation.navigate('Inventory')}>
                <Text style={{fontSize: 24, fontFamily: 'Baloo', color: '#FFF'}}>Catat Sekarang</Text>
            </TouchableOpacity>
        </View>
    )
}
export default function LaporanScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    //Get Uid From AsyncStorage
    const uid = useSelector(state => state.userReducer.uid)
    const [userObj, setUserObj ] = useState()

    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
            // setUid(value)
            // populateAll()
             
            console.log('ada data nih')
            setUserObj(JSON.parse(value))
              
        } 
        } catch(e) {
        // error reading value
        }
    }
    const getAuth = async() => {
        console.log('get auth nih')
        try{
            const respons = await firebase.auth().signInWithEmailAndPassword(userObj["email"],userObj["password"]);
            const userObj2 = respons.user
            // setUid(userObj.uid)
            dispatch({type:'LOGIN',results:userObj2})

        }catch(e){
            alert( e.message)

        }

    }
    // DATA - DATA
    const transactionsData = useSelector(state => state.transactionsReducer)
    const listExpense = transactionsData.listExpense
    const listIncome = transactionsData.listIncome
    const userProducts = useSelector(state => state.userProductReducer);
    const listUserProduct = userProducts.listUserProduct

    //Check If Stok and Transactions are empty
    const listExpenseLength = listExpense.length
    const listIncomeLength = listIncome.length
    const listUserProductLength = listUserProduct.length
    
    const [ haveStockTransaction, setHaveStockTransaction ] = useState(false)
    function checkInitialEmpty(){
        if((listExpenseLength == 0 && listIncomeLength == 0 ) && listUserProductLength == 0) {
            setHaveStockTransaction(false)
        } else {
            setHaveStockTransaction(true)
        }
    }
    useEffect(() => {
        checkInitialEmpty()
    }, [listExpenseLength, listIncomeLength, listUserProductLength])

    //Filter Laporan
    const [ filterBy, setFilterBy ] = useState();
   
    const [ filteredList, setFilteredList ] = useState([])
    const [ filteredListIncome, setFilteredListIncome ] = useState([])

    const [ filterVisible, setFilterVisible ] = useState(false)

    const [ isFilter, setIsFilter ] = useState(false)
 
    const [filterList, setFilterList] = useState([
      {
        id: 1,
        sortBy: 'Hari Ini',
        isChecked: false,
        filteredList: listExpense.filter((item, i) => {
            let today = new Date()
            return new Date(item.tanggal).toDateString()  == new Date(today.toISOString().split('T')[0]).toDateString() 
        })
      },
      {
        id: 2,
        sortBy: '7 Hari Terakhir',
        isChecked: false,
      },
      {
        id: 3,
        sortBy: '30 Hari Terakhir',
        isChecked: false,
      },
      {
        id: 4,
        sortBy: 'Bulan Ini',
        isChecked: false,
      },
      {
        id: 5,
        sortBy: 'Pilih Tanggal',
        isChecked: false,
      }
    ])


    //List of Categories & Grouping
    const groupByKey = (list, key, {omitKey=false}) => list.reduce((hash, {[key]:value, ...rest}) => ({...hash, [value]:( hash[value] || [] ).concat(omitKey ? {...rest} : {[key]:value, ...rest})} ), {})
    
    const listExpenseGroup = groupByKey(listExpense, 'kategori', {omitKey:true})
    const listIncomeGroup = groupByKey(listIncome, 'kategori', {omitKey:true})
    const listExpenseCategory = listExpense.map((e) => e["kategori"])
    const listIncomeCategory = listIncome.map((e) => e["kategori"])
    const filterCategory = (val, cat) => {
        return val.kategori == cat
    }
    const gajiPekerjaList = isFilter?filteredList.filter((val) => filterCategory(val, "Gaji Pekerja")):listExpense.filter((val) => filterCategory(val, "Gaji Pekerja"))
    const pembayaranUtangList = isFilter?filteredList.filter((val) => filterCategory(val, "Pembayaran Utang")):listExpense.filter((val) => filterCategory(val, "Pembayaran Utang"))
    const pemberianUtangList = isFilter?filteredList.filter((val) => filterCategory(val, "Pemberian Utang")):listExpense.filter((val) => filterCategory(val, "Pemberian Utang"))
    const tabunganInvestasiList = isFilter?filteredList.filter((val) => filterCategory(val, "Tabungan atau Investasi")):listExpense.filter((val) => filterCategory(val, "Tabungan atau Investasi"))
    const pembelianAlatList = isFilter?filteredList.filter((val) => filterCategory(val, "Pembelian Alat dan Mesin")):listExpense.filter((val) => filterCategory(val, "Pembelian Alat dan Mesin"))
    const pengeluaranLainList = isFilter?filteredList.filter((val) => filterCategory(val, "Pengeluaran Lain-Lain")):listExpense.filter((val) => filterCategory(val, "Pengeluaran Lain-Lain"))
    const pembelianStokList = isFilter?filteredList.filter((val) => filterCategory(val, "Pembelian Stok")):listExpense.filter((val) => filterCategory(val, "Pembelian Stok"))


    const [isProfit, setIsProfit] = useState(true)
    // const dombaCost = useSelector(state => state.stokReducer.listDomba)
    // const pakanCost = useSelector(state => state.stokReducer.listPakan)
    // const obatCost = useSelector(state => state.stokReducer.listObat)

    // const kandangCost = useSelector(state => state.costReducer.listKandang)
    // const pegawaiCost = useSelector(state => state.costReducer.listPegawai)
    // const lahanCost = useSelector(state => state.costReducer.listLahan)

    // const penjualan = useSelector(state => state.transactionsReducer.listSelling)
    // const pembelian = useSelector(state => state.transactionsReducer.listPurchasing)

    // const varCostReduce = (s,a) => {
    //     return s + parseInt(a.jumlah)*parseInt(a.hargaBeli);
    // }


    // const totalBiayaDomba = dombaCost.reduce((s,a) => varCostReduce(s,a),0)
    // const totalBiayaPakan = pakanCost.reduce((s,a) => varCostReduce(s,a),0)
    // const totalBiayaObat = obatCost.reduce((s,a) => varCostReduce(s,a),0)

    // const totalBiayaKandang = kandangCost.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.biayaBuat)},0)
    // const totalBiayaPegawai = pegawaiCost.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.gaji)},0)
    // const totalBiayaLahan = lahanCost.reduce((s,a) => {return s + parseInt(a.hargaBeli)*parseInt(a.luas)},0)

    // const totalPenjualan = penjualan.reduce((s,a) => {return s + parseInt(a.hargaJual)*parseInt(a.kuantitas)},0)
    // const totalPembelian = pembelian.reduce((s,a) => {return s + parseInt(a.hargaBeli)*parseInt(a.kuantitas)},0)



    // const totalBiayaOverall = totalBiayaDomba + totalBiayaPakan + totalBiayaObat + totalBiayaKandang + totalBiayaPegawai + totalBiayaLahan;

    // const screenWidth = Dimensions.get('window').width - 60;


    //Total Cost
    const totalExpense = parseInt(getSum(isFilter?filteredList:listExpense, "jumlah"))
    const totalIncome = parseInt(getSum(isFilter?filteredListIncome:listIncome, "jumlah"))

    const totalCostGaji = parseInt(getSum(gajiPekerjaList, "jumlah"))
    const totalPembayaranUtang = parseInt(getSum(pembayaranUtangList, "jumlah"))
    const totalPemberianUtang = parseInt(getSum(pemberianUtangList, "jumlah"))
    const totalPembelianStok = parseInt(getSum(pembelianStokList, "jumlah"))
    const totalPembelianAlat = parseInt(getSum(pembelianAlatList, "jumlah"))
    const totalPembelianLain = parseInt(getSum(pengeluaranLainList, "jumlah"))
    const totalTabunganInvestasi = parseInt(getSum(tabunganInvestasiList, "jumlah"))


    //Setting array category
    const [ listCat, setListCat ] = useState([])
    const [ objCategory , setObjCategory ] = useState({
        category:'',
        jumlah: ''
    })

    //Total Selling Product
    const sellingProductList = isFilter?filteredListIncome.filter(function (el) {
       
        return el.kategori == "Penjualan"
    
    }):listIncome.filter(function (el) {
       
            return el.kategori == "Penjualan"
        
    })
    const totalSellingProduct = parseInt(getSum(sellingProductList, "jumlah"))

    //Total Var Cost
    const totalVarCost = isFilter?filteredList.filter(function (val) {
        return val.kategori == "Gaji Pekerja" || val.kategori == "Pembelian Stok"
    }):listExpense.filter(function (val) {
        return val.kategori == "Gaji Pekerja" || val.kategori == "Pembelian Stok"
    })

    const varCost = parseInt(getSum(totalVarCost, "jumlah"))

    const arusKas = totalSellingProduct - varCost
    const profit = totalIncome - (totalExpense);

    const [ showMore, setShowMore ] = useState(false)
    const [ slice, setSlice ] = useState(3)


    const sortData = listExpense.sort((a, b) => {
        let bd = b.jumlah;
        let ad = a.jumlah;
        return bd - ad;
      });

    const [isLoading,setIsLoading ] = useState(true)


    //Setting Range Tanggal
    const [ selectDate, setSelectDate ] = useState({
        fromDate : '',
        toDate: ''
      })
      
    //Check if ToDate > FromDate
    const [ showTanggal, setShowTanggal ] = useState(false)
    const checkingDate = (fromDate, toDate ) => {
        let a = new Date(fromDate)
        let b = new Date(toDate)
  
        if (filterBy[0]['sortBy'] !== "Pilih Tanggal") 
        return true
        if( a > b ) {
            
            setIsDateError(true)
            Alert.alert( "Perhatian!", "Tanggal Dari Harus Lebih Dari Tanggal Sampai", [{ text: "Reset Tanggal", onPress: () => {
                setIsDateError(false)
                setSelectDate({
                    fromDate : '',
                    toDate: ''
                  }) }
            }])
            return false
        } else if(fromDate == '' || toDate == '') {
            console.log("wah")
            Alert.alert( "Perhatian!", "Silakan Isi Tanggal Terlebih Dahulu.")
        } else 
        {
            console.log("aman")
            setIsDateError(false)
        }
        return true
    }
    const [ isDateError, setIsDateError ] = useState(false)

    

    //Filter Functions
    const filterFunction = (filterBy, array, func) => {
        let res = filterBy[0]['sortBy']
        let today = new Date()
        let thisMonth = today.getMonth() 
        let thisYear = today.getFullYear()

        let newList = array.filter((item, i) => {
            if( res == 'Hari Ini') {
                return new Date(new Date(item.tanggal).toISOString().split('T')[0]).toDateString()  == new Date(today.toISOString().split('T')[0]).toDateString()
               
            } else if( res == '7 Hari Terakhir') {
                let priorDate = new Date(new Date().setDate(today.getDate() - 7));
                return new Date(item.tanggal)  >= new Date(priorDate.toISOString().split('T')[0])
               
            } else if( res == '30 Hari Terakhir') {
                let priorDate = new Date(new Date().setDate(today.getDate() - 30));
                return new Date(item.tanggal)  >= new Date(priorDate.toISOString().split('T')[0])
               
            } else if( res == 'Bulan Ini') {
                let itemTanggal = new Date(item.tanggal)
                let month = itemTanggal.getMonth()
                let year = itemTanggal.getFullYear()
                console.log(month)
                return month  == thisMonth && year == thisYear
                
               
            } else if( res == 'Pilih Tanggal') {
                console.log("Nih Pilih Tanggal Yow")
                return new Date(item.tanggal)  >= new Date(selectDate.fromDate) && new Date(item.tanggal)  <= new Date(selectDate.toDate)
            }
            return []
        })
        func(newList)
    }

    
    //Reset Filter
    const resetFilter = () => {
        let startVal = filterList.map((val, i) => {
            return {
                ...val,
                isChecked: false
            }
        })
        setIsFilter(false)
        setFilterBy()
        setFilteredList([])
        setFilteredListIncome([])
        setFilterList(startVal)   
        setSelectDate({
            fromDate : '',
            toDate: ''
          })      
        setShowTanggal(false)
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },1000)
    },[])

    const testLoadSnapshot = () => {
        return firebase
        .firestore()
        .collection("dombastok").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            // console.log(querySnapshot)
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
               
            });
            dispatch({type:'LOAD_DOMBA_DATA',results:items})
            // console.log(items)
            
        })
    }

    const testLoadSnapshotDataPakan = () => {
        return firebase
        .firestore()
        .collection("pakanstok").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_PAKAN_DATA',results:items})
        })
    }


    const loadDataObat = () => {
        return firebase
        .firestore()
        .collection("obatstok").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_OBAT_DATA',results:items})
        })
    }

    const loadKandang = () => {
        return firebase
        .firestore()
        .collection("kandangcost").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_KANDANG_COST',results:items})
        })
    }

    const loadPegawai = () => {
        return firebase
        .firestore()
        .collection("pegawaicost").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_PEGAWAI_COST',results:items})
        })
    }

    const loadLahan = () => {
        return firebase
        .firestore()
        .collection("lahancost").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_LAHAN_COST',results:items})
        })
    }
    
    const loadPurchasing = () => {
        return firebase
        .firestore()
        .collection("purchasing").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_PURCHASING',results:items})
        })
    }

    const loadSelling = () => {
        return firebase
        .firestore()
        .collection("selling").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_SELLING',results:items})
        })
    }

    const loadIncome = () => {
        return firebase
        .firestore()
        .collection("income").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_INCOME',results:items})
        })
    }

    const loadExpense = () => {
        return firebase
        .firestore()
        .collection("expense").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // console.log(items)
            // console.log('Itu items dari snapshot')
            dispatch({type:'LOAD_EXPENSE',results:items})
        })
    }


    const loadProfile = () => {
        return firebase
        .firestore()
        .collection("profile").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            // const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                dispatch({type:'LOAD_PROFILE_DATA',results:newValue})
            });

            
        })
    }
    

    const loadUserProduct = () => {
        
        return firebase
        .firestore()
        .collection("userproduk").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                // let sortNewValue = newValue.sort(sortTipe())
                // console.log("nih userprod" + newValue)
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            // const itemsSort = items.sort(sortTipe('tipe'))
            // console.log("nih itemsSort" + itemsSort)
            
            dispatch({type:'LOAD_USERPRODUK',results:items})
        })
    }

    const loadUserCategoryProduct = () => {
        
        return firebase
        .firestore()
        .collection("userkategoriproduk").where("userId","==",uid)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            
            
            dispatch({type:'LOAD_USER_KATEGORI',results:items})
        })
    }

    const checkProfit = () => {

       
        if(arusKas <= 0){
            setIsProfit(false)
        } else if (profit > 0){
            setIsProfit(true)
        }

    }

    // useEffect(() => {
       
    //         const backAction = () => {
    //             Alert.alert('Perhatian!', 'Anda yakin ingin keluar aplikasi?', [
    //               {
    //                 text: 'Batal',
    //                 onPress: () => null,
    //                 style: 'batal',
    //               },
    //               { text: 'YA', onPress: () => BackHandler.exitApp() },
    //             ]);
    //             return true;
    //           };
          
                
                
    //                 const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    //                 return () => backHandler.remove();
                
              
 
    //   }, []);



    const populateAll = () => {
            testLoadSnapshot()
            testLoadSnapshotDataPakan()
            // loadDataDomba()
            // loadDataPakan()
            // loadDataObat()
            // loadKandang()
            // loadPegawai()
            // loadLahan()
            // loadPurchasing()
            // loadSelling()
            loadExpense()
            loadIncome()
            loadProfile()
            loadUserProduct()
            loadUserCategoryProduct()
    }

    useEffect(() => {
        getData()
        if(uid){  
            console.log('Yeuh Useeffect')
            // populateAll()
        } else {
            console.log('Eweuh UID')
           
        }
        
    },[])
    useEffect(() => {
        if(userObj) {
            getAuth()
        }
       
    },[userObj])
    useEffect(() => {
        if(uid) {
            populateAll()
        }
       
      }, [uid])


    useEffect(() => {
        console.log('jalankan isprofit')
        checkProfit()
    },[profit, arusKas])

    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
        
      }
      function getSum(arr, jumlah) {
        return arr.reduce((total, obj) => {
          if (typeof obj[jumlah] === 'string') {
            return total +  parseInt(obj.jumlah);;
          }
          return total +  parseInt(obj.jumlah);;
        }, 0);
      }
      const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
        return `#${randomColor}`;
      };

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ProfileHeader navigation={navigation}/>
            { haveStockTransaction ? 
            <View style={{flex: 1}}>
                <View style={styles.upperWrapper}>
                    
            
                    {
                        isFilter? 
                        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection:'row' }}>
                            <Text style={{fontSize: 16, }}>Filter Berdasarkan {filterBy[0]['sortBy']} </Text>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                                resetFilter()
                                }}>
                                <MaterialIcons name="clear" size={24} color="black" />
                            </TouchableOpacity>
                        </View>    : 
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                    
                            <Text style={{fontSize: 16, }}>Pilih Periode</Text>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => setFilterVisible(!filterVisible)}>
                                <MaterialIcons name="filter-list" size={24} color="black" />
                            </TouchableOpacity>
                        </View>    
                        
                    }
                                
                </View>
                <View style={styles.componentContainer}>
                    <LaporanComponent title1='Saldo' title2={isProfit} saldo={formatToCurrencyWithoutStyle(profit)} profit={formatToCurrencyWithoutStyle(arusKas)}/>
                </View>
                { (listExpense.length > 0  && !isFilter)|| (filteredList.length > 0 && isFilter) ? 
                <View style={{flex: 1, backgroundColor:'#FFFFFF', alignItems:'center', position: 'relative', bottom: 0}}>
                    
                    <View style={{justifyContent: 'center', alignItems: 'flex-start', width: windowWidth, paddingHorizontal: '5%' }}>      
                        <View style={{paddingHorizontal: 20,  width: windowWidth*.9}}> 
                            <Text style={[styles.textPengeluaran,{textAlign:'left'}]}>Pengeluaran</Text>
                        </View>                  
                    </View>
                    {isLoading ? 
                    <View style={{flex:1,backgroundColor:'#FFFFFF',  alignItems:'center', justifyContent:'center'}}>
                        <ActivityIndicator size="small" color="orange" />
                    </View>:
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {/** Category List **/}
          
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalPembelianStok} category={'Pembelian Stok'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalPembelianAlat} category={'Pembelian Alat dan Mesin'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalPembayaranUtang} category={'Pembayaran Utang'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalPemberianUtang} category={'Pemberian Utang'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalCostGaji} category={'Gaji Pekerja'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalTabunganInvestasi} category={'Tabungan dan Investasi'}/>
                            <ExpenseChart totalExpense={totalExpense} totalCategory={totalPembelianLain} category={'Pengeluaran Lain - lain'}/>
                            </ScrollView>}
                    </View>: 
                    <View style={{flex: 1, height: '30%', width: windowWidth, marginTop: 5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={[styles.textPengeluaran]}>Tidak Ada Pengeluaran</Text>
                    </View>}
                    
            </View>
            :
            <InitialEmpty navigation={navigation}/>
            }
            <FilterLaporanModal filterVisible={filterVisible} setFilterVisible={setFilterVisible} setIsFilter={setIsFilter} filterList={filterList} setFilterList={setFilterList} filterBy={filterBy} setFilterBy={setFilterBy} selectDate={selectDate} setSelectDate={setSelectDate} checkingDate={checkingDate} isDateError={isDateError} setIsDateError={setIsDateError} filterFunction={filterFunction} listExpense={sortData} listIncome={listIncome} setFilteredList={setFilteredList} setFilteredListIncome={setFilteredListIncome} resetFilter={resetFilter} showTanggal={showTanggal} setShowTanggal={setShowTanggal} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor: 'white',
        // position:'relative',
        
    },
    textPengeluaran:{
        fontSize: 26,
        color: '#ED9B83',
        fontWeight: '600', 
    },
    componentContainer:{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeigth*.3,
        // backgroundColor:'red',
       
    },
    upperWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'center',
        marginTop: windowHeigth*.13,
        marginHorizontal: 10,
        paddingHorizontal: 18
    },
    initialEmptyWrapper: {
        flex: 1, 
        marginTop: windowHeigth*.13, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: 20
    },
    imageAndText: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textInitialEmpty: {
        fontSize: 14, 
        fontFamily: 'Inter-SemiBold', 
        marginTop: 30
    },
    btnCatat: {
        width: '90%', 
        backgroundColor: '#ED9B83', 
        padding: 20, 
        borderRadius: 14, 
        alignItems: 'center'
    }
})
