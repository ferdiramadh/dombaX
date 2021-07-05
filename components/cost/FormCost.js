import React, {useState,useEffect} from 'react'
import { StyleSheet, View ,Button, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import KandangForm from './fixcost/kandang/KandangForm'
import PegawaiForm from './fixcost/pegawai/PegawaiForm'
import LahanForm from './fixcost/lahan/LahanForm'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'

const FormCost = ({setModalCostVisible,modalCostVisible}) => {
    const dispatch = useDispatch();
    const costState = useSelector(state => state.costReducer);
    const uid = useSelector(state => state.userReducer.uid)
    const dataKandang = costState.dataKandang
    const dataPegawai = costState.dataPegawai
    const dataLahan = costState.dataLahan

    const [selectedProduct, setSelectedProduct] = useState();
 
    const [test, setTest] = useState({})
    const [ firebaseSetup, setFirebaseSetup ] = useState({
      collection:'',
      typeReducer:''
    })
    // const [dataKandang, setDataKandang] = useState({
    //   tipeKandang:'',
    //   bahanKandang:'',
    //   jumlah:'',
    //   Luas:'',
    //   statusKepemilikan:'',
    //   biayaBuat:''
    // })

    const xfunc = () => {
 
      if(selectedProduct == 'kandang'){
        let z = Object.assign(test,dataKandang)
        setTest(z)
        setFirebaseSetup({
          collection:'kandangcost',
          typeReducer:'STORE_KANDANG_COST'
        })
      } else if(selectedProduct == 'pegawai'){
        let z = Object.assign(test, dataPegawai)
        setTest(z)
        setFirebaseSetup({
          collection:'pegawaicost',
          typeReducer:'STORE_DATA_PEGAWAI'
        })
      } else if(selectedProduct == 'lahan'){
        let z = Object.assign(test, dataLahan)
        setTest(z)
        setFirebaseSetup({
          collection:'lahancost',
          typeReducer:'STORE_DATA_LAHAN'
        })
      }
    }
    const addFixCost = (values) => {
     
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
  
  useEffect(() => {
    xfunc()
  },[selectedProduct])

  // const testAuth = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user != null) {
  //       console.log('We are authenticated now!' + user.uid);
  //     }
    
      
  //   });
  // }

    return (
        <Formik
        initialValues={test}
        onSubmit={(values, actions) => {  
          console.log(values)     
          addFixCost(values)
          setModalCostVisible(!modalCostVisible)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
          <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedProduct(itemValue)
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Jenis Produk'
                        
                        >
                        <Picker.Item label="Jenis Produk" value="jenisproduk" />
                        <Picker.Item label="Kandang" value="kandang" />
                        <Picker.Item label="Pegawai" value="pegawai" />
                        <Picker.Item label="Lahan" value="lahan"  />
                    </Picker>
                </View>
                {/* <Button title='Test User State' onPress={() => console.log(userState.uid)} />
                <Button title='Test Auth' onPress={testAuth} /> */}
                { selectedProduct == 'kandang'? <KandangForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>: null}
                { selectedProduct == 'pegawai'? <PegawaiForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>: null}
                { selectedProduct == 'lahan'? <LahanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue} />: null}

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default FormCost

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
        backgroundColor:'white',
        width:'60%',
        height:50,                       
        borderColor:'black',
        borderWidth:2,                
        borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10
      },
      textInput:{
        backgroundColor:'white',
        width:'60%',
        height:50,                       
        borderColor:'black',
        borderWidth:2,                
        borderRadius:20,
        justifyContent:'center', 
        paddingLeft:20,
        marginVertical:10
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
      }
})

