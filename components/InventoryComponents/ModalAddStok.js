import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import DombaForm from '../stok/domba/DombaForm'
import FormStok from '../stok/FormStok'
import { AntDesign  } from '@expo/vector-icons';

const ModalAddStok = ({modalVisible, setModalVisible}) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    return (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible)
          }}>
          <View style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.3)'} ]}>
            <View style={styles.modalView}>
              {/* <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedProduct(itemValue)
                        }
                        style={{
                         fontSize: 22,
                         fontWeight:'bold',
                          color: 'black',
                        }}
                        prompt='Jenis Produk'
                        
                        >
                        <Picker.Item label="Jenis Produk" value="jenisProduk" />
                        <Picker.Item label="Domba" value="jenisDomba" />
                        <Picker.Item label="Pakan" value="jenisPakan"  />
                        <Picker.Item label="Obat dan Suplemen" value="obatSuplemen" />
                    </Picker>
                </View> */}

                {/* <TouchableHighlight
                    style={{ ...styles.closeButton }}
                    onPress={() => {
                        setModalVisible(!modalVisible)
                    }}>
                    <Text style={styles.textStyle}>X</Text>
                </TouchableHighlight> */}

                <TouchableOpacity
                    style={{ ...styles.closeButton }}
                    onPress={() => {
                        setModalVisible(!modalVisible)
                    }}>
                    <AntDesign name="closecircle" size={24} color="red" />
                    {/* <MaterialCommunityIcons name="close-circle" size={24} color="black" /> */}
                </TouchableOpacity>
                {/* <ScrollView style={styles.container}>
                
                </ScrollView> */}
                <View style={styles.formSection}>
                  <FormStok modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                </View>


                

            </View>
          </View>
        </Modal>
      </View>
    )
}

export default ModalAddStok

const styles = StyleSheet.create({
//   container:{
//     width:'100%',
//     flexDirection:'column',
//     marginBottom:15,
//     borderBottomColor:'lightgrey',
//     borderBottomWidth: 2
// },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        width:'100%',     
    },
    modalView: {
        width:'90%',
        height: 630,
        marginTop: 10,
        backgroundColor:'#FFFFFF',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent:'center',
        padding:10,
        borderWidth:3,
        borderColor:'#DFE1E0'
        // position:'relative'
    },
    closeButton: {
      // backgroundColor: 'white',
      borderRadius: 20,
      padding: 8,
      // elevation: 2,
      position:'absolute',
      bottom:10,
      width:50,
      height:50,
      top:-40,
      right:-20,
      // borderWidth:1
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:16
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    pickerContainer:{
      position:'absolute',
      top: 30,
      backgroundColor:'white',
      width:'60%',
      height:50,                       
      borderColor:'black',
      borderWidth:2,                
      borderRadius:20,
      justifyContent:'center', 
      paddingLeft:20
    },
    formSection:{
      width:'100%',
      // backgroundColor:'orange',
      height:'90%',
      // position:'absolute',
      // bottom:0,
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
    }
  });
