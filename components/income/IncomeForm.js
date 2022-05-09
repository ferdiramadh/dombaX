import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, View ,TouchableOpacity, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'
import SelectCategoryIncome from './SelectCategoryIncome';
import SellingForm from './selling/SellingForm';
import { uploadImageProduk } from '../../utils/ImageUpload';
import CapitalForm from './capital/CapitalForm';
import GrantForm from './grant/GrantForm'
import LoanForm from './loan/LoanForm';
import CreditForm from './credit/CreditForm';

const IncomeForm = ({modalTransaction, setModalTransaction}) => {
    const dispatch = useDispatch();
    const transactionState = useSelector(state => state.transactionsReducer);
    const uid = useSelector(state => state.userReducer.uid)
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [category, setCategory] = useState("Kategori");

    const [ penjualan, setPenjualan ] = useState({
      id: '',
      kategori: 'penjualan',
      produk:'',
      jumlah: '',
      jumlahProduk: '',
      hargaJual: '',
      pembeli: '',
      diskon: '',
      pajak:'',
      tanggalJual: '',
      statusBayar: '',
      tipePembayaran: '',
      batasBayar: '',
      deskripsi: '',
      image: ''

  })

  const [ penambahanModal, setPenambahanModal ] = useState({
      id: '',
      kategori: 'penambahanModal',
      bentukModal:'',
      jumlah: '',
      diberikanDari: '',
      kepemilikanModal: '',
      pajak:'',
      tanggalMasuk: '',
      deskripsi: '',
      image: ''
  })

  const [ hibah, setHibah ] = useState({
      id: '',
      kategori: 'hibah',
      bentukHibah:'',
      jumlah: '',
      diberikanDari: '',
      pajak:'',
      tanggalMasuk: '',
      deskripsi: '',
      image: ''
  })

  const [ pinjaman, setPinjaman ] = useState({
      id: '',
      kategori: 'pinjam',
      jumlah: '',
      pinjamDari: '',
      bunga:'',
      statusBayar: '',
      tanggalPinjam: '',
      deskripsi: '',
      image: ''
  })

  const [ piutang, setPiutang ] = useState({
    id: '',
    kategori: 'piutang',
    jumlah: '',
    dipinjamKe: '',
    bunga:'',
    statusBayar: '',
    tanggalPemberian: '',
    deskripsi: '',
    image: ''
})

  const [initialData, setInitialData] = useState({})

  const initialDataFunction = () => {
 
    if(category == 'penjualan'){
      let setData = Object.assign(initialData, penjualan)
      setInitialData(setData)
      } else if (category == 'Penambahan Modal') {
        let setData = Object.assign(initialData, penambahanModal)
        setInitialData(setData)
      } else if (category == 'Hibah') {
        let setData = Object.assign(initialData, hibah)
        setInitialData(setData)
      } else if (category == 'Pinjaman') {
        let setData = Object.assign(initialData, pinjaman)
        setInitialData(setData)
      } else if (category == 'Piutang') {
        let setData = Object.assign(initialData, piutang)
        setInitialData(setData)
      }
    // } else if(category == 'jenisPakan'){
    //   let z = Object.assign(test, pakanData)
    //   setTest(z)
    //   setFirebaseSetup({
    //     collection:'pakanstok',
    //     typeReducer:'STORE_DATA_PAKAN'
    //   })
    // } else if(category == 'obatSuplemen'){
    //   let z = Object.assign(test, obatData)
    //   setTest(z)
    //   setFirebaseSetup({
    //     collection:'obatstok',
    //     typeReducer:'STORE_DATA_OBAT'
    //   })
    // } else if(category == 'tambahProduk') {
    //   let z = Object.assign(test, addProduct)
    //   setTest(z)
    //   // navigation.navigate("SelectProduct")
    //   // setModalVisible(!modalVisible)
    // }
    
  }
useEffect(() => {
  initialDataFunction()
},[category])

  const addTransaction = (values) => {
     
    const datas = {
      id: firebase.firestore()
      .collection("income")
      .doc().id
  }
  let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}

  if(values.image) {
    uploadImageProduk(values.image, "Income", datas.id, "income")
  }
  const newValue = Object.assign(values,addedProperties)
      const db = firebase.firestore();
      db.collection("income")
      .doc(datas.id)
      .set(newValue)
      dispatch({type:'STORE_INCOME',results:newValue})
      
    
  
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
          { category == 'Penjualan'? <SellingForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Penambahan Modal'? <CapitalForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Hibah'? <GrantForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Pinjaman'? <LoanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          { category == 'Piutang'? <CreditForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} setModalTransaction={setModalTransaction} modalTransaction={modalTransaction}/>: null}
          <SelectCategoryIncome modalCategoryVisible={modalCategoryVisible} setModalCategoryVisible={setModalCategoryVisible} setFieldValue={setFieldValue} setCategory={setCategory} />

          </ScrollView>
        )}
      </Formik>
    )
}

export default IncomeForm

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

