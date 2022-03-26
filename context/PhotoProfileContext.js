import { StyleSheet, Text, View } from 'react-native';
import React, {createContext, useState, useEffect} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


  
export const PhotoContext = createContext()
const PhotoProfileProvider = (props) => {
  let customFonts = {
    'Baloo': require('../assets/font/baloo/Baloo.ttf'),
    'Inter': Inter_900Black,
  };

  const [image, setImage] = useState(null);
  const [ fontsLoaded, setFontsLoaded ] = useState(false)
  const [testStyle, setTestStyle] = useState();  
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
    <PhotoContext.Provider value={{image,setImage,testStyle}}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoProfileProvider;

const styles = StyleSheet.create({});
