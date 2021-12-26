import React from 'react'
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import { parse } from 'react-native-svg';
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'


const VarCostItem = () => {
    const varCostData = useSelector(state => state.stokReducer)
    const DATA_DOMBA = varCostData.listDomba
    const DATA_PAKAN = varCostData.listPakan
    const DATA_OBAT = varCostData.listObat

    const sortDataDomba = DATA_DOMBA.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });

    const sortDataPakan = DATA_PAKAN.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });

    const sortDataObat = DATA_OBAT.sort((a, b) => {
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
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            {  DATA_DOMBA.length !== 0? sortDataDomba.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Domba.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.kategori} - {item.jumlah} Ekor</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
  
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            {  DATA_PAKAN.length !== 0? sortDataPakan.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Pakan.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisPakan} - {item.jumlah} Kg</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            {  DATA_OBAT.length !== 0? sortDataObat.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/ObatSuplemen.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisObat} - {item.jumlah} Kg</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>{formatToCurrency(parseInt(item.hargaBeli)*parseInt(item.jumlah))}</Text>
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
        fontSize: 20 ,
        fontWeight:'bold',
        marginVertical:5,
        color:'red'
    }
})
