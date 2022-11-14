import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity , TextInput,BackHandler,Alert, ActivityIndicator} from 'react-native'
import firebase from '../Firebaseconfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch} from 'react-redux'

const RegisterScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading] = useState(false)

    const signUp = async() => {
        setIsLoading(true)
        let value = 'absba'
        try{
            const respons = await firebase.auth().createUserWithEmailAndPassword(email,password);
            const userObj = respons.user
            await AsyncStorage.setItem('@storage_Key', value)
            console.log(userObj)
            dispatch({type:'REGISTER',results:userObj})
            navigation.navigate('RegisterProfile')
        }catch(err){
            console.log(err)
            setError(err.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  if(isLoading){
    return(
      <View style={styles.container}>
          <ActivityIndicator size="large" color="orange" />
      </View>
    )
}

    return (
        <View style={styles.container}>
            {isLoading?<ActivityIndicator size="large" />:null}
            
            <Image style={styles.imgIcon} source={require('../assets/images/Kiwi_Categories-Icon.png')}/>
            { error? <Text style={{color:'red'}}>{error}</Text>:null}
            <TextInput style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={signUp} style={styles.btn}>
                <Text style={{fontFamily:'Baloo', color: '#FFF'}}>Daftar</Text>
            </TouchableOpacity>
            <Text style={{marginVertical: 5, fontFamily:'Inter'}}>Sudah Punya Akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                <Text style={{ fontFamily:'Inter', fontWeight: '700', color: '#ED9B83'}}>Masuk</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width:250,
        height:250
    },
    input:{
        width: 181,
        height: 40,
        borderColor:'black',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        backgroundColor:'white',
        marginVertical:10
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
