import React, {useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import firebase from '../Firebaseconfig'
import { windowWidth } from '../utils/DimensionSetup'
import {useSelector, useDispatch} from 'react-redux'
import { Formik } from 'formik';
import FirstPageProfileRegister from '../components/akunDetail/FirstPageProfileRegister';
import SecondPageProfileRegister from '../components/akunDetail/SecondPageProfileRegister';
import * as yup from 'yup'
import { uploadImageProduk } from '../utils/ImageUpload';
import PhotoSectionOnboarding from '../components/akunDetail/PhotoSectionOnboarding'

const RegisterProfileScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const [ error, setError ] = useState('')
    const [nextPage, setNextPage] = useState(false)
    const [ profileData, setDombaData ] = useState({
        namaDepan:'',
        namaBelakang:'',
        email:'',
        password:'',
        posisi:'',
        namaBisnis:'',
        whatsApp:'',
        domisili:'',
        tanggalLahir:'',
        jumlahHewanTernak:'',
        jenisHewanTernak: '',
        omzet:'',
        dapatInfo:'',
        jenisKelamin: '',
        lokasiBisnis:'',
        image: '',
        imageBisnis: ''

    })
    const addProfile = (values) => {
     
        const datas = {
          id: firebase.firestore()
          .collection('profile')
          .doc().id
      }
      let addedProperties = {id: datas.id, createdAt: firebase.firestore.FieldValue.serverTimestamp(),userId:uid}
      const newValue = Object.assign(values,addedProperties)
          const db = firebase.firestore();
          db.collection('profile')
          .doc(datas.id)
          .set(newValue)
          dispatch({type:'STORE_PROFILE_DATA',results:newValue})
          if(values.image) {
            console.log("upload img profil nih")
            uploadImageProduk(values.image, "Profile", datas.id, "profile", "image")
          }
          if(values.imageBisnis) {
            console.log("upload img bisnis nih")
            uploadImageProduk(values.imageBisnis, "Profile", datas.id, "profile", "imageBisnis")
          }
        
    
  }

    const formValidation = yup.object().shape({
        namaDepan: yup.string().required("Harap Isi Tanggal Nama Anda"),
        domisili: yup.string().required("Harap Isi Domisili Anda"),
    });


   

    // const signUp = async() => {
    //     let value = 'absba'
    //     try{
    //         const respons = await firebase.auth().createUserWithEmailAndPassword(email,password);
    //         const userObj = respons.user
    //         await AsyncStorage.setItem('@storage_Key', value)
    //         console.log(userObj)
    //         dispatch({type:'REGISTER',results:userObj})
    //         navigation.navigate('Home')
    //     }catch(err){
    //         console.log(err)
    //         setError(err.message)
    //     }
    // }

//     useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         { text: 'YES', onPress: () => BackHandler.exitApp() },
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => backHandler.remove();
//   }, []);

  const onSkip = () => {
      console.log("onskip yeuh")
      navigation.navigate('Onboarding')
  }
  
    return (
        <Formik
        initialValues={profileData}
        validationSchema={formValidation}
        onSubmit={(values, actions) => {  
            console.log(values)  
            addProfile(values)
            navigation.navigate('Onboarding')
        }}
      >
           {({ handleChange, handleBlur, handleSubmit, values,setFieldValue, errors, isValid }) => (
            <View style={styles.container}>
              <PhotoSectionOnboarding title={nextPage? "Profil Bisnis" : "Profil"} value={nextPage?values.imageBisnis : values.image} field={nextPage? "imageBisnis" : "image"} setFieldValue={setFieldValue}/>
                { error? <Text style={{color:'red'}}>{error}</Text>:null}
                {
                    nextPage? <SecondPageProfileRegister handleBlur={handleBlur} handleChange={handleChange} values={values} errors={errors} isValid={isValid}/>:<FirstPageProfileRegister handleBlur={handleBlur} handleChange={handleChange} values={values} errors={errors} isValid={isValid}/>
                }
                
                <TouchableOpacity onPress={() => setNextPage(!nextPage)} style={[styles.btn, {   backgroundColor:'#ED9B83'}]}>
                    <Text style={styles.textBtn}>{nextPage?"Sebelumnya":"Selanjutnya"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPage?handleSubmit:onSkip} style={[styles.btn, nextPage?{}:{display: 'none'}, { backgroundColor: '#C4C4C4'}]} >
                    <Text style={styles.textBtn}>{nextPage?"Selesai":"Skip"}</Text>
                </TouchableOpacity>
                {/* { errors && nextPage && <Text style={{fontSize: 14, color: "red", textAlign: 'center'}}>Cek Kembali Form Anda</Text>} */}
            </View>
        )}
        </Formik>
    )
}

export default RegisterProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: '#FFF',
        paddingTop: 20
    },
    imgIcon:{
        width:150,
        height:150
    },
    btn:{
        width: windowWidth * .9,
        height: 60,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    textBtn: {
      fontFamily:'Baloo', 
      color: '#FFF', 
      fontSize:  24
    }
})
