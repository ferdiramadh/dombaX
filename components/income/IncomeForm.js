import React, {useState} from 'react'
import { StyleSheet, TextInput, View ,TouchableOpacity, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'
import SelectCategoryIncome from './SelectCategoryIncome';

const IncomeForm = ({modalTransaction, setModalTransaction}) => {
    const dispatch = useDispatch();
    const transactionState = useSelector(state => state.transactionsReducer);
    const uid = useSelector(state => state.userReducer.uid)
    const dataPurchasing = transactionState.dataPurchasing
    const [selectedProduct, setSelectedProduct] = useState();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [category, setCategory] = useState("Kategori");

    const [ firebaseSetup, setFirebaseSetup ] = useState({
      collection:'purchasing',
      typeReducer:'STORE_PURCHASING'
    })

    const addToFirebase = (values) => {
     
      const datas = {
        id: firebase.firestore()
        .collection(firebaseSetup.collection)
        .doc().id
    }
    let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}
    const newValue = Object.assign(values,addedProperties)
        const db = firebase.firestore();
        db.collection(firebaseSetup.collection)
        .doc(datas.id)
        .set(newValue)
        dispatch({type:firebaseSetup.typeReducer,results:newValue})
      
  
}

    const testPicker = [
      {
        id:1,
        label:"Jenis Produk",
        value: "jenisProduk"
      },{
      id:2,
      label:"Hewan Ternak",
      value: "jenisHewanTernak"
      }, {
        id:3,
        label:"Pakan",
        value: "jenisPakan"
      }, {
        id:4,
        label:"Obat dan Vitamin",
        value: "obatSuplemen"
      }
      , {
        id:5,
        label:"Tambah Produk",
        value: "tambahProduk"
      }
    ]
    return (
        <Formik
        initialValues={dataPurchasing}
        onSubmit={(values, actions) => {
          addToFirebase(values)
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

