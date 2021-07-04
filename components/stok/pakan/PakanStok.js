import React from 'react'
import { StyleSheet, Text, View , Image, FlatList, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'


const PakanStok = () => {
    
    const dombaState = useSelector(state => state.stokReducer)
    const DATA = dombaState.listPakan
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            {  DATA.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id} onPress={() => console.log(DATA)}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/kategori/Pakan.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisPakan}  - {item.jumlah} kg</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Beli {item.hargaBeli}</Text>
                            <Text style={styles.infoData}>Produsen : {item.merk}</Text>
                        </View>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Kadaluarsa : {item.kadaluarsa}</Text>
                            <Text style={[styles.infoData,{fontWeight:'bold', color:'red'}]}>Rp. 25.000.000</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            })}
        </View>
       
    ) 
}


export default PakanStok

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
        fontSize: 16,
        fontWeight:'500',
        marginVertical:5
    }
})
