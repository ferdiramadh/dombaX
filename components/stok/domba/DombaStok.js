import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import GlobalModalEdit from '../../InventoryComponents/GlobalEditScreen/GlobalModalEdit';
import ProductItem from '../../selectedproduct/ProductItem'

const DombaStok = () => {
    
    const dombaState = useSelector(state => state.stokReducer)
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    // const DATA = dombaState.listDomba;
    const sortData = DATA.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalGlobalVisible, setGlobalModalVisible] = useState(false);
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
            "Perhatian!",
            `Hapus item?`,
            [
                {
                    text:"Batal",
                    onPress: () => Alert.alert("Dibatalkan."),
                    style:'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        return firebase
                        .firestore()
                        .collection("userproduk")
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
        .collection("userproduk")
        .doc(item.id)
        .get()
        .then((i) => {
            setEditData(i.data());
        })
        
        
    }

    useEffect(() => {
        console.log("Cek Data")
        if(Object.keys(editData).length !== 0) {
            setGlobalModalVisible(!modalGlobalVisible)
        } if (editData !== undefined) {
            console.log(editData)
        }

    },[editData])

    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    const formatToCurrencyLight = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props}>{value}</Text>} />

    return (
        <View>
            {/* {  sortData.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id} 
                    onPress={() =>{
                        console.log(sortData)
                   }}
                    onLongPress={() => console.log("ni lama beut")}
                    delayLongPress={1000}
                    >
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.upperSection}>
                        <Text style={styles.subStokTitle}>{item.jenisHewanTernak} {item.jenisSpesifik}</Text>
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
                            <Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.kategoriHewanTernak}</Text>
                            <Text style={styles.infoData}>Harga Beli: {formatToCurrencyLight(parseInt(item.hargaBeli))}</Text>
                            <Text style={styles.infoData}>Berat Rata - Rata: {item.berat + ' '}kg</Text>
                            <Text style={styles.infoData}>Usia : {item.usia} Bulan</Text>
                        </View>
                        <View style={styles.rightDombaInfo}>
                            <Text style={styles.infoData}></Text>
                            <Text style={styles.infoData}></Text>
                            <Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah} Ekor</Text>
                            <Text style={[styles.totalHarga]}>{ formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            })} */}
            {sortData.map((item, i) => {
                return <ProductItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} /> 
                })
            }
            <GlobalModalEdit modalVisible={modalGlobalVisible} setModalVisible={setGlobalModalVisible} data={editData} setEditData={setEditData}/>
        </View>
    ) 
}


export default DombaStok

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10,
        position:'relative'
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
        fontWeight:'bold'
    },
    leftDombaInfo:{
        width:'60%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft: 5
    },
    rightDombaInfo:{
        width:'40%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft: 5
    },
    infoData:{
        fontSize: 14,
        fontWeight:'500',
        marginVertical:5
    },
    upperSection:{
        // backgroundColor:'green',
        flexDirection:'row',
        paddingLeft: 5
        
    },
    buttonSection:{
        // backgroundColor:'red',
        flexDirection:'row',  
        width:'50%',
        justifyContent:'flex-end',
        position:'absolute',
        right: 10
       
    },
    totalHarga: {
        color: '#43B88E',
        fontWeight:'bold',
        fontSize: 16
    }
    
})
