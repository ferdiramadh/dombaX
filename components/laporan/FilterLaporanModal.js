import React, { useState } from 'react';
import { Alert,  StyleSheet, Text, ToastAndroid, View, Dimensions, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

export const windowWidth = Dimensions.get('window').width;
export const windowHeigth = Dimensions.get('screen').height;


const FilterLaporanModal = ({filterVisible, setFilterVisible, setIsFilter, filterList, setFilterList}) => {

  const [ filterBy, setFilterBy ] = useState();
  const [ showTanggal, setShowTanggal ] = useState(false)

  const checkboxHandler = (value, index) => {
    setIsFilter(true)
    const newValue = filterList.map((checkbox, i) => {
     if (i !== index)
       return {
         ...checkbox,
         isChecked: false,
       }
     if (i === index) {
       const item = {
         ...checkbox,
         isChecked: !checkbox.isChecked,
       }
       return item
     }
    return checkbox
  })
  setFilterList(newValue)
 
  
  setTimeout(() => {
    let filterTrue = newValue.filter((item, i) => {
        return item.isChecked == true
       })

      let res = filterTrue[0]['sortBy']
    if (res !== "Pilih Tanggal" ) {
      setShowTanggal(false)
      setFilterVisible(!filterVisible)
      ToastAndroid.show(`Filter Berdasarkan ${res}`, ToastAndroid.SHORT) 
    } else {
      setShowTanggal(true)
      ToastAndroid.show('Pilih Rentang Tanggal', ToastAndroid.SHORT) 
    }

   
    console.log(filterTrue)
  }, 500)
  
  }    


  return (
   
      <Modal
        backdropColor='white'
        deviceWidth={windowWidth}
        deviceHeight={windowHeigth}
        backdropOpacity={0.8}
        isVisible={filterVisible}
        onSwipeComplete={() => {
          // setFilterList( {
          //   isChecked: false
          // })
          setFilterVisible(!filterVisible)
          setShowTanggal(false)
        }}
        swipeDirection="down"
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.handleModal}></View>
              <View style={styles.filterWrap}>

                { 
                  filterList.map((item, i) => {
                  
                  return (
                    <View style={styles.filterSelection} key={item.id} onPress={() => {
                      setFilterBy(item.sortBy)
                      setIsFilter(true)
                      setFilterVisible(!filterVisible)
                    }}>
                      <Text style={[styles.textFilter,{fontFamily: 'Inter', fontWeight:'bold'}]}>{item.sortBy}</Text>
                      <CheckBox
                      center
                      checked={item.isChecked}
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      onPress={() => checkboxHandler(item, i)}
                    />

                    </View>
                  )
                })}
                {showTanggal? 
                <View>
                  <View style={styles.txtInputWrapper}>
                    <TouchableOpacity style={styles.textInput} onPress={() => null}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{color:'#474747'}}>Pilih Tanggal</Text>   
                            <MaterialIcons name="date-range" size={24} color="black" />    
                        </View>                
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInput} onPress={() => null}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{color:'#474747'}}>Pilih Tanggal</Text>   
                            <MaterialIcons name="date-range" size={24} color="black" />    
                        </View>                
                    </TouchableOpacity>
                  </View>
                  <View style={styles.pilihWrapper}>
                    <Text style={{color:'#474747'}}>Dari</Text>   
                    <Text style={{color:'#474747'}}>Sampai</Text>   
                  </View>
                </View> : null}
              </View> 
          </View>
        </View>
      </Modal>

   
  )
}

export default FilterLaporanModal

const styles = StyleSheet.create({
    centeredView: {
      
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        position:'relative',
       
    },
    modalView: {
      width:windowWidth,
      height:windowHeigth * .6,
      margin: 20,
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      paddingTop: 5,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderWidth:1,
      borderColor:'#DFE1E0',
      position:'absolute',
      bottom:-60,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: 'red',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    handleModal:{
      width: 50,
      height: 8,
      borderRadius: 4,
      backgroundColor:'#DFE1E0',
      marginBottom: windowHeigth * .05
    },
    filterSelection:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal: 5,

    },
    textFilter: {
      fontSize: 18,
    },
    filterWrap:{
     
      width:'80%',
      height: windowHeigth * .1
    },
    txtInputWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: windowWidth *.8,
    },
    textInput:{
      padding: 5,
      width:'45%',
      height:50,                       
      borderColor:'black',
      borderWidth: .8,                
      borderRadius:8,
      justifyContent:'center', 
      
    },
    pilihWrapper :{
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: windowWidth *.8,
    }
  });