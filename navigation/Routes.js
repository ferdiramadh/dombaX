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
    const [ isSignUp, setIsSignUp ] = useState('Onboarding')
    
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value == 'absba') {
            console.log(value)
            
            setIsSignUp('Register')
            console.log('ada data nih')
            
        } else if (value == 'absba' && uid != "undefined"){
            setIsSignIn(true)
            console.log('NO data nih')
        }
        } catch(e) {
        // error reading value
        }
    }
  

    const populate = () => {
      
      return firebase
      .firestore()
      .collection("dombastok").orderBy('createdAt')
      .get()
      .then((querySnapshot) => {querySnapshot.forEach( function(doc){
          let newValue = doc.data()
          dispatch({type:'STORE_DATA',results:newValue})

      });
      
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      
  }

  const getPakan = () => {
      
    return firebase
    .firestore()
    .collection("pakanstok").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_DATA_PAKAN',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}

const getObat = () => {
      
    return firebase
    .firestore()
    .collection("obatstok").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_DATA_OBAT',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}


const getKandang = () => {
      
    return firebase
    .firestore()
    .collection("kandangcost").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_KANDANG_COST',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}

const getPegawai = () => {
      
    return firebase
    .firestore()
    .collection("pegawaicost").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_DATA_PEGAWAI',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}

const getLahan = () => {
      
    return firebase
    .firestore()
    .collection("lahancost").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_DATA_LAHAN',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}

const getPurchasing = () => {
      
    return firebase
    .firestore()
    .collection("purchasing").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_PURCHASING',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}
const getSelling = () => {
      
    return firebase
    .firestore()
    .collection("selling").orderBy('createdAt')
    .get()
    .then((querySnapshot) => {querySnapshot.forEach( function(doc){
        let newValue = doc.data()
        dispatch({type:'STORE_SELLING',results:newValue})
        
    });
    
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}

    const onAuthStateChanged = (user) => {
        setUser(user)
        if(initializing) setInitializing(false)
    }

  useEffect(() => {

    setTimeout(() => {
        setIsLoading(false)
    },1000)
    getData()
    
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
            {isSignIn? <MyTabs />:<AuthStack isSignUp={isSignUp} />}
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
