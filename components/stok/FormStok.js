import React, {useState,useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View ,Button, ScrollView,Text} from 'react-native'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import DombaForm from './domba/DombaForm'
import PakanForm from '../stok/pakan/PakanForm'
import ObatForm from '../stok/obatdansuplemen/ObatForm'
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../../Firebaseconfig'
import { useNavigation } from '@react-navigation/native';
import AddProductForm from '../selectedproduct/AddProductForm';
import { uploadImageProduk } from '../../utils/ImageUpload';


const FormStok = ({setModalVisible,modalVisible}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const userProducts = useSelector(state => state.userProductReducer);
    const dataUserProduct = userProducts.dataUserProduct
    const [selectedProduct, setSelectedProduct] = useState();
    
    const [ firebaseSetup, setFirebaseSetup ] = useState({
      collection:'',
      typeReducer:''
    })




    const [ ternakData, setTernakData ] = useState({
        id: '',
        nama: '',
        // jenisHewanTernak:'',
        jenisSpesifik:'',
        deskripsi:'',
        hargaBeli: '',
        usia: '',
        berat: '',
        kategoriHewanTernak:'Penggemukan',
        jumlah: '',
        tipe:'domba',
        image: ''

    })

    const [ pakanData, setPakanData ] = useState({
      id: '',
      nama: '',
      merk:'',
      jumlah: '',
      hargaBeli: '',
      kadaluarsa: '',
      petunjuk:'',
      tipe:'pakan',
      image: ''

  })
 
    const [ obatData, setObatData ] = useState({
      id: '',
      // jenisObat: '',
      nama:'',
      merk:'',
      jumlah: '',
      hargaBeli: '',
      kadaluarsa: '',
      petunjuk:'',
      tipe:'obat',
      image: ''

  })

  const [ addProduct, setAddProduct ] = useState(
    {
      id: '',
      nama: '',
      merk:'',
      jumlah: '',
      hargaBeli: '',
      deskripsi: '',
      kategori:'Kategori',
      satuan:'',
      tipe:'tambahproduk',
      image: ''
    }
  )

  const [test, setTest] = useState({})
  
  const xfunc = () => {
 
    if(selectedProduct == 'jenisHewanTernak'){
      let z = Object.assign(test,ternakData)
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
    } else if(selectedProduct == 'tambahProduk') {
      let z = Object.assign(test, addProduct)
      setTest(z)
      // navigation.navigate("SelectProduct")
      // setModalVisible(!modalVisible)
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


const addUserProduct = (values) => {
     
  const datas = {
    id: firebase.firestore()
    .collection("userproduk")
    .doc().id
}
let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}
const newValue = Object.assign(values,addedProperties)
    const db = firebase.firestore();
    db.collection("userproduk")
    .doc(datas.id)
    .set(newValue)
    dispatch({type:'STORE_DATA_USERPRODUK',results:newValue})
    uploadImageProduk(values.image, "UserProduk", newValue.id, "userproduk")
  

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
          addUserProduct(values)
          setModalVisible(!modalVisible)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
         <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
          {/* <TouchableOpacity style={styles.selectProductButton} onPress={() => {
              navigation.navigate("SelectProduct") 
              setModalVisible(!modalVisible)
              }
            }>
              <Text>Pilih Produk</Text>
            </TouchableOpacity> */}
          <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedProduct(itemValue)
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: '#474747',
                        }}
                        prompt='Jenis Produk'
                        
                        >
                    
                        { testPicker.map((item, i) => {
                          return(
                            <Picker.Item label={item.label} value={item.value} key={item.id} />
                          )
                        })}
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
                        <Picker.Item label="Jenis Domba" value="jenisHewanTernak" />
                        <Picker.Item label="Penggemukan" value="jenisPenggemukan" />
                        <Picker.Item label="Breeding" value="jenisBreeding"  />
                    </Picker>
                </View>             */}
                {/* <Button title='selected product' onPress={() => console.log(selectedProduct)} /> */}
                { selectedProduct == 'jenisHewanTernak'? <DombaForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>: null}
                { selectedProduct == 'jenisPakan'? <PakanForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} />: null}
                { selectedProduct == 'obatSuplemen'? <ObatForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} />: null}
                { selectedProduct == 'tambahProduk'? <AddProductForm handleBlur={handleBlur} handleChange={handleChange} values={values} handleSubmit={handleSubmit} setFieldValue={setFieldValue}/>: null}
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
      },
      selectProductButton:{
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
})

