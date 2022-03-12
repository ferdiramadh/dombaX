import { Alert, Modal, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../CustomButton'
import ModalAddCategoryProduct from '../../selectedproduct/ModalAddCategoryProduct'
import CategoryItem from '../../selectedproduct/CategoryItem'
import {useSelector, useDispatch} from 'react-redux'

  let customFonts = {
    'Baloo': require('../../../assets/font/baloo/Baloo-Regular.ttf'),
  };
const SelectCategoryModal = ({modalVisible, setModalVisible,setFieldValue}) => {
    const dispatch = useDispatch();
    const listCategory = useSelector(state => state.userCategoryProductReducer.listUserCategoryProduct)
    const uid = useSelector(state => state.userReducer.uid)
    const [ fontsLoaded, setFontsLoaded ] = useState(false)
    const [ modalAddCategory , setModalAddCategory ] = useState(false)
    const sortData = listCategory.sort((a, b) => {
      let bd = objToDate(b.createdAt);
      let ad = objToDate(a.createdAt);
      return ad - bd;
  });

  function objToDate (obj) {
    let result = new Date(0);
    if( obj !== null) {
        result.setSeconds(obj.seconds);
        result.setMilliseconds(obj.nanoseconds/1000000);
        return result;
    }
    
}

    
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
          <ScrollView style={styles.modalView}>
            { listCategory.length > 0 ? sortData.map((item, i) => {
              return <CategoryItem name={item.name} key={item.id}/>
            }) :
            <View style={styles.emptyStokNotif}>
                <Text style={styles.text}>Tekan tombol tambah untuk menambahkan kategori baru</Text>
            </View>
            }
          </ScrollView>
        </View>
        <CustomButton onPress={() => setModalAddCategory(!modalAddCategory)}/>
        <ModalAddCategoryProduct modalAddCategory={modalAddCategory} setModalAddCategory={setModalAddCategory} setFieldValue={setFieldValue} uid={uid} listCategory={listCategory}/>
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
     
      // justifyContent:'center',
      // alignItems:'center',
      // backgroundColor:'green',
      marginBottom:'20%'
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
    },
    text:{
        fontSize: 23,
        fontWeight:'500',
        textAlign:'center'
    },
    emptyStokNotif:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'50%'
    }
  });
  