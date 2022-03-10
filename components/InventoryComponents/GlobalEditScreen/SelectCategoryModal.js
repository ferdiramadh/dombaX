import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MaterialIcons } from '@expo/vector-icons';


  let customFonts = {
    'Baloo': require('../../../assets/font/baloo/Baloo-Regular.ttf'),
  };
const SelectCategoryModal = ({modalVisible, setModalVisible}) => {
   
    const [ fontsLoaded, setFontsLoaded ] = useState(false)
    
    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
      }

    useEffect(() => {
            _loadFontsAsync()
    },[])
    if (!fontsLoaded) {
        return <AppLoading />;
    } 
  return (

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.upperWrap}>
                <TouchableOpacity style={styles.backBtn} onPress={() => setModalVisible(!modalVisible)}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.titleWrap}>
                    <Text style={styles.title}>Kategori Produk Lainnya</Text>
                </View>      
            </View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
        </View>
      </Modal>

  )
}

export default SelectCategoryModal

const styles = StyleSheet.create({
    centeredView: {
      height:'100%',
      backgroundColor:'#FFF',
    },
    modalView: {
      flex: 1,
      
      justifyContent:'center',
      alignItems:'center'
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Baloo',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    upperWrap:{
        width: '100%',
        // backgroundColor:'red',
        height:'10%',
        justifyContent:'space-between',
        padding: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontFamily:'Baloo',
        fontSize:24
    },
    titleWrap:{
        // backgroundColor:'blue',
        width:'90%'
    },
    backBtn:{
        width:'10%',
        // backgroundColor:'green',
    }
  });
  