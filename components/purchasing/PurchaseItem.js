import React from 'react'
import { StyleSheet, Text, View , Image, FlatList, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector} from 'react-redux'

const PurchaseItem = () => {
    const transactionSData = useSelector(state => state.transactionsReducer)
    const purchasingData = transactionSData.listPurchasing
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            {   purchasingData.length !== 0? purchasingData.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                        <View style={styles.leftIcon}>
                            <Image source={require('../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>
                        </View>
                        <View style={styles.rightSection}>
                            <View style={styles.upperRight}>
                                <View style={styles.titleUpperRight}>
                                    <Text style={styles.subStokTitle}>{item.produk} - {item.kuantitas} Ekor</Text>
                                </View>
                                <View style={styles.iconUpperRight}>
                                    <TouchableOpacity>
                                        <MaterialIcons name="cloud-download" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name="pencil" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.dombaInfo}>
                                <View style={styles.leftDombaInfo}>
                                    <Text style={styles.infoData}>Rp. {item.hargaBeli}</Text>
                                    <Text style={{fontSize: 20 ,color:'black'}}>{item.tanggalBeli}</Text>
                                </View>
                                <View style={styles.rightDombaInfo}>
                                    <View style={[styles.status,item.status == 'Belum Lunas'? {backgroundColor:'#FA0E0E'}:{backgroundColor:'#0EFA33'}]}>
                                        <Text style={styles.statusText}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View> 
                    </TouchableOpacity>
                )
            }):null}
        </View>
       
    ) 
}


export default PurchaseItem

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'green',
        flexDirection:'row',
        marginBottom: 10,
      
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
        paddingTop:'5%',
        paddingHorizontal:10
    },
    upperRight:{
        // backgroundColor:'yellow',
        flexDirection:'row',
    },
    titleUpperRight:{
        width:'80%'
    },
    iconUpperRight:{
        width:'20%',
        flexDirection:'row',
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
        color:'red'
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
        borderRadius: 10
    },
    statusText:{
        fontSize: 18,
        fontWeight:'bold',
        color:'white'
    }
})
