import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View , Image, TouchableOpacity, Alert} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import firebase from '../../../Firebaseconfig'
import GlobalModalEdit from '../../InventoryComponents/GlobalEditScreen/GlobalModalEdit';


const FixCostItem = () => {
    const fixCostData = useSelector(state => state.costReducer)
    const DATA_KANDANG = fixCostData.listKandang
    const DATA_PEGAWAI = fixCostData.listPegawai
    const DATA_LAHAN = fixCostData.listLahan

    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState({});

    const sortDataKandang = DATA_KANDANG.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });

    const sortDataPegawai = DATA_PEGAWAI.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });

    const sortDataLahan = DATA_LAHAN.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });

    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
        
    }



    const deleteItem = (item, type) => {
        
        Alert.alert(
            "Attention!",
            `Do You Want to Delete This Item ?`,
            [
                {
                    text:"Cancel",
                    onPress: () => Alert.alert("Canceled"),
                    style:'cancel'
                },                {
                    text: "OK",
                    onPress: () => {
                        return firebase
                        .firestore()
                        .collection(type)
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

    const editItem = (item, type) => {
        
         return firebase
        .firestore()
        .collection(type)
        .doc(item.id)
        .get()
        .then((i) => {
            setEditData(i.data());
        })
    }

    useEffect(() => {
        console.log(editData)
        
        if(Object.keys(editData).length !== 0) {
            
            setModalVisible(!modalVisible)
        } if (editData == 'undefined') {
            console.log('kalo gk undefined')

        }

    },[editData])
   
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            
            { DATA_KANDANG.length !== 0? sortDataKandang.map((item, i) => {
                let type='kandangcost'
                return(
                    <TouchableOpacity style={styles.container} key={item.id} >
                        <View style={styles.leftIcon}>
                            <Image source={require(`../../../assets/images/kategori/Kandang.png`)} style={styles.imgIcon}/>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.subStokTitle}>Kandang - {item.jumlah} m2</Text>
                            <Text style={styles.subDetail}>{item.tipeKandang} - {item.bahanKandang}</Text>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.biayaBuat)*parseInt(item.jumlah))}</Text>
                        </View> 
                        <View style={styles.leftDombaInfo}>
                            <View style={styles.buttonSection}>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => deleteItem(item,type)}>
                                    <Feather name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => editItem(item,type)}>
                                    <Feather name="edit" size={24} color="black" />
                                </TouchableOpacity>  
                            </View>          
                        </View>
                    </TouchableOpacity>
                )
            }):null}
            { DATA_PEGAWAI.length !== 0? sortDataPegawai.map((item, i) => {
                let type='pegawaicost'
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                        <View style={styles.leftIcon}>
                            <Image source={require(`../../../assets/images/kategori/Pegawai.png`)} style={styles.imgIcon}/>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.subStokTitle}>Pegawai - {item.jumlah} Orang</Text>
                            <Text style={styles.subDetail}>{item.tipePegawai}</Text>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.gaji)*parseInt(item.jumlah))}</Text>
                        </View> 
                        <View style={styles.leftDombaInfo}>
                        <View style={styles.buttonSection}>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => deleteItem(item,type) }>
                                    <Feather name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => editItem(item,type)}>
                                    <Feather name="edit" size={24} color="black" />
                                </TouchableOpacity>  
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }):null}
            { DATA_LAHAN.length !== 0? sortDataLahan.map((item, i) => {
                let type='lahancost'
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                        <View style={styles.leftIcon}>
                            <Image source={require(`../../../assets/images/kategori/Lahan.png`)} style={styles.imgIcon}/>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.subStokTitle}>Lahan - {item.luas} m2</Text>
                            <Text style={styles.subDetail}>{item.jenisLahan} - {item.lokasi}</Text>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.luas))}</Text>
                        </View> 
                        <View style={styles.leftDombaInfo}>
                        <View style={styles.buttonSection}>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => deleteItem(item, type) }>
                                    <Feather name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:10}} onPress={() => editItem(item,type)}>
                                    <Feather name="edit" size={24} color="black" />
                                </TouchableOpacity>  
                            </View> 
                        </View>
                    </TouchableOpacity>
                )
            }):null}
            <GlobalModalEdit modalVisible={modalVisible} setModalVisible={setModalVisible} data={editData} setEditData={setEditData}/>
        </View>
       
    ) 
}


export default FixCostItem

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor:'lightgrey'
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
        width:'50%',
        flexDirection:'column',
        
    },
    subStokTitle:{
        fontSize: 20,
        fontWeight:'bold'
    },
    subDetail:{
        fontSize: 18,
        fontWeight:'600'
    },
    leftDombaInfo:{
        width:'30%',
        // backgroundColor:'skyblue',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    infoData:{
        fontSize: 22 ,
        fontWeight:'bold',
        marginVertical:5,
        color:'red'
    },
    buttonSection:{
        // backgroundColor:'red',
        flexDirection:'row',  
        width:'100%',
        justifyContent:'flex-end',
        position:'absolute',
        right: 10,
        top: 0
       
    }
})
