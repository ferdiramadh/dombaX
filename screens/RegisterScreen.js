import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, BackHandler, Alert, ActivityIndicator } from 'react-native'
import firebase from '../Firebaseconfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import emailIcon from '../assets/images/logos/Email.png'
import lockIcon from '../assets/images/logos/Lock.png'
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const signUp = async () => {
        setIsLoading(true)
        try {
            const respons = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const userObj = respons.user
            storeData({ email, password })
            dispatch({ type: 'REGISTER', results: userObj })
            navigation.navigate('RegisterProfile')
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
        setIsLoading(false)
    }
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(value))
        } catch (e) {
            alert("error", e.message)
        }
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
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size="large" /> : null}

            <Image style={styles.imgIcon} source={require('../assets/images/Kiwi_Categories-Icon.png')} />
            <Text style={{ fontFamily: 'Baloo', fontSize: 42 }}>Daftar</Text>

            {/*Sementara Di Hide, jangan dulu dihapus*/}
            {/* <View style={styles.wrapperFbGoogle}>
                <TouchableOpacity style={{ width: '40%', height: '100%', borderRadius: 12,  elevation: 2,  shadowColor: '#000', backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{ width: 20, height: 20, marginRight: 10}} source={require('../assets/images/logos/Google_Icon.png')}/>
                    <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '40%', height: '100%', borderRadius: 12,  elevation: 2,  shadowColor: '#000', backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{ width: 10, height: 25, marginRight: 10}} source={require('../assets/images/logos/Facebook_Icon.png')}/>
                    <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>Facebook</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Poppins', color: '#CCBBCC', fontSize: 18}}>ATAU</Text> */}
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 24, height: 18, marginRight: 10, position: 'absolute', left: 30, zIndex: 2 }} source={emailIcon} />
                <TextInput style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#CBCBCB"
                />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 26, marginRight: 10, position: 'absolute', left: 30, zIndex: 2 }} source={lockIcon} />
                <TextInput style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#CBCBCB"
                    secureTextEntry={secureText}
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30 }} onPress={() => setSecureText(!secureText)}>
                    <Ionicons name={`eye${secureText ? "-off" : ""}-outline`} size={24} color="#CBCBCB" />
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={signUp} style={styles.btn}>
                <Text style={{ fontFamily: 'Baloo', color: '#FFF', fontSize: 32 }}>Daftar</Text>
            </TouchableOpacity>
            <View style={styles.lowerSection}>
                <Text style={{ fontFamily: 'QuickSand', marginRight: 5, fontSize: 16 }}>Sudah Punya Akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ justifyContent: 'center', alignItems: 'center', height: 60 }} >
                    <Text style={{ fontFamily: 'QuickSand-Bold', color: '#ED9B83', fontSize: 16 }}>Masuk</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    imgIcon: {
        width: 120,
        height: 120
    },
    input: {
        width: '90%',
        height: 60,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
        paddingLeft: 50,
        fontFamily: 'Quicksand'
    },
    btn: {
        width: '90%',
        height: 60,
        backgroundColor: '#ED9B83',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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
