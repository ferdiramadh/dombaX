import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { formatToCurrencyLight } from '../../../utils/FormatCurrency'
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'

const CapitalDetail = ({data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue }) => {
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
        <View style={[styles.itemWrap, data.bentukModal || isUpdate? {} : {display: 'none'}]}>
            <Text style={styles.subTitle}>Bentuk Modal</Text>
            {isUpdate ? <View style={styles.pickerContainer}>
            <Picker
                selectedValue={values.bentukModal}
                onValueChange={(itemValue, itemIndex) =>
                {
                    setFieldValue('bentukModal',itemValue)
                }
                }
                style={{
                    fontSize: 22,
                    fontWeight:'bold',
                    color: 'black',
                }}
                prompt="Bentuk Modal"
                >
                <Picker.Item label="Uang" value="Uang" />
                <Picker.Item label="Barang" value="Barang" />
            </Picker>
        </View> : data.bentukModal && <Text style={styles.itemText}>{data.bentukModal}</Text> }
        </View>
        <View style={[styles.itemWrap, data.jumlah || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
                value={values.jumlah}
                style={styles.textInput}
                placeholder='Jumlah'
                keyboardType='numeric'
              /> : data.jumlah && <Text style={styles.itemText}>{data.jumlah}</Text>}
            </View>
            <View style={[styles.itemWrap, data.diberikanDari || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Diberikan Dari</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('diberikanDari')}
                onBlur={handleBlur('diberikanDari')}
                value={values.diberikanDari}
                style={styles.textInput}
                placeholder='Diberikan Dari'
              /> : data.diberikanDari && <Text style={styles.itemText}>{data.diberikanDari}</Text>}
            </View>
            <View style={[styles.itemWrap, data.kepemilikanModal || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Kepemilikan Modal</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('kepemilikanModal')}
                onBlur={handleBlur('kepemilikanModal')}
                value={values.kepemilikanModal}
                style={styles.textInput}
                placeholder='Kepemilikan Modal'
              /> : data.kepemilikanModal && <Text style={styles.itemText}>{data.kepemilikanModal}</Text>}
            </View>
            <View style={[styles.itemWrap, data.tanggal || isUpdate? {} : {display: 'none'}]}>
              <Text style={styles.subTitle}>Tanggal Modal Masuk</Text>
              {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggal?values.tanggal:"Tanggal Modal Masuk"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity> : data.tanggal && <Text style={styles.itemText}>{data.tanggal}</Text>}
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

export default CapitalDetail

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