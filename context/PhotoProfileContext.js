import { StyleSheet, Text, View } from 'react-native';
import React, {createContext, useState} from 'react';

export const PhotoContext = createContext()
const PhotoProfileProvider = (props) => {

  const [image, setImage] = useState(null);
  return (
    <PhotoContext.Provider value={{image,setImage}}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoProfileProvider;

const styles = StyleSheet.create({});
