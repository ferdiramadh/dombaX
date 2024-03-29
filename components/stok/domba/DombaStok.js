import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View ,  Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import firebase from '../../../Firebaseconfig'
import GlobalModalEdit from '../../InventoryComponents/GlobalEditScreen/GlobalModalEdit';
import ProductItem from '../../selectedproduct/ProductItem'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const DombaStok = ({searchItems, isSearch, searchKeyword, isFilter, filterBy, setIsFilter, isTransaction, setSelectedProduct, modalProductVisible, setModalProductVisible, setIsSearch, setSearchItems, deleteOpt, setDeleteOpt}) => {

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

    const deleteProp = {deleteOpt, setDeleteOpt}

    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
        
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
        if(Object.keys(editData).length !== 0) {
            navigation.navigate("DetailProduct",{editData, navigation})
        } if (editData !== undefined) {
        }

    },[editData])

    useEffect(() => {
        if(isSearch) {
           let tempList = searchItems.filter(({id}) => id !== itemId)
           setSearchItems(tempList)
        } 
    },[DATA])

    

    return (
        <View style={styles.container}>
                {isSearch? <View style={{paddingTop: 10}}>
                  
                  <Text style={{marginLeft: 20, marginBottom: 15}}>{searchItems.length} hasil ditemukan untuk "{searchKeyword}"</Text>
                {
                  searchItems.map((item, i) => {
                    return <ProductItem item={item} key={item.id} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} isSearch={isSearch} setIsSearch={setIsSearch} deleteProp={deleteProp}/> 
                  }) 
                }
              </View>: null}

            {DATA.length > 0 && !isSearch && !isFilter? sortData.map((item, i) => {
                return <ProductItem item={item} key={item.id} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteProp={deleteProp}/> 
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
                    return <ProductItem item={item} key={item.id} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteProp={deleteProp}/> 
                  }) : DATA.sort((a, b) => {
                    let bd = parseInt(b.jumlah);
                    let ad = parseInt(a.jumlah);
                    if(filterBy == 'Stok Terendah') {
                        return ad - bd
                    }
                    return bd - ad;
                }).map((item, i) => {
                    return <ProductItem item={item} key={item.id} editItem={editItem} isTransaction={isTransaction} setSelectedProduct={setSelectedProduct} modalProductVisible={modalProductVisible} setModalProductVisible={setModalProductVisible} deleteProp={deleteProp}/> 
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
        position:'relative'
    },
    leftIcon:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width: 100,
        height: 100
    },
    rightSection:{
        width:'80%',
        flexDirection:'column',
    },
    dombaInfo:{
        flexDirection:'row',
        width:'100%',    
    },
    subStokTitle:{
        fontSize: 20,
        fontWeight:'bold'
    },
    leftDombaInfo:{
        width:'60%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft: 5
    },
    rightDombaInfo:{
        width:'40%',
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
        flexDirection:'row',
        paddingLeft: 5
        
    },
    buttonSection:{
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
