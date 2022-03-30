import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, Alert, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({item, deleteItem, editItem}) => {
    const navigation = useNavigation();
    const dombaState = useSelector(state => state.stokReducer)
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    // const item = props.item
    // const DATA = dombaState.listDomba;
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



    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    const formatToCurrencyLight = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props}>{value}</Text>} />


    return (
            <TouchableOpacity style={styles.container} key={item.id} 
                    onPress={() =>{
                        console.log(item)
                        navigation.navigate("DetailProduct",{item})
                   }}
                    onLongPress={() => console.log("ni lama beut")}
                    delayLongPress={1000}
                    >
                <View style={styles.leftIcon}>
                    {item.image? <Image source={{ uri: item.image }} style={styles.imgIcon}/>:<Image source={require('../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>}
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.upperSection}>
                        {item.tipe == 'domba'?<Text style={styles.subStokTitle}>{item.nama} {item.jenisSpesifik}</Text>:null}
                        {item.tipe == 'pakan'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
                        {item.tipe == 'obat'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
                        {item.tipe == 'tambahproduk'?<Text style={styles.subStokTitle}>{item.nama}</Text>:null}
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
                            {item.tipe == 'domba' && item.kategoriHewanTernak != ''?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.kategoriHewanTernak}</Text>:null}
                            <Text style={styles.infoData}>Harga Beli: {formatToCurrencyLight(parseInt(item.hargaBeli))}</Text>
                            {item.tipe == 'domba'?<Text style={styles.infoData}>Berat Rata - Rata: {item.berat + ' '}kg</Text>:null}
                            {item.tipe == 'tambahproduk'?<Text style={styles.infoData}>Kategori: {item.kategori}</Text>:null}
                            {item.tipe == 'pakan' || item.tipe == 'obat'?<Text style={styles.infoData}>Produsen: {item.merk}</Text>:null}
                            {item.tipe == 'domba'?<Text style={styles.infoData}>Usia : {item.usia} Bulan</Text>:null}
                            {item.tipe == 'pakan' || item.tipe == 'obat'?<Text style={styles.infoData}>Kadaluarsa : {item.kadaluarsa}</Text>:null}
                        </View>
                        <View style={styles.rightDombaInfo}>
                            <Text style={styles.infoData}></Text>
                            <Text style={styles.infoData}></Text>
                            {item.tipe == 'domba'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah} Ekor</Text>:null}
                            {item.tipe == 'pakan'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah} Kg</Text>:null}
                            {item.tipe == 'obat'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah} Buah</Text>:null}
                            {item.tipe == 'tambahproduk'?<Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.jumlah} {item.satuan}</Text>:null}
                            <Text style={[styles.totalHarga]}>{ formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
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
        borderBottomWidth: 1,
        borderBottomColor:'lightgrey'
        
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
        // justifyContent:'center',
        alignItems:'flex-start',
        padding: 5
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
        justifyContent:'space-between',
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
