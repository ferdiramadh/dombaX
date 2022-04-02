import firebase from '../Firebaseconfig'
import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ActivityIndicator} from 'react-native'
import {useDispatch} from 'react-redux'

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    
    const [isLoading,setIsLoading ] = useState(false)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    

    const signIn = async() => {
        setIsLoading(true)
        try{
            const respons = await firebase.auth().signInWithEmailAndPassword(email,password);
            const userObj = respons.user
            console.log(userObj)
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
            <Text style={{color:'red'}}>{error}</Text>
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
            <TouchableOpacity onPress={
                signIn
                
            } style={styles.btn}>
                <Text>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                <Text>Daftar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

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
        borderColor:'black',
        backgroundColor:'#ED9B83',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        marginBottom:10
    }
})
