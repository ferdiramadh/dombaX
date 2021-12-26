import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector} from 'react-redux'
import * as Print from 'expo-print';
import firebase from '../../Firebaseconfig'
import GlobalModalEdit from '../InventoryComponents/GlobalEditScreen/GlobalModalEdit';



const SellingItem = () => {
    const transactionSData = useSelector(state => state.transactionsReducer)
    const sellingData = transactionSData.listSelling


    const sortData = sellingData.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState({});

    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
    }

    const printInvoice = (item) => {
        Print.printAsync({
            html:`<!DOCTYPE html>
            <html>
            <head>
                <title></title>
            </head>
            <body>
                <header style="border-bottom: solid;border-width: .2rem;display: flex;justify-content: center;">	
                    <h1>Gembul Invoice</h1>
                </header>
                <div style="margin: auto ;width: 80%;background: orange">
                    <h1>Produk: ${item.produk}</h1>
                    <h2>Jumlah: ${item.kuantitas}</h2>
                    <h2>Harga Jual: ${item.hargaJual}</h2>
                    <h3>Tanggal: ${item.batasBayar}</h3>
                </div>
                
            </body>
            </html>`
        })
    }


    const deleteItem = (item) => {
        Alert.alert(
            "Attention!",
            `Do You Want to Delete "${item.produk} - ${item.kuantitas} " Ekor ?`,
            [
                {
                    text:"Cancel",
                    onPress: () => Alert.alert("Canceled"),
                    style:'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        return firebase
                        .firestore()
                        .collection("selling")
                        .doc(item.id)
                        .delete()
                    }
                }
            ],
            {
                cancelable: true,
                
            }
        )
        
        
    }

    const editItem = (item) => {
        
        return firebase
        .firestore()
        .collection("selling")
        .doc(item.id)
        .get()
        .then((i) => {
            setEditData(i.data());
        })
        
        
    }

    useEffect(() => {
        console.log("Cek Data")
        if(Object.keys(editData).length !== 0) {
            setModalVisible(!modalVisible)
        } if (editData !== undefined) {
            console.log(editData)
        }

    },[editData])
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            {   sellingData.length !== 0? sortData.map((item, i) => {
                return(
                    <View style={styles.container} key={item.id}>
                        <View style={styles.leftIcon}>
                            <Image source={require('../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>
                        </View>
                        <View style={styles.rightSection}>
                            <View style={styles.upperRight}>
                                <View style={styles.titleUpperRight}>
                                    <Text style={styles.subStokTitle}>{item.produk} - {item.kuantitas} Ekor</Text>
                                </View>
                                <View style={styles.iconUpperRight}>
                                    <TouchableOpacity onPress={() => printInvoice(item)}>
                                        <MaterialIcons name="cloud-download" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft:10}} onPress={() => deleteItem(item)}>
                                        <Feather name="trash-2" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft:10}} onPress={() => editItem(item)}>
                                        <Feather name="edit" size={24} color="black" />
                                    </TouchableOpacity>  
                                </View>
                            </View>
                            <View style={styles.dombaInfo}>
                                <View style={styles.leftDombaInfo}>
                                    <Text style={[styles.infoData,item.status !== 'Lunas'? {color:'#FA0E0E'}:{color:'#0EFA33'}]}>{formatToCurrency(item.hargaJual)}</Text>
                                    <Text style={{fontSize: 16 ,color:'black'}}>{item.batasBayar}</Text>
                                </View>
                                <View style={styles.rightDombaInfo}>
                                    <View style={[styles.status,item.status !== 'Lunas'? {backgroundColor:'#FA0E0E'}:{backgroundColor:'#0EFA33'}]}>
                                        <Text style={styles.statusText}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View> 
                    </View>
                )
            }):null}
            <GlobalModalEdit modalVisible={modalVisible} setModalVisible={setModalVisible} data={editData} setEditData={setEditData}/>
        </View>
       
    ) 
}


export default SellingItem

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10,
        borderBottomColor:'lightgrey',
        borderBottomWidth: 1
      
    },
    leftIcon:{
        // backgroundColor:'yellow',
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width: 100,
        height: 100
    },
    rightSection:{
        // backgroundColor:'blue',
        width:'80%',
        flexDirection:'column',
        paddingTop:'5%',
        paddingHorizontal:10,
        paddingBottom:'5%'
    },
    upperRight:{
        // backgroundColor:'yellow',
        flexDirection:'row',
        width:'100%'
    },
    titleUpperRight:{
        width:'70%'
    },
    iconUpperRight:{
        width:'30%',
        flexDirection:'row',
        // backgroundColor:'orange',
        justifyContent:'space-between'
    },
    dombaInfo:{
        flexDirection:'row',
        // backgroundColor:'cyan',
        width:'100%',
        
    },
    subStokTitle:{
        fontSize: 20,
        fontWeight:'bold'
    },
    leftDombaInfo:{
        width:'50%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    infoData:{
        fontSize: 22 ,
        fontWeight:'bold',
        marginVertical:5,
        color:'#0EFA33'
    },
    rightDombaInfo:{
        width:'50%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    status:{
        width:'90%',
        height:50,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
    },
    statusText:{
        fontSize: 18,
        fontWeight:'bold',
        color:'white'
    }
})
