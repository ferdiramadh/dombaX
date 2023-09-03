import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DisplayedDateWithName } from '../../../utils/DisplayDate'

const DebtPaymentDetail = ({ data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <View>
      <View style={[styles.itemWrap, data.namaTransaksi || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Nama Transaksi</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('namaTransaksi')}
          onBlur={handleBlur('namaTransaksi')}
          value={values.namaTransaksi}
          style={styles.textInput}
          placeholder='Nama Transaksi'
        /> : data.namaTransaksi && <Text style={styles.itemText}>{data.namaTransaksi}</Text>}
      </View>
      <View style={[styles.itemWrap, data.jumlah || isUpdate ? {} : { display: 'none' }]}>
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
      <View style={[styles.itemWrap, data.pinjamDari || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Pinjam Dari</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('pinjamDari')}
          onBlur={handleBlur('pinjamDari')}
          value={values.pinjamDari}
          style={styles.textInput}
          placeholder='Diberikan Dari'
        /> : data.pinjamDari && <Text style={styles.itemText}>{data.pinjamDari}</Text>}
      </View>
      <View style={[styles.itemWrap, data.bunga || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Bunga</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('bunga')}
          onBlur={handleBlur('bunga')}
          value={values.bunga}
          style={styles.textInput}
          placeholder='Bunga'
          keyboardType='numeric'
        /> : data.bunga && <Text style={styles.itemText}>{data.bunga}</Text>}
      </View>
      <View style={[styles.itemWrap, data.tanggal || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Tanggal Bayar</Text>
        {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.tanggal ? DisplayedDateWithName(values.tanggal) : "Tanggal Bayar"}</Text>
            <MaterialIcons name="date-range" size={24} color="black" />
          </View>
        </TouchableOpacity> : data.tanggal && <Text style={styles.itemText}>{DisplayedDateWithName(data.tanggal)}</Text>}
      </View>
      {isUpdate ? <View style={[styles.itemWrap, data.statusBayar || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Status Bayar</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={values.statusBayar}
            onValueChange={(itemValue, itemIndex) => {
              setFieldValue('statusBayar', itemValue)
            }
            }
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}
            prompt="Status Bayar"
          >
            <Picker.Item label="Lunas" value="Lunas" />
            <Picker.Item label="Belum Lunas" value="Belum Lunas" />
          </Picker>
        </View>
      </View> : null}
      <View style={[styles.itemWrap, data.deskripsi || isUpdate ? {} : { display: 'none' }]}>
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

export default DebtPaymentDetail

const styles = StyleSheet.create({
  itemWrap: {
    width: '100%',
    paddingVertical: 5,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#A8A8A8',
    fontFamily: 'Quicksand'
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Quicksand'
  },
  textInput: {
    backgroundColor: '#DFE1E0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
  },
  pickerContainer: {
    backgroundColor: '#DFE1E0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginVertical: 10
  },
})