import React , { useEffect } from 'react'
import { StyleSheet, Text, View , Dimensions, ActivityIndicator} from 'react-native'
import CustomHeder from '../components/CustomHeder'
import CustomButton from '../components/CustomButton'
import {

    PieChart,

  } from 'react-native-chart-kit'
import LaporanComponent from '../components/laporan/LaporanComponent'
import {useSelector, useDispatch} from 'react-redux'
import firebase from 'firebase'

export default function LaporanScreen() {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const populate = () => {
      
        return firebase
        .firestore()
        .collection("dombastok").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length === 0){
                console.log('TIDAK ada nih')
                dispatch({type:'SET_EMPTY_DOMBA_DATA'})
                
            } else {
                console.log('ada nih')
                querySnapshot.forEach( function(doc){
                    let newValue = doc.data()
                    dispatch({type:'LOAD_DOMBA_DATA',results:newValue})
                    
                });
            }

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    const getPakan = () => {
      
        return firebase
        .firestore()
        .collection("pakanstok").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length === 0){
                console.log('TIDAK ada nih')
                dispatch({type:'SET_EMPTY_PAKAN_DATA'})
                
            } else {
                console.log('ada nih')
                querySnapshot.forEach( function(doc){
                    let newValue = doc.data()
                    dispatch({type:'LOAD_PAKAN_DATA',results:newValue})
                    
                });
            }
          
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }

    const getObat = () => {
      
        return firebase
        .firestore()
        .collection("obatstok").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length === 0){
                console.log('TIDAK ada nih')
                dispatch({type:'SET_EMPTY_OBAT_DATA'})
                
            } else {
            querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'LOAD_OBAT_DATA',results:newValue})
            
        });}
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    
    
    const getKandang = () => {
          
        return firebase
        .firestore()
        .collection("kandangcost").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'STORE_KANDANG_COST',results:newValue})
            
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    
    const getPegawai = () => {
          
        return firebase
        .firestore()
        .collection("pegawaicost").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'STORE_DATA_PEGAWAI',results:newValue})
            
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    
    const getLahan = () => {
          
        return firebase
        .firestore()
        .collection("lahancost").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'STORE_DATA_LAHAN',results:newValue})
            
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    
    const getPurchasing = () => {
          
        return firebase
        .firestore()
        .collection("purchasing").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'STORE_PURCHASING',results:newValue})
            
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }
    const getSelling = () => {
          
        return firebase
        .firestore()
        .collection("selling").where("userId","==",uid)
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newValue = doc.data()
            dispatch({type:'STORE_SELLING',results:newValue})
            
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }

    const populateAll = () => {
            populate()
            getPakan()
            getObat()
            // getKandang()
            // getPegawai()
            // getLahan()
            // getPurchasing()
            // getSelling()
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
                   () => populate()
            //         () => {
            //         if(uid !== "undefined"){
            //             getPakan()
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
