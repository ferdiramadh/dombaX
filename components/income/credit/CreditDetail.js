import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { formatToCurrencyLight } from '../../../utils/FormatCurrency'
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'

const CreditDetail = ({data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
                value={values.jumlah}
                style={styles.textInput}
                placeholder='Jumlah Piutang'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.jumlah}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Dipinjamkan Ke</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('dipinjamKe')}
                onBlur={handleBlur('dipinjamKe')}
                value={values.dipinjamKe}
                style={styles.textInput}
                placeholder='Dipinjamkan Ke'
              /> : <Text style={styles.itemText}>{data.dipinjamKe}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Tanggal Pemberian</Text>
              {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggalPemberian?values.tanggalPemberian:"Tanggal Pemberian"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity> : <Text style={styles.itemText}>{data.tanggalPemberian}</Text>}
            </View>
            {isUpdate ?<View style={styles.itemWrap}>
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
            </View> : null }
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Bunga</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('bunga')}
                onBlur={handleBlur('bunga')}
                value={values.bunga}
                style={styles.textInput}
                placeholder='Bunga'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.bunga}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Deskripsi</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('deskripsi')}
                onBlur={handleBlur('deskripsi')}
                value={values.deskripsi}
                style={styles.textInput}
                placeholder='Deskripsi'
              /> : <Text style={styles.itemText}>{data.deskripsi}</Text>}
            </View> 
    </View>
  )
}

export default CreditDetail

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