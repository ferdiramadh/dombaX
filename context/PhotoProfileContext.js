import { StyleSheet, Text, View } from 'react-native';
import React, {createContext, useState, useEffect} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_300Light } from '@expo-google-fonts/inter';


  
export const PhotoContext = createContext()
const PhotoProfileProvider = (props) => {
  let customFonts = {
    'Baloo': require('../assets/font/baloo/Baloo.ttf'),
    'Inter-Light': Inter_300Light,
    'Inter': Inter_400Regular,
    'Poppins': require('../assets/font/poppins/Poppins-Medium.ttf'),
    'PoppinsBold': require('../assets/font/poppins/Poppins-Bold.ttf'),
  };

  const [image, setImage] = useState(null);
  const [ fontsLoaded, setFontsLoaded ] = useState(false)
  const [testStyle, setTestStyle] = useState();  
  const [ topTabTransactionFocus, setTopTabTransactionFocus ] = useState('Income')
    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
        // setTestStyle('Baloo')
      }

    useEffect(() => {
            _loadFontsAsync()
    },[])
    if (!fontsLoaded) {
        return <AppLoading />;
    } 
  return (
    <PhotoContext.Provider value={{image,setImage,testStyle, topTabTransactionFocus, setTopTabTransactionFocus}}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoProfileProvider;

const styles = StyleSheet.create({});
