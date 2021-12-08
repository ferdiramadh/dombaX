import React , { useEffect } from 'react'
import { StyleSheet, Text, View , Dimensions, ActivityIndicator} from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import {

    PieChart,

  } from 'react-native-chart-kit'
import LaporanComponent from '../components/laporan/LaporanComponent'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../Firebaseconfig'

export default function LaporanScreen() {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const dombastok = useSelector(state => state.stokReducer.listDomba)
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

    // const loadDataDomba = () => {
      
    //     return firebase
    //     .firestore()
    //     .collection("dombastok").where("userId","==",uid)
    //     .get()
    //     .then((querySnapshot) => {
    //         if(querySnapshot.docs.length === 0){
    //             console.log('TIDAK ada nih')
    //             dispatch({type:'SET_EMPTY_DOMBA_DATA'})
                
    //         } else {
    //             console.log('ada nih')
    //             querySnapshot.forEach( function(doc){
    //                 let newValue = doc.data()
    //                 console.log(newValue);
    //                 dispatch({type:'LOAD_DOMBA_DATA',results:newValue})
                    
    //             });
    //         }

    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
        
    // }
    // const loadDataPakan = () => {
      
    //     return firebase
    //     .firestore()
    //     .collection("pakanstok").where("userId","==",uid)
    //     .get()
    //     .then((querySnapshot) => {
    //         if(querySnapshot.docs.length === 0){
    //             // console.log('TIDAK ada nih')
    //             dispatch({type:'SET_EMPTY_PAKAN_DATA'})
                
    //         } else {
    //             // console.log('ada nih')
    //             querySnapshot.forEach( function(doc){
    //                 let newValue = doc.data()
    //                 dispatch({type:'LOAD_PAKAN_DATA',results:newValue})
                    
    //             });
    //         }
          
        
    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
        
    // }
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



    const populateAll = () => {
            testLoadSnapshot()
            testLoadSnapshotDataPakan()
            // loadDataDomba()
            // loadDataPakan()
            loadDataObat()
            loadKandang()
            loadPegawai()
            loadLahan()
            loadPurchasing()
            loadSelling()
    }

    useEffect(() => {
        if(uid !== 'undefined'){  
            console.log('Yeuh Useeffect')
            populateAll()
        } else {
            console.log('Eweuh UID')
        }
        
    },[])
   
    const data = [
        { name: 'Domba', population: 50, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Pakan', population: 30, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Obat & Vitamin', population: 20, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ]
      const screenWidth = Dimensions.get('window').width - 80;


    return (
      
        <View style={styles.container}>
            <CustomHeder leftSubMenu='Laporan' />
            <View style={styles.componentContainer}>
                <LaporanComponent title='Saldo Akhir' saldo='Rp.50.000.000'/>
                <LaporanComponent title='Rugi' saldo='-Rp.10.000.000'/>
            </View>
            
            
            <View >
            <Text style={styles.textPengeluaran}>Pengeluaran</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
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
            </View>

            </View>
            

                <CustomButton onPress={
                   () => console.log(dombastok.length)
            //         () => {
            //         if(uid !== "undefined"){
            //             loadDataPakan()
            //             console.log('Aya Yeuh UID')
            //         } else {
            //             console.log('Eweuh UID')
            //         }
                    
            //   console.log(uid)
            // }
            }/>
            
            
            
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
