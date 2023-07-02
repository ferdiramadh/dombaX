import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatToCurrencyLight } from '../../../utils/FormatCurrency'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DisplayedDateWithName } from '../../../utils/DisplayDate'

const SellingDetail = ({ data, isUpdate, showDatepicker, values, handleBlur, handleChange, setFieldValue, isBatasBayar, setIsBatasBayar }) => {
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
      <View style={[styles.itemWrap, data.produk || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Nama Produk</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('produk')}
          onBlur={handleBlur('produk')}
          value={values.produk}
          style={styles.textInput}
          placeholder='Nama Produk'
        /> : data.produk && <Text style={styles.itemText}>{data.produk}</Text>}

      </View>
      <View style={[styles.itemWrap, data.jumlahProduk || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Jumlah</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('jumlahProduk')}
          onBlur={handleBlur('jumlahProduk')}
          value={values.jumlahProduk}
          style={styles.textInput}
          placeholder='Jumlah'
          keyboardType='numeric'
        /> : data.jumlahProduk && <Text style={styles.itemText}>{data.jumlahProduk}</Text>}
      </View>
      <View style={[styles.itemWrap, data.hargaJual || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Harga Jual</Text>
        {isUpdate ? <TextInput
          onChangeText={handleChange('hargaJual')}
          onBlur={handleBlur('hargaJual')}
          value={values.hargaJual}
          style={styles.textInput}
          placeholder='Harga Jual'
          keyboardType='numeric'
        /> : data.hargaJual && <Text style={styles.itemText}>{formatToCurrencyLight(data.hargaJual)}</Text>}
      </View>
      <View style={[styles.itemWrap, data.diskon || isUpdate ? {} : { display: 'none' }]}>
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
      <View style={[styles.itemWrap, data.pajak || isUpdate ? {} : { display: 'none' }]}>
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
      <View style={[styles.itemWrap, data.tanggal || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Tanggal Jual</Text>
        {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.tanggal ? DisplayedDateWithName(values.tanggal) : "Tanggal Terjual"}</Text>
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
      </View> : data.statusBayar && <Text style={styles.itemText}>{data.statusBayar}</Text>}
      <View style={[styles.itemWrap, data.tipePembayaran || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Tipe Pembayaran</Text>
        {isUpdate ? <View style={styles.pickerContainer}>
          <Picker
            selectedValue={values.tipePembayaran}
            onValueChange={(itemValue, itemIndex) => {
              setFieldValue('tipePembayaran', itemValue)
            }
            }
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}
            prompt="Tipe Pembayaran"
          >
            <Picker.Item label="Tunai" value="Tunai" />
            <Picker.Item label="Tempo" value="Tempo" />
          </Picker>
        </View> : data.tipePembayaran && <Text style={styles.itemText}>{data.tipePembayaran}</Text>}
      </View>
      <View style={[styles.itemWrap, data.batasBayar || isUpdate ? {} : { display: 'none' }]}>
        <Text style={styles.subTitle}>Batas Bayar</Text>
        {isUpdate ? <TouchableOpacity style={styles.textInput} onPress={() => {
          setIsBatasBayar(!isBatasBayar)
          showDatepicker()
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Text style={{ color: '#474747' }}>{values.batasBayar ? DisplayedDateWithName(values.batasBayar) : "Batas Bayar"}</Text>
            <MaterialIcons name="date-range" size={24} color="black" />
          </View>
        </TouchableOpacity> : data.batasBayar && <Text style={styles.itemText}>{DisplayedDateWithName(data.batasBayar)}</Text>}
      </View>
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

export default SellingDetail

const styles = StyleSheet.create({
  itemWrap: {
    width: '100%',
    paddingVertical: 5,
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