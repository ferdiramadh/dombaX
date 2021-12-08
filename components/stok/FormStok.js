import React, {useState,useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View ,Button, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import DombaForm from './domba/DombaForm'
import PakanForm from '../stok/pakan/PakanForm'
import ObatForm from '../stok/obatdansuplemen/ObatForm'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'


const FormStok = ({setModalVisible,modalVisible}) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const [selectedProduct, setSelectedProduct] = useState();
    
    const [ firebaseSetup, setFirebaseSetup ] = useState({
      collection:'',
      typeReducer:''
    })




    const [ dombaData, setDombaData ] = useState({
        id: '',
        jenisProduk: '',
        jenisDomba:'',
        hargaBeli: '',
        hargaJual:'',
        usia: '',
        berat: '',
        kategori:'Penggemukan',
        jumlah: '',
        tipe:'domba'

    })

    const [ pakanData, setPakanData ] = useState({
      id: '',
      jenisPakan: '',
      merk:'',
      jumlah: '',
      hargaBeli: '',
      kadaluarsa: '',
      petunjuk:'',
      tipe:'pakan'

  })
 
  const [ obatData, setObatData ] = useState({
    id: '',
    jenisObat: '',
    merk:'',
    jumlah: '0',
    hargaBeli: '0',
    kadaluarsa: '',
    petunjuk:'',
    tipe:'pakan'

})

  const [test, setTest] = useState({})
  
  const xfunc = () => {
 
    if(selectedProduct == 'jenisDomba'){
      let z = Object.assign(test,dombaData)
      setTest(z)
      setFirebaseSetup({
        collection:'dombastok',
        typeReducer:'STORE_DATA'
      })
    } else if(selectedProduct == 'jenisPakan'){
      let z = Object.assign(test, pakanData)
      setTest(z)
      setFirebaseSetup({
        collection:'pakanstok',
        typeReducer:'STORE_DATA_PAKAN'
      })
    } else if(selectedProduct == 'obatSuplemen'){
      let z = Object.assign(test, obatData)
      setTest(z)
      setFirebaseSetup({
        collection:'obatstok',
        typeReducer:'STORE_DATA_OBAT'
      })
    }
  }

useEffect(() => {
  xfunc()
},[selectedProduct])
    

  const addDombaStok = (values) => {
     
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
    
//   const populate = () => {
      
//     return firebase
//     .firestore()
//     .collection("dombastok").orderBy('createdAt')
//     .get()
//     .then((querySnapshot) => {querySnapshot.forEach( function(doc){
//         let newValue = doc.data()
//         dispatch({type:'STORE_DATA',results:newValue})
        
//     });
    
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
    
// }
    return (
        <Formik
        initialValues={test}
        onSubmit={(values, actions) => {  
          console.log(values)     
          addDombaStok(values)
          setModalVisible(!modalVisible)
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
                        <Picker.Item label="Jenis Produk" value="jenisProduk" />
                        <Picker.Item label="Domba" value="jenisDomba" />
                        <Picker.Item label="Pakan" value="jenisPakan"  />
                        <Picker.Item label="Obat dan Suplemen" value="obatSuplemen" />
                    </Picker>
                </View>
              {/* <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedShipCategory}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedShipCategory(itemValue)
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Jenis Produk'
                       
                        >
                        <Picker.Item label="Jenis Domba" value="jenisDomba" />
                        <Picker.Item label="Penggemukan" value="jenisPenggemukan" />
                        <Picker.Item label="Breeding" value="jenisBreeding"  />
                    </Picker>
                </View>             */}
                {/* <Button title='selected product' onPress={() => console.log(selectedProduct)} /> */}
                { selectedProduct == 'jenisDomba'? <DombaForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>: null}
                { selectedProduct == 'jenisPakan'? <PakanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} />: null}
                { selectedProduct == 'obatSuplemen'? <ObatForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} />: null}
                {/* <Button title='Save' onPress={handleSubmit} /> */}
                {/* <View style={{width:'100%',}}>
                <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                  <Text style={{fontSize:18, fontWeight:'700', textAlign:'center'}}>Simpan</Text>
                </TouchableOpacity>
                </View> */}

          </View>

          </ScrollView>
        )}
      </Formik>
    )
}

export default FormStok

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

