import firebase from '../Firebaseconfig'
import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import {useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import emailIcon from '../assets/images/logos/Email.png'
import lockIcon from '../assets/images/logos/Lock.png'
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    
    const [isLoading,setIsLoading ] = useState(false)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ secureText, setSecureText ] = useState(true)
    

    const signIn = async() => {
        setIsLoading(true)
        try{
            const respons = await firebase.auth().signInWithEmailAndPassword(email,password);
            const userObj = respons.user
            console.log(userObj)
            storeData(userObj.uid)
            dispatch({type:'LOGIN',results:userObj})
            setEmail('')
            setPassword('')
            navigation.navigate('Home')
        }catch(e){
            console.log(e)
            setError(e.toString())
        }
        setTimeout(() => {
            setIsLoading(false)
        },1000)
    }
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }
    if(isLoading){
        return(
          <View style={styles.container}>
              <ActivityIndicator size="large" color="orange" />
          </View>
        )
    }
  
    return (
        <View style={styles.container}>
            <Image style={styles.imgIcon} source={require('../assets/images/Kiwi_Categories-Icon.png')}/>
            <Text style={{ fontFamily: 'Baloo', fontSize: 42}}>Masuk</Text>
            <View style={styles.wrapperFbGoogle}>
                <TouchableOpacity style={{ width: '40%', height: '100%', borderRadius: 12,  elevation: 2,  shadowColor: '#000', backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{ width: 20, height: 20, marginRight: 10}} source={require('../assets/images/logos/Google_Icon.png')}/>
                    <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '40%', height: '100%', borderRadius: 12,  elevation: 2,  shadowColor: '#000', backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{ width: 10, height: 25, marginRight: 10}} source={require('../assets/images/logos/Facebook_Icon.png')}/>
                    <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>Facebook</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>ATAU</Text>
            <Text style={{color:'red'}}>{error}</Text>
            <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
                <Image style={{ width: 30, height: 25, marginRight: 10, position: 'absolute', left: 30,zIndex: 2}} source={emailIcon}/>
                <TextInput style={styles.input}
                    placeholder="EMAIL"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#CBCBCB"
                />
            </View>
            <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
                <Image style={{ width: 30, height: 40, marginRight: 10, position: 'absolute', left: 30,zIndex: 2}} source={lockIcon}/>
                <TextInput style={styles.input}
                placeholder="PASSWORD"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#CBCBCB"
                secureTextEntry={secureText}
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30}} onPress={() => setSecureText(!secureText)}>
                    <Ionicons name={`eye${secureText?"-off":""}-outline`} size={24} color="#CBCBCB"  />
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity onPress={signIn} style={styles.btn}>
                <Text style={{fontFamily:'Baloo', color: '#FFF', fontSize: 32}}>Masuk</Text>
            </TouchableOpacity>
            <View style={styles.lowerSection}>
                <Text style={{fontFamily:'Poppins', marginRight: 5}}>Belum Punya Akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ justifyContent: 'center', alignItems: 'center', height: 60}} >
                    <Text style={{fontFamily:'PoppinsBold', color: '#ED9B83'}}>Daftar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#FFF'
    },
    imgIcon:{
        width: 120,
        height: 120
    },
    input:{
        width: '90%',
        height: 60,
        borderRadius:10,
        padding:10,
        backgroundColor: '#F5F5F5',
        marginVertical:10,
        paddingLeft: 50
    },
    btn:{
        width: '90%',
        height: 60,
        backgroundColor:'#ED9B83',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    wrapperFbGoogle: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    lowerSection: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5, 
    }
})
