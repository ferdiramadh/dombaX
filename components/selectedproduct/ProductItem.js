import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, Alert, TouchableOpacity} from 'react-native'
import { useSelector} from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatToCurrencyWithoutStyle } from '../../utils/FormatCurrency'


const imageDefault = {
    "domba": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "tambahproduk": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "pakan": require('../../assets/images/kategori/Pakan.png'),
    "obat": require('../../assets/images/kategori/ObatSuplemen.png')
} 

const ProductItem = ({item, deleteItem, editItem, isTransaction, setSelectedProduct, modalProductVisible, setModalProductVisible}) => {
    const navigation = useNavigation();
    const dombaState = useSelector(state => state.stokReducer)
    const userProducts = useSelector(state => state.userProductReducer);
    const [ deleteMode, setDeleteMode ] = useState(false)
    const DATA = userProducts.listUserProduct
    // const item = props.item
    // const DATA = dombaState.listDomba;
    const sortData = DATA.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });
    const [modalVisible, setModalVisible] = useState(false);
    // const [editData, setEditData] = useState({});



    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
        
    }



    return (
            <TouchableOpacity style={styles.container} key={item.id} 
                    onPress={() =>{
                        if(isTransaction) {
                            setSelectedProduct(item)
                            setModalProductVisible(!modalProductVisible)
                        } else {
                            console.log(item)
                            editItem(item)
                        }
                        
                        
                   }}
                    onLongPress={() => setDeleteMode(true)}
                    delayLongPress={1000}
                    >
                <View style={styles.leftIcon}>
                <Image source={imageDefault[`${item.tipe}`]} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.upperSection}>
                        <View style={styles.upperLeft}>
                        {item.tipe == 'domba'?<Text style={styles.subStokTitle}>{item.nama} {item.jenisSpesifik}</Text>:null}
                        {item.tipe == 'pakan'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
                        {item.tipe == 'obat'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
                        {item.tipe == 'tambahproduk'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
                        {item.tipe == 'domba' && item.kategoriHewanTernak != ''?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.kategoriHewanTernak}</Text>:null}
                        </View>
                        <View style={styles.upperRight}>
                            {item.tipe == 'domba'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah == "0"? <Text style={{color:'red'}}>Stok Habis</Text>:item.jumlah + " Ekor"} </Text>:null}
                            {item.tipe == 'pakan'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah == "0"? <Text style={{color:'red'}}>Stok Habis</Text>:item.jumlah + " Kg"} </Text>:null}
                            {item.tipe == 'obat'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah == "0"? <Text style={{color:'red'}}>Stok Habis</Text>:item.jumlah + " Buah"} </Text>:null}
                            {item.tipe == 'tambahproduk'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah == "0"? <Text style={{color:'red'}}>Stok Habis</Text>: item.jumlah + " " + item.satuan}</Text>:null}
                            {isTransaction || !deleteMode? null :
                            <View style={styles.buttonSection}>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => setDeleteMode(false)}>
                                    <MaterialIcons name="cancel" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => {
                                    deleteItem(item)
                                    setDeleteMode(false)
                                }}>
                                    <MaterialIcons name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>

                    </View>
                    
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                           
                            {item.hargaBeli?<Text style={styles.infoData}>Harga Beli: {formatToCurrencyWithoutStyle(parseInt(item.hargaBeli))}</Text>: null}
                            {/* {item.tipe == 'domba' && item.berat?<Text style={styles.infoData}>Berat Rata - Rata: {item.berat + ' '}kg</Text>:null}
                            {item.tipe == 'tambahproduk' && item.kategori?<Text style={styles.infoData}>Kategori: {item.kategori}</Text>:null}
                            {(item.tipe == 'pakan' || item.tipe == 'obat') && item.merk?<Text style={styles.infoData}>Produsen: {item.merk}</Text>:null}
                            {item.tipe == 'domba' && item.usia?<Text style={styles.infoData}>Usia : {item.usia} Bulan</Text>:null}
                            {(item.tipe == 'pakan' || item.tipe == 'obat' )&& item.kadaluarsa?<Text style={styles.infoData}>Kadaluarsa : {item.kadaluarsa}</Text>:null} */}
                        </View>
                        <View style={styles.rightDombaInfo}>
                            <Text style={[styles.totalHarga]}>{ formatToCurrencyWithoutStyle(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
    ) 
}


export default ProductItem

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 5,
        paddingBottom: 5,
        // borderBottomWidth: 1,
        // borderBottomColor:'lightgrey'
        
    },
    leftIcon:{
        // backgroundColor:'yellow',
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
        // marginRight: 5
    },
    imgIcon:{
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    rightSection:{
        width:'80%',
        flexDirection:'column',
    },
    dombaInfo:{
        flexDirection:'row',
    },
    subStokTitle:{
        fontSize: 20,
        fontWeight:'bold'
    },
    leftDombaInfo:{
        width:'60%',
        padding: 5,
        justifyContent: 'center'
    },
    rightDombaInfo:{
        width:'40%',
        paddingLeft: 5,
        justifyContent: 'center'
    },
    infoData:{
        fontSize: 14,
        fontWeight:'500',
        marginVertical:5
    },
    upperSection:{
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft: 5
        
    },
    buttonSection:{
        flexDirection:'row',  
        width:'50%',
        justifyContent:'flex-end',
       
    },
    totalHarga: {
        color: '#43B88E',
        fontWeight:'bold',
        fontSize: 16
    },
    upperLeft: {
        width: '50%',
        justifyContent: 'flex-end'
    },
    upperRight: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20
    }
    
})
