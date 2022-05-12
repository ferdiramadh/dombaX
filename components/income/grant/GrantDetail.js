import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'

const GrantDetail = ({data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <View>
        <View style={styles.itemWrap}>
            <Text style={styles.subTitle}>Bentuk Hibah</Text>
            {isUpdate ? <View style={styles.pickerContainer}>
            <Picker
                selectedValue={values.bentukHibah}
                onValueChange={(itemValue, itemIndex) =>
                {
                    setFieldValue('bentukHibah',itemValue)
                }
                }
                style={{
                    fontSize: 22,
                    fontWeight:'bold',
                    color: 'black',
                }}
                prompt="Bentuk Hibah"
                >
                <Picker.Item label="Uang" value="Uang" />
                <Picker.Item label="Barang" value="Barang" />
            </Picker>
        </View> : <Text style={styles.itemText}>{data.bentukHibah}</Text> }
        </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Jumlah</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
                value={values.jumlah}
                style={styles.textInput}
                placeholder='Jumlah Hibah'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.jumlah}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Diberikan Dari</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('diberikanDari')}
                onBlur={handleBlur('diberikanDari')}
                value={values.diberikanDari}
                style={styles.textInput}
                placeholder='Diberikan Dari'
              /> : <Text style={styles.itemText}>{data.diberikanDari}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Tanggal Hibah Masuk</Text>
              {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{values.tanggalMasuk?values.tanggalMasuk:"Tanggal Hibah Masuk"}</Text>   
                    <MaterialIcons name="date-range" size={24} color="black" />    
                </View>                
            </TouchableOpacity> : <Text style={styles.itemText}>{data.tanggalMasuk}</Text>}
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.subTitle}>Pajak</Text>
              {isUpdate ? <TextInput
                onChangeText={handleChange('pajak')}
                onBlur={handleBlur('pajak')}
                value={values.pajak}
                style={styles.textInput}
                placeholder='Pajak'
                keyboardType='numeric'
              /> : <Text style={styles.itemText}>{data.pajak}</Text>}
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

export default GrantDetail

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