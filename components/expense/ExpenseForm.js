import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, View ,TouchableOpacity, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'
import SelectCategoryExpense from '../expense/SelectCategoryExpense'
import { uploadImageProduk } from '../../utils/ImageUpload';
import StockPurchasingForm from './stockpurchasing/StockPurchasingForm';
import EquipmentPurchasingForm from './equipmentpurchasing/EquipmentPurchasingForm'
import DebtPaymentForm from './debtpayment/DebtPaymentForm';
import DebtOfferingForm from './debtoffering/DebtOfferingForm'
import EmployeeSalaryForm from './employeesalary/EmployeeSalaryForm';
import SavingOrInvestingForm from './savingorinvesting/SavingOrInvestingForm';
import OtherExpenseForm from './otherexpenses/OtherExpenseForm';

const ExpenseForm = ({modalTransaction, setModalTransaction}) => {
    const dispatch = useDispatch();
    
    const uid = useSelector(state => state.userReducer.uid)
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [category, setCategory] = useState("Kategori");

    const [ pembelianStok, setPembelianStok ] = useState({
      id: '',
      kategori: '',
      namaTransaksi: '',
      produk:'',
      jumlah: '',
      jumlahProduk: '',
      hargaBeli: '',
      beliDari: '',
      diskon: '',
      pajak:'',
      tanggal: '',
      statusBayar: '',
      tipePembayaran: '',
      deskripsi: '',
      image: ''
  })

  const [ pembelianAlat, setPembelianAlat ] = useState({
    id: '',
    kategori: '',
    namaTransaksi: '',
    produk:'',
    jumlah: '',
    jumlahProduk: '',
    hargaBeli: '',
    beliDari: '',
    diskon: '',
    pajak:'',
    tanggal: '',
    statusBayar: '',
    tipePembayaran: '',
    deskripsi: '',
    image: ''
  })

  const [ pembayaranUtang, setPembayaranUtang ] = useState({
      id: '',
      kategori: '',
      namaTransaksi: '',
      jumlah: '',
      pinjamDari: '',
      bunga:'',
      tanggal: '',
      statusBayar: '',
      deskripsi: '',
      image: ''
  })

  const [ pemberianUtang, setPemberianUtang ] = useState({
      id: '',
      kategori: '',
      namaTransaksi: '',
      jumlah: '',
      peminjam: '',
      bunga:'',
      tanggal: '',
      statusBayar: '',
      deskripsi: '',
      image: ''
  })

  const [ gajiPekerja, setGajiPekerja ] = useState({
    id: '',
    kategori: '',
    namaTransaksi: '',
    jumlah: '',
    namaPekerja: '',
    pajak:'',
    statusBayar: '',
    tanggal: '',
    deskripsi: '',
    image: ''
})

  const [ tabunganInvestasi, setTabunganInvestasi ] = useState({
    id: '',
    kategori: '',
    namaTransaksi: '',
    jumlah: '',
    aktivitas: '',
    tempat: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  })

  const [ pengeluaranLain, setPengeluaranLain ] = useState({
    id: '',
    kategori: '',
    namaTransaksi: '',
    jumlah: '',
    tanggal: '',
    deskripsi: '',
    image: ''
  })

  const [initialData, setInitialData] = useState({})

  const initialDataFunction = () => {
 
    if(category == 'Pembelian Stok'){
      let setData = Object.assign(initialData, pembelianStok)
      setInitialData(setData)
      } else if (category == 'Pembelian Alat dan Mesin') {
        let setData = Object.assign(initialData, pembelianAlat)
        setInitialData(setData)
      } else if (category == 'Pembayaran Utang') {
        let setData = Object.assign(initialData, pembayaranUtang)
        setInitialData(setData)
      } else if (category == 'Pemberian Utang') {
        let setData = Object.assign(initialData, pemberianUtang)
        setInitialData(setData)
      } else if (category == 'Gaji Pekerja') {
        let setData = Object.assign(initialData, gajiPekerja)
        setInitialData(setData)
      } else if(category == 'Tabungan atau Investasi'){
        let setData = Object.assign(initialData, tabunganInvestasi)
        setInitialData(setData)
      } else if(category == 'Pengeluaran Lain-Lain'){
        let setData = Object.assign(initialData, pengeluaranLain)
        setInitialData(setData)
      } 
      
    
  }
useEffect(() => {
  initialDataFunction()
},[category])

  const addTransaction = (values) => {
     
    const datas = {
      id: firebase.firestore()
      .collection("expense")
      .doc().id
  }
  let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}

  if(values.image) {
    uploadImageProduk(values.image, "Expense", datas.id, "expense")
  }
  const newValue = Object.assign(values,addedProperties)
      const db = firebase.firestore();
      db.collection("expense")
      .doc(datas.id)
      .set(newValue)
      dispatch({type:'STORE_EXPENSE',results:newValue})
      
    
  
  }

    return (
        <Formik
        initialValues={initialData}
        onSubmit={(values, actions) => {
          addTransaction(values)
          setModalTransaction(!modalTransaction)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue}) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={styles.textInput} onPress={() => setModalCategoryVisible(!modalCategoryVisible)} >
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={{color:'#474747'}}>{category}</Text>   
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>                
              </TouchableOpacity>
          </View>
          { category == 'Pembelian Stok'? <StockPurchasingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Pembelian Alat dan Mesin'? <EquipmentPurchasingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Pembayaran Utang'? <DebtPaymentForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Pemberian Utang'? <DebtOfferingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Gaji Pekerja'? <EmployeeSalaryForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Tabungan atau Investasi'? <SavingOrInvestingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Pengeluaran Lain-Lain'? <OtherExpenseForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          <SelectCategoryExpense modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />

          </ScrollView>
        )}
      </Formik>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    container:{
    width:'100%',
    flexDirection:'column',
    marginVertical:'10%',
    // backgroundColor:'green'
    
},
    pickerContainer:{
       // position:'absolute',
      // top: 30,
      backgroundColor:'#DFE1E0',
      width:'90%',
      height:50,                       
      // borderColor:'black',
      // borderWidth:2,                
      // borderRadius:20,
      justifyContent:'center', 
      paddingLeft:20,
      marginVertical:10
      },
      textInput:{
        backgroundColor:'#DFE1E0',
        width:'90%',
        height:50,                       
        // borderColor:'black',
        // borderWidth:2,                
        // borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10,
      },
      btnSave:{
        width: '25%',
        height:40,
        backgroundColor:'lightblue',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        position:'absolute',
        borderColor:'grey',
        borderWidth:2,
        bottom:0
      },
      btnSave:{
        backgroundColor:'blue',
        width:'60%',
        height:40,                       
        justifyContent:'center',
        borderRadius:15,
        elevation:4
      }
})
