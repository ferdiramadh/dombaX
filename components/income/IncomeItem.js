import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { color } from 'react-native-reanimated'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const IncomeItem = ({item}) => {

    const purchaseCategoryIcon = 
        {
            penjualan: require('../../assets/images/purchasingcategory/Sell.png'),
            modal: require('../../assets/images/purchasingcategory/Request_Money.png'),
            hibah: require('../../assets/images/purchasingcategory/Gift.png'),
            pinjam: require('../../assets/images/purchasingcategory/Lend.png'),
            piutang: require('../../assets/images/purchasingcategory/Piutang.png'),
            
        }

        const [ itemDate, setItemDate ] = useState('')

        useEffect(() => {
            if(item.createdAt) {
                const fireBaseTime = new Date(
                    item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000,
                  );
                  const date = fireBaseTime.toDateString();
                  setItemDate(date.substring(4))
            } else {
                console.log("Kagak ada createdAt")
            }
            
        }, [item])

          
      
      
        //   console.log(date, atTime);
    
  return (
    <TouchableOpacity key={item.id} style={styles.container} onPress={() => console.log(item)}>
        <View style={styles.iconWrapper}>
            {item.kategori == 'Penjualan'?<Image source={purchaseCategoryIcon.penjualan} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Penambahan Modal'?<Image source={purchaseCategoryIcon.modal} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Hibah'?<Image source={purchaseCategoryIcon.hibah} style={styles.img} resizeMode='contain'/>: null  }
            {item.kategori == 'Pinjaman'?<Image source={purchaseCategoryIcon.pinjam} style={styles.img} resizeMode='contain'/>: null  }     
            {item.kategori == 'Piutang'?<Image source={purchaseCategoryIcon.piutang} style={styles.img} resizeMode='contain'/>: null  }     
        </View>
        <View style={styles.mainWrapper}>
            {item.kategori == 'Penjualan'?<Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>{ item.produk}</Text>:  
            <Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>{item.kategori}</Text>}
            {/* {item.kategori == 'Penambahan Modal'?<Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>{}</Text>: null  }
            {item.kategori == 'hibah'?<Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>Hibah</Text>: null  }
            {item.kategori == 'Pinjaman'?<Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>Pinjaman</Text>: null  }     
            {item.kategori == 'Piutang'?<Text style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '600'}}>Piutang</Text>: null  }      */}
            <Text style={{color: '#B3B3B3'}}>{itemDate}</Text>
        </View>
        <View style={styles.rightWrapper}>
            <Text style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold'}}>{item.jumlah}</Text>
            <Text style={{color: '#000'}}>{item.kategori}</Text>
            {item.kategori == 'Penjualan' || item.kategori == 'Pinjaman' || item.kategori == 'Piutang'?
            <View style={[styles.status, item.statusBayar == 'lunas'?{backgroundColor:'#43B88E'}:{backgroundColor:'#EB3223'}]}>
                <Text style={styles.statusText}>{item.statusBayar == 'lunas'?'Lunas': 'Belum Lunas'}</Text>
            </View>: null}
        </View>
    </TouchableOpacity>
  )
}

export default IncomeItem

const styles = StyleSheet.create({
    container:{
        width: windowWidth, 
        height: windowHeigth*.1, 
        // backgroundColor:'red', 
        marginBottom: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingHorizontal: 5
    },
    iconWrapper: {
        height: '100%',
        width: '20%',
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainWrapper: {
        height: '100%',
        width: '40%',
        // backgroundColor:'grey',
        paddingTop: 5,
        paddingLeft: 5
        
    },
    rightWrapper: {
        height: '100%',
        width: '40%',
        // backgroundColor: 'cyan',
        paddingTop: 5,
        paddingRight: 10,
        alignItems: 'flex-end',
    },
    img: {
        width: '60%',
        height: undefined,
        aspectRatio: 1
    //   backgroundColor: 'maroon'
    },
    status: {
        padding: 2,
        height: 25,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 2
    },
    statusText: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontWeight: 'bold'
    }
})