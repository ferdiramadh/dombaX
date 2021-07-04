import React from 'react'
import { StyleSheet, Text, View , Image, FlatList, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'


const VarCostItem = () => {
    const varCostData = useSelector(state => state.stokReducer)
    const DATA_DOMBA = varCostData.listDomba
    const DATA_PAKAN = varCostData.listPakan
    const DATA_OBAT = varCostData.listObat
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            {  DATA_DOMBA.length !== 0? DATA_DOMBA.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Domba.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.kategori} - {item.jumlah} Ekor</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Rp. {item.hargaBeli}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            {  DATA_PAKAN.length !== 0? DATA_PAKAN.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Pakan.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisPakan} - {item.jumlah} Kg</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Rp. {item.hargaBeli}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            {  DATA_OBAT.length !== 0? DATA_OBAT.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/ObatSuplemen.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisObat} - {item.jumlah} Kg</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Rp. {item.hargaBeli}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
        </View>
       
    ) 
}


export default VarCostItem

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
        paddingTop:'5%'
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
    }
})
