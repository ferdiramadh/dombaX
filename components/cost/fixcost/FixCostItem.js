import React from 'react'
import { StyleSheet, Text, View , Image, Button, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'


const FixCostItem = () => {
    const fixCostData = useSelector(state => state.costReducer)
    const DATA_KANDANG = fixCostData.listKandang
    const DATA_PEGAWAI = fixCostData.listPegawai
    const DATA_LAHAN = fixCostData.listLahan
   
    const g2 = "Lahan"
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />

    return (
        <View>
            
            { DATA_KANDANG.length !== 0? DATA_KANDANG.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require(`../../../assets/images/kategori/Kandang.png`)} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>Kandang - {item.jumlah} m2</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Rp. {item.biayaBuat}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            { DATA_PEGAWAI.length !== 0? DATA_PEGAWAI.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require(`../../../assets/images/kategori/Pegawai.png`)} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>Pegawai - {item.jumlah} m2</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Rp. {item.gaji}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            }):null}
            { DATA_LAHAN.length !== 0? DATA_LAHAN.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id}>
                <View style={styles.leftIcon}>
                    <Image source={require(`../../../assets/images/kategori/Lahan.png`)} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>Lahan - {item.luas} m2</Text>
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


export default FixCostItem

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
