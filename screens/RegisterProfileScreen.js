import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity , TextInput,BackHandler,Alert, ActivityIndicator} from 'react-native'
import firebase from '../Firebaseconfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import { Formik } from 'formik';
import FirstPageProfileRegister from '../components/akunDetail/FirstPageProfileRegister';
import SecondPageProfileRegister from '../components/akunDetail/SecondPageProfileRegister';
import * as yup from 'yup'

const RegisterProfileScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('')
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
        jumlahDomba:'',
        omzet:'',
        dapatInfo:'',

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
                <Image style={styles.imgIcon} source={require('../assets/images/Kiwi_Categories-Icon.png')}/>
                { error? <Text style={{color:'red'}}>{error}</Text>:null}
                {
                    nextPage? <SecondPageProfileRegister handleBlur={handleBlur} handleChange={handleChange} values={values} errors={errors} isValid={isValid}/>:<FirstPageProfileRegister handleBlur={handleBlur} handleChange={handleChange} values={values} errors={errors} isValid={isValid}/>
                }
                

                <TouchableOpacity onPress={() => setNextPage(!nextPage)} style={styles.btn}>
                    <Text style={{fontFamily:'Baloo', color: '#FFF'}}>{nextPage?"Sebelumnya":"Selanjutnya"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPage?handleSubmit:onSkip} style={[styles.btn, nextPage?{}:{display: 'none'}]} >
                    <Text style={{fontFamily:'Baloo', color: '#FFF'}}>{nextPage?"Selesai":"Skip"}</Text>
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
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width:150,
        height:150
    },

    btn:{
        width: 181,
        height: 40,
        backgroundColor:'#ED9B83',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    }
})
