import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View ,  Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import firebase from '../../../Firebaseconfig'
import GlobalModalEdit from '../../InventoryComponents/GlobalEditScreen/GlobalModalEdit';
import ProductItem from '../../selectedproduct/ProductItem'
import { MaterialIcons } from '@expo/vector-icons';
import { deleteCollection, deleteFile } from '../../../utils/ImageUpload';
import { useNavigation } from '@react-navigation/native';


const DombaStok = ({searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isTransaction, setSelectedProduct, modalProductVisible, setModalProductVisible, setIsSearch, setSearchItems, deleteAll}) => {

    const navigation = useNavigation();
    
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
   
    const sortData = DATA.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });
    
    const [modalGlobalVisible, setGlobalModalVisible] = useState(false);
    const [editData, setEditData] = useState({});

    const [ itemId , setItemId ] = useState()


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
                        setItemId(item.id)
                        deleteCollectionAndFile(item)
                    }
                }
            ],
            {
                cancelable: true,
                
            }
        )
        
        
    }

    const deleteCollectionAndFile = (item) => {
        deleteCollection("userproduk", item)
        deleteFile("UserProduk", item)
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
            // setGlobalModalVisible(!modalGlobalVisible)
            console.log("ada nih edit data"+editData)
            navigation.navigate("DetailProduct",{editData, navigation})
        } if (editData !== undefined) {
            console.log("MANA nih edit data")
            // navigation.navigate("DetailProduct",{editData, setEditData})
        }

    },[editData])

    useEffect(() => {
        if(isSearch) {
           let tempList = searchItems.filter(({id}) => id !== itemId)
           setSearchItems(tempList)
        } else {
            console.log("coba set items")
        }

    },[DATA])

    

    return (
        <View style={styles.container}>
                {isSearch? <View style={{paddingTop: 10}}>
                  
                  <Text style={{marginLeft: 20, marginBottom: 15}}>{searchItems.length} hasil ditemukan untuk "{searchKeyword}"</Text>
                {
                  searchItems.map((item, i) => {
                    return <ProductItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} isSearch={isSearch} setIsSearch={setIsSearch} deleteAll={deleteAll}/> 
                  }) 
                }
              </View>: null}

            {DATA.length > 0 && !isSearch && !isFilter? sortData.map((item, i) => {
                return <ProductItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteAll={deleteAll}/> 
                })
             : null}

                {isFilter && filterBy !== undefined? <View style={{paddingTop: 10}}>
                  <View style={{flexDirection:'row', marginBottom: 15}}>
                  <Text style={{marginLeft: 20}}>"{filterBy}".</Text><TouchableOpacity style={{flexDirection:'row'}} onPress={() => setIsFilter(false)}>
                      <Text> Ulang Penyaringan.</Text>
                      <MaterialIcons name="refresh" size={20} color="black" />
                  </TouchableOpacity>
                  </View>
                  
                  
                { filterBy == 'Harga Beli Terendah' || filterBy == 'Harga Beli Tertinggi' ?
                  DATA.sort((a, b) => {
                    let bd = parseInt(b.hargaBeli);
                    let ad = parseInt(a.hargaBeli);
                    if(filterBy == 'Harga Beli Terendah') {
                        return ad - bd
                    }
                    return bd - ad;
                }).map((item, i) => {
                    return <ProductItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteAll={deleteAll}/> 
                  }) : DATA.sort((a, b) => {
                    let bd = parseInt(b.jumlah);
                    let ad = parseInt(a.jumlah);
                    if(filterBy == 'Stok Terendah') {
                        return ad - bd
                    }
                    return bd - ad;
                }).map((item, i) => {
                    return <ProductItem item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteAll={deleteAll}/> 
                  })
                }
              </View>: null}
            <GlobalModalEdit modalVisible={modalGlobalVisible} setModalVisible={setGlobalModalVisible} data={editData} setEditData={setEditData}/>
        </View>
    ) 
}


export default DombaStok

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        // flexDirection:'row',
        // marginBottom: 10,
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
