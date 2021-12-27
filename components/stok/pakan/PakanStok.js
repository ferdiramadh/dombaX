import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import GlobalModalEdit from '../../InventoryComponents/GlobalEditScreen/GlobalModalEdit';

const PakanStok = () => {
    
    const dombaState = useSelector(state => state.stokReducer)
    const DATA = dombaState.listPakan;
    const sortData = DATA.sort((a, b) => {
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

    const deleteItem = (item) => {
        Alert.alert(
            "Attention!",
            `Do You Want to Delete "${item.jenisPakan} - ${item.jumlah} " Ekor ?`,
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
                        .collection("pakanstok")
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
        .collection("pakanstok")
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

    const formatToCurrencyLight = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props}>{value}</Text>} />

    return (
        <View>
            {  sortData.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id} onPress={() => console.log(DATA)}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Pakan.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                <View style={styles.upperSection}>
                        <Text style={styles.subStokTitle}>{item.jenisPakan} {item.jenisDomba} - {item.jumlah} Ekor</Text>
                        <View style={styles.buttonSection}>
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
                            <Text style={styles.infoData}>Beli : {formatToCurrencyLight(item.hargaBeli)}</Text>
                            <Text style={styles.infoData}>Produsen : {item.merk}</Text>
                        </View>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Kadaluarsa : {item.kadaluarsa}</Text>
                            <Text style={[styles.infoData,{fontWeight:'bold', color:'red'}]}>{ formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            })}
            <GlobalModalEdit modalVisible={modalVisible} setModalVisible={setModalVisible} data={editData} setEditData={setEditData}/>
        </View>
       
    ) 
}


export default PakanStok

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10
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
        // backgroundColor:'orange',
        width:'80%',
        flexDirection:'column',
    },
    dombaInfo:{
        flexDirection:'row',
        // backgroundColor:'cyan',
        width:'100%',
        
    },
    subStokTitle:{
        fontSize: 20,
        fontWeight:'bold',
    },
    leftDombaInfo:{
        width:'50%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    infoData:{
        fontSize: 16,
        fontWeight:'500',
        marginVertical:5
    },
    upperSection:{
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent:'space-between'
        
    },
    buttonSection:{
        // backgroundColor:'red',
        flexDirection:'row',  
        width:'50%',
        justifyContent:'flex-end',
        position:'absolute',
        right: 10
       
    }
})
