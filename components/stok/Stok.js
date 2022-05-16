import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity , ScrollView} from 'react-native'
import DombaStokSection from './domba/DombaStokSection'
import PakanStokSection from './pakan/PakanStokSection'
import ObatStokSection from './obatdansuplemen/ObatStokSection'
import { useSelector} from 'react-redux'

const Stok = () => {
    const stokState = useSelector(state => state.stokReducer)
    const userProducts = useSelector(state => state.userProductReducer);
    const DATA = userProducts.listUserProduct
    // const DATA = stokState.listDomba
    const DATA_PAKAN = stokState.listPakan
    const DATA_OBAT = stokState.listObat
    

    const sectionShow = () => {
        return(
            <View>
                {
                    DATA.length !== 0 ? <DombaStokSection />: null
                  
                }
                {
                    DATA_PAKAN.length !== 0 ? <PakanStokSection />:null
                }
                {
                    DATA_OBAT.length !== 0 ? <ObatStokSection />:null
                }
            </View>
        )
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
            { DATA.length == 0 ?
            <View style={styles.emptyStokNotif}>
                <Text style={styles.text}>Stok Kamu masih kosong, silahkan tekan <Text style={{fontWeight:'bold'}}>tombol tambah</Text> untuk menambahkan produk </Text>
            </View>:
            <DombaStokSection /> }      
            
            </View>
        </View>
    )
}

export default Stok

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // padding:10,
        // backgroundColor:'purple',
        width:'100%',
       
    },
    insideContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'cyan',
        width:'100%',
       
    },
    text:{
        fontSize: 20,
        fontWeight:'500',
        textAlign:'center',
        fontFamily:'Inter'
    },
    emptyStokNotif:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'50%', 
        paddingHorizontal: 30
    }

})
