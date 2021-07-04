import React from 'react'
import { StyleSheet, Text, View , Image, FlatList, TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import { useSelector} from 'react-redux'

// const DATAX = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       jenisProduk: 'Domba',
//       jenisDomba:'Garut',
//       hargaBeli: 500000,
//       hargaJual: 2500000,
//       usia: 2,
//       berat: 15,
//       kategori:'Penggemukan',
//       jumlah: 30

//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       jenisProduk: 'Domba',
//       jenisDomba:'Impor',
//       hargaBeli: 700000,
//       hargaJual: 3500000,
//       usia: 8,
//       berat: 25,
//       kategori:'Breeding',
//       jumlah: 50
//     },


//   ];

const DombaStok = () => {
    
    const dombaState = useSelector(state => state.stokReducer)
    const DATA = dombaState.listDomba
    
    const formatToCurrency = (value) => <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value, props) => <Text {...props} style={{fontWeight:'bold'}}>{value}</Text>} />
    // const renderItem = ({item}) => {
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.leftIcon}>
    //                 <Image source={require('../../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>
    //             </View>
    //             <View style={styles.rightSection}>
    //                 <Text style={styles.subStokTitle}>{item.jenisProduk} {item.jenisDomba} - {item.jumlah} Ekor</Text>
    //                 <View style={styles.dombaInfo}>
    //                     <View style={styles.leftDombaInfo}>
    //                         <Text style={styles.infoData}>Beli Rp.{item.hargaBeli}</Text>
    //                         <Text style={styles.infoData}>Jual Rp.{item.hargaJual}</Text>
    //                         <Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.kategori}</Text>
    //                     </View>
    //                     <View style={styles.leftDombaInfo}>
    //                         <Text style={styles.infoData}>Berat Rata-Rata: {item.berat}kg</Text>
    //                         <Text style={styles.infoData}>Usia : {item.usia}Bulan</Text>
    //                         <Text style={[styles.infoData,{fontWeight:'bold', color:'red'}]}>Rp. 25.000.000</Text>
    //                     </View>
    //                 </View>
    //             </View> 
    //         </View>
    //         )
    //     )
    // }
    return (
        <View>
            {  DATA.map((item, i) => {
                return(
                    <TouchableOpacity style={styles.container} key={item.id} onPress={() => console.log(DATA)}>
                <View style={styles.leftIcon}>
                    <Image source={require('../../../assets/images/Kiwi_Categories-Icon.png')} style={styles.imgIcon}/>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.subStokTitle}>{item.jenisProduk} {item.jenisDomba} - {item.jumlah} Ekor</Text>
                    <View style={styles.dombaInfo}>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Beli {item.hargaBeli}</Text>
                            <Text style={styles.infoData}>Jual Rp.{item.hargaJual}</Text>
                            <Text style={[styles.infoData,{fontWeight:'bold'}]}>{item.kategori}</Text>
                        </View>
                        <View style={styles.leftDombaInfo}>
                            <Text style={styles.infoData}>Berat Rata-Rata: {item.berat + ' '}kg</Text>
                            <Text style={styles.infoData}>Usia : {item.usia + ''} Bulan</Text>
                            <Text style={[styles.infoData,{fontWeight:'bold', color:'red'}]}>Rp. 25.000.000</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
                )
            })}
        </View>
        
            // <FlatList
            //     data={DATA}
            //     renderItem={renderItem}
            //     keyExtractor={item => item.id}
            // />
       
    ) 
}


export default DombaStok

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
