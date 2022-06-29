import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View , Dimensions, BackHandler, Alert} from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import { PieChart } from 'react-native-chart-kit'
import LaporanComponent from '../components/laporan/LaporanComponent'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../Firebaseconfig'
import NumberFormat from 'react-number-format';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { windowHeigth, windowWidth } from '../utils/DimensionSetup'


export default function LaporanScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)

    const transactionsData = useSelector(state => state.transactionsReducer)
    const listExpense = transactionsData.listExpense
    const listIncome = transactionsData.listIncome

    const [isProfit, setIsProfit] = useState(true)
    const dombaCost = useSelector(state => state.stokReducer.listDomba)
    const pakanCost = useSelector(state => state.stokReducer.listPakan)
    const obatCost = useSelector(state => state.stokReducer.listObat)

    const kandangCost = useSelector(state => state.costReducer.listKandang)
    const pegawaiCost = useSelector(state => state.costReducer.listPegawai)
    const lahanCost = useSelector(state => state.costReducer.listLahan)

    const penjualan = useSelector(state => state.transactionsReducer.listSelling)
    const pembelian = useSelector(state => state.transactionsReducer.listPurchasing)

    const varCostReduce = (s,a) => {
        return s + parseInt(a.jumlah)*parseInt(a.hargaBeli);
    }

    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />


    const totalBiayaDomba = dombaCost.reduce((s,a) => varCostReduce(s,a),0)
    const totalBiayaPakan = pakanCost.reduce((s,a) => varCostReduce(s,a),0)
    const totalBiayaObat = obatCost.reduce((s,a) => varCostReduce(s,a),0)

    const totalBiayaKandang = kandangCost.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.biayaBuat)},0)
    const totalBiayaPegawai = pegawaiCost.reduce((s,a) => {return s + parseInt(a.jumlah)*parseInt(a.gaji)},0)
    const totalBiayaLahan = lahanCost.reduce((s,a) => {return s + parseInt(a.hargaBeli)*parseInt(a.luas)},0)

    const totalPenjualan = penjualan.reduce((s,a) => {return s + parseInt(a.hargaJual)*parseInt(a.kuantitas)},0)
    const totalPembelian = pembelian.reduce((s,a) => {return s + parseInt(a.hargaBeli)*parseInt(a.kuantitas)},0)



    const totalBiayaOverall = totalBiayaDomba + totalBiayaPakan + totalBiayaObat + totalBiayaKandang + totalBiayaPegawai + totalBiayaLahan;

    const screenWidth = Dimensions.get('window').width - 60;
    const totalExpense = parseInt(getSum(listExpense, "jumlah"))
    const totalIncome = parseInt(getSum(listIncome, "jumlah"))


    const arusKas = 0 - totalExpense + totalIncome;
    const profit = totalIncome - (totalExpense);

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

    const sortTipe = (sortBy) => (a,b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1: -1; 
    

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

       
        if(profit <= 0){
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
        if(uid !== 'undefined'){  
            console.log('Yeuh Useeffect')
            populateAll()
        } else {
            console.log('Eweuh UID')
        }
        
    },[])

    useEffect(() => {
        console.log('jalankan isprofit')
        checkProfit()
    },[profit])

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
      
   


    return (
      
        <View style={styles.container}>
            <StatusBar style='auto' />
            <CustomHeder leftSubMenu='Laporan' />
            <View style={styles.componentContainer}>
                <LaporanComponent title1='Saldo Akhir' title2={isProfit} saldo={formatToCurrency(arusKas)} profit={formatToCurrency(profit)}/>
            </View>
            
            
            <View >
            
            { listExpense.length > 0? 
            <View style={styles.chartContainer}>
            <Text style={styles.textPengeluaran}>Pengeluaran</Text>
                <PieChart
                    data={listExpense.map(data => {
                        let newObj = {
                            population: parseInt(data.jumlah)/totalExpense,
                            name: data.namaTransaksi,
                            color:generateColor(), 
                            legendFontColor: '#7F7F7F', 
                            legendFontSize: 11
                        }
                        return Object.assign(data, newObj)
                    })}
                    width={screenWidth}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                        borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="5"
                    />
            </View>: 
                <View style={{height: '30%', width: windowWidth*.8, marginTop: 5, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.textPengeluaran}>Tidak Ada Pengeluaran</Text>
                </View>}

            </View>
            

                <CustomButton onPress={() => console.log(listExpense.map(data => {
                        let testColor = "#" + Math.floor(Math.random()*16777215).toString(16)
                        let newObj = {
                            population: parseInt(data.jumlah)/totalJumlah,
                            name: data.namaTransaksi,
                            color:testColor, 
                            legendFontColor: '#7F7F7F', 
                            legendFontSize: 15
                        }
                        return Object.assign(data, newObj)
                    }))}/>
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        position:'relative',
        
    },
    textPengeluaran:{
        fontSize: 26,
        color:'#ED9B83',
        fontWeight:'600'
    },
    componentContainer:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'40%',
        // backgroundColor:'red',
        marginTop:60
    },
    chartContainer:{
        width:'100%',
        
        flexDirection:'column',
        justifyContent:'center',
        // backgroundColor:'red',
    }
})
