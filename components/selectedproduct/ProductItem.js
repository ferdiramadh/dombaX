import React from 'react'
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import { formatToCurrencyWithoutStyle } from '../../utils/FormatCurrency'
import { FontAwesome } from '@expo/vector-icons';

const imageDefault = {
    "domba": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "tambahproduk": require('../../assets/images/Kiwi_Categories-Icon.png'),
    "pakan": require('../../assets/images/kategori/Pakan.png'),
    "obat": require('../../assets/images/kategori/ObatSuplemen.png')
} 

const ProductItem = ({item, editItem, isTransaction, setSelectedProduct, modalProductVisible, setModalProductVisible, deleteProp}) => {
    const { deleteOpt, setDeleteOpt } = deleteProp
    function CheckIfInList (val) {
        let ID = val.id    
        let result = deleteOpt.deletedList.find(x => x.id === ID)  
        if(result)
        return true
        return false 
    }

    function AddOrRemoveList (val) {
        let isInList = CheckIfInList(val)
        if(!isInList) {
            setDeleteOpt(prev => ({...prev, deletedList: [...prev.deletedList, val]}))
        } else if(isInList) {
            let filterDeletedItem = deleteOpt.deletedList.filter(x => x.id != val.id)
            setDeleteOpt(prev => ({...prev, deletedList: filterDeletedItem}))
        }
    }

    return (
            <TouchableOpacity style={styles.container} key={item.id} 
                    onPress={() =>{
                        if(isTransaction) {
                            setSelectedProduct(item)
                            setModalProductVisible(!modalProductVisible)
                        } else {
                            editItem(item)
                        }            
                   }}
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
                            {isTransaction || !deleteOpt.allDelete? null :
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                     {CheckIfInList(item)?<FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity>
                            </View>}
                            { deleteOpt.selectDelete && !deleteOpt.allDelete? 
                            <View style={styles.buttonSection}>
                                <TouchableOpacity onPress={() => AddOrRemoveList(item)}>
                                     {CheckIfInList(item)?<FontAwesome name="check-square" size={19} color="#ED9B83" /> : <View style={styles.square} />}
                                </TouchableOpacity> 
                            </View> : null}
                        </View>

                    </View>
                    
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>         
                            {item.hargaBeli?<Text style={styles.infoData}>Harga Beli: {formatToCurrencyWithoutStyle(parseInt(item.hargaBeli))}</Text>: null}
                        </View>
                        <View style={styles.rightDombaInfo}>
                            <Text style={[styles.totalHarga]} lineBreakMode="tail" numberOfLines={1}>{ formatToCurrencyWithoutStyle(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
    ) 
}


export default ProductItem

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom: 5,
        paddingBottom: 5,  
    },
    leftIcon:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
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
        justifyContent: 'center',
    },
    rightDombaInfo:{
        width:'40%',
        paddingLeft: 5,
        paddingRight: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    infoData:{
        fontSize: 14,
        fontWeight:'500',
        marginVertical:5
    },
    upperSection:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft: 5
        
    },
    buttonSection:{
        flexDirection:'row',  
        padding: 5,
        justifyContent:'flex-end',  
    },
    totalHarga: {
        color: '#43B88E',
        fontWeight:'bold',
        fontSize: 16,
        
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
        paddingRight: 20,
    }, 
    square: {
        width: 18, 
        height: 18, 
        borderWidth: 1
    }
})
