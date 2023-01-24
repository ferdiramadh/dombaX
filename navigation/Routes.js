import React, { useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import firebase from '../Firebaseconfig'
import {useSelector, useDispatch} from 'react-redux'
import { ActivityIndicator, LogBox,StyleSheet,View} from 'react-native'
import MyTabs from './BottomTabBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs()
const Routes = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.userReducer.uid)
    const [ isLoading, setIsLoading ] = useState(true)
   
    const [ isSignIn, setIsSignIn ] = useState(false)
    
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value) {
            setIsSignIn(true)
        }
        } catch(e) {
            alert("error", e.message)
        }
    }
  

    useEffect(() => {
        console.log('nih route')
        getData()
        setTimeout(() => {
            setIsLoading(false)
        },1000)
      
        
    },[])

  if(isLoading){
      return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="orange" />
        </View>
      )
  }

    return (
        <NavigationContainer >
            <AuthStack isSignIn={isSignIn}/>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
export default Routes
