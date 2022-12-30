import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'

const EquipmentPurchasingDetail = ({data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <View>
            <View style={[styles.itemWrap, data.namaTransaksi || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Nama Transaksi</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('namaTransaksi')}
                onBlur={handleBlur('namaTransaksi')}
                value={values.namaTransaksi}
                style={styles.textInput}
                placeholder='Nama Transaksi'
              /> : data.namaTransaksi && <Text style={styles.itemText}>{data.namaTransaksi}</Text>}
            </View>
            <View style={[styles.itemWrap, data.produk || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Nama Produk</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('produk')}
                onBlur={handleBlur('produk')}
                value={values.produk}
                style={styles.textInput}
                placeholder='Nama Produk'
              /> : data.produk && <Text style={styles.itemText}>{data.produk}</Text>}
            </View>
            <View style={[styles.itemWrap, data.jumlah || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
                value={values.jumlah}
                style={styles.textInput}
                placeholder='Jumlah Piutang'
                keyboardType='numeric'
              /> : data.jumlah && <Text style={styles.itemText}>{data.jumlah}</Text>}
            </View>
            <View style={[styles.itemWrap, data.hargaBeli || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Harga Beli</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('hargaBeli')}
                onBlur={handleBlur('hargaBeli')}
                value={values.hargaBeli}
                style={styles.textInput}
                placeholder='Harga Beli'
                keyboardType='numeric'
              /> : data.hargaBeli && <Text style={styles.itemText}>{data.hargaBeli}</Text>}
            </View>
            <View style={[styles.itemWrap, data.beliDari || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Beli Dari</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('beliDari')}
                onBlur={handleBlur('beliDari')}
                value={values.beliDari}
                style={styles.textInput}
                placeholder='Beli Dari'
              /> : data.beliDari && <Text style={styles.itemText}>{data.beliDari}</Text>}
            </View>
            <View style={[styles.itemWrap, data.diskon || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Diskon</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('diskon')}
                onBlur={handleBlur('diskon')}
                value={values.diskon}
                style={styles.textInput}
                placeholder='Diskon'
                keyboardType='numeric'
              /> : data.diskon && <Text style={styles.itemText}>{data.diskon}</Text>}
            </View>
            <View style={[styles.itemWrap, data.pajak || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Pajak</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('pajak')}
                onBlur={handleBlur('pajak')}
                value={values.pajak}
                style={styles.textInput}
                placeholder='Pajak'
                keyboardType='numeric'
              /> : data.pajak && <Text style={styles.itemText}>{data.pajak}</Text>}
            </View>
            <View style={[styles.itemWrap, data.tanggal || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Tanggal Pembelian</Text>
              {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggal?values.tanggal:"Tanggal Pembelian"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity> : data.tanggal && <Text style={styles.itemText}>{data.tanggal}</Text>}
            </View>
            {isUpdate ?<View style={[styles.itemWrap, data.statusBayar || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Status Bayar</Text>
               <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.statusBayar}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                      setFieldValue('statusBayar',itemValue)
                    }
                    }
                    style={{
                      fontSize: 22,
                      fontWeight:'bold',
                      color: 'black',
                    }}
                    prompt="Status Bayar"
                    >
                    <Picker.Item label="Lunas" value="Lunas" />
                    <Picker.Item label="Belum Lunas" value="Belum Lunas" />
                </Picker>
            </View> 
            </View> : data.statusBayar && (
               <View style={styles.itemWrap}>
                <Text style={styles.subTitle}>Status Bayar</Text>
                <Text style={styles.itemText}>{data.statusBayar}</Text> 
              </View>
            )}
            {isUpdate ? <View style={[styles.itemWrap, data.statusBayar || isUpdate? {} : {display: 'none'}]}>
            <Text style={styles.subTitle}>Tipe Pembayaran</Text>
              <View style={styles.pickerContainer}>
            <Picker
                    selectedValue={values.tipePembayaran}
                    onValueChange={(itemValue, itemIndex) =>
                    {
                      setFieldValue('tipePembayaran',itemValue)
                    }
                    }
                    style={{
                      fontSize: 22,
                      fontWeight:'bold',
                      color: 'black',
                    }}     
                    >
                    <Picker.Item label="Tipe Pembayaran" value="status" style={{color:"#ED9B83"}}/>
                    <Picker.Item label="Tunai" value="Tunai" />
                    <Picker.Item label="Tempo" value="Tempo" />
                </Picker>
                </View> 
              </View> : data.tipePembayaran && (
               <View style={styles.itemWrap}>
                <Text style={styles.subTitle}>Tipe Pembayaran</Text>
                <Text style={styles.itemText}>{data.tipePembayaran}</Text> 
              </View>
            )}
            <View style={[styles.itemWrap, data.deskripsi || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Deskripsi</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('deskripsi')}
                onBlur={handleBlur('deskripsi')}
                value={values.deskripsi}
                style={styles.textInput}
                placeholder='Deskripsi'
              /> : data.deskripsi && <Text style={styles.itemText}>{data.deskripsi}</Text>}
            </View> 
    </View>
  )
}

export default EquipmentPurchasingDetail

const styles = StyleSheet.create({
  itemWrap: {
    width: '100%',
    paddingVertical: 5,
    // backgroundColor:'green',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#A8A8A8'
  },
  itemText: {
    fontSize: 18
  },
  textInput: {
    backgroundColor:'#DFE1E0',
    width:'100%',
    height:50,                       
    // borderColor:'black',
    // borderWidth:2,                
    // borderRadius:20,
    justifyContent:'center', 
    paddingLeft:20,
    marginVertical:10,
  }, 
  pickerContainer:{
    backgroundColor:'#DFE1E0',
    width:'100%',
    height:50,                       
    justifyContent:'center', 
    paddingLeft:10,
    marginVertical:10
  },
})