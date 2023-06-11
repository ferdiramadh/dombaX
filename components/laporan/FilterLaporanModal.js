import React, { useState } from 'react';
import { Alert,  StyleSheet, Text, ToastAndroid, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup';

const SelectDateComponent = ({selectDate, isDateError, pickDate}) => {
  return(
    <View>
        <View style={styles.txtInputWrapper}>
          <TouchableOpacity style={[styles.textInput,{borderColor:isDateError?'red':'black'}]} onPress={() => pickDate(true) }>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#474747'}}>{selectDate.fromDate !== ''?selectDate.fromDate: 'Pilih Tanggal'}</Text>   
                  <MaterialIcons name="date-range" size={24} color="black" />    
              </View>                
          </TouchableOpacity>
          <TouchableOpacity style={[styles.textInput,{borderColor:isDateError?'red':'black'}]} onPress={() => pickDate(false) }>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#474747'}}>{selectDate.toDate !== ''?selectDate.toDate: 'Pilih Tanggal'}</Text>   
                  <MaterialIcons name="date-range" size={24} color="black" />    
              </View>                
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.pilihWrapper}>
            <Text style={{color:'#474747',fontSize:14, fontWeight:'700', }}>Dari</Text>   
            <Text style={{color:'#474747',fontSize:14, fontWeight:'700', }}>Sampai</Text>  
          </View> 
        </View>
    </View>
  )
}

const FilterLaporanModal = ({filterVisible, setFilterVisible, setIsFilter, filterList, setFilterList, filterBy, setFilterBy, selectDate, setSelectDate, checkingDate, isDateError, setIsDateError, filterFunction, listExpense, listIncome, setFilteredList, setFilteredListIncome, resetFilter, showTanggal, setShowTanggal  }) => {

  //Pilih Tanggal checkbox

  const [ isFromDate, setIsFromDate ] = useState(true)

  //datetimepicker
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChange = (event, selectedDate) => {
    if(selectedDate && isFromDate){

      setShow(false);
      setSelectDate((prevState) => ({
        ...prevState,
        fromDate: selectedDate.toISOString().split('T')[0]
      }))
       
    } else if(selectedDate && !isFromDate){
      setShow(false);
      setSelectDate((prevState) => ({
        ...prevState,
        toDate: selectedDate.toISOString().split('T')[0]
      }))
    } else {
        console.log("eweuh")
        setShow(false);
        // setFieldValue('tanggal', '')
    }
  };


  const checkboxHandler = (value, index) => {
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
     if (value.isChecked && i === index) {
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
    
    if (res !== 'Pilih Tanggal') {
      
      setShowTanggal(false)
      // setFilterVisible(!filterVisible)
      
    } else {
      setShowTanggal(true)
      ToastAndroid.show('Pilih Rentang Tanggal', ToastAndroid.SHORT) 
    }

    setFilterBy(filterTrue)
    // console.log(filterTrue)
  }, 500)
  
  }    

  const pickDate = (val) => {
    setIsFromDate(val)
    showDatepicker()
  }

  return (
   
      <Modal
        backdropColor='white'
        deviceWidth={windowWidth}
        deviceHeight={windowHeigth}
        backdropOpacity={0.8}
        isVisible={filterVisible}
        onSwipeComplete={() => {
          resetFilter()
          setFilterVisible(!filterVisible)
          setIsDateError(false)
        }}
        swipeDirection="down"
        >
        <View style={styles.centeredView}>
        {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          <View style={styles.modalView}>
            <View style={styles.handleModal}></View>
              <View style={styles.filterWrap}>

                { 
                  filterList.map((item, i) => {
                  
                  return (
                    <View>
                      <View style={styles.filterSelection} key={item.id}>
                        <Text style={[styles.textFilter,{fontFamily: 'Inter', fontWeight:'bold'}]}>{item.sortBy}</Text>
                        <CheckBox
                          center
                          checked={item.isChecked}
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          onPress={() => {
                            if(item.isChecked) {
                              console.log('do nothing')
                            } else {
                              checkboxHandler(item, i)
                            }
                          }}
                      />
                      </View>
                      {(item.sortBy == "Pilih Tanggal" || item.sortBy == 'Nominal Transaksi') && showTanggal && <SelectDateComponent selectDate={selectDate} isDateError={isDateError} pickDate={pickDate}/>} 
                    </View>
                  )
                })}
               
                { filterBy && (
                <TouchableOpacity style={styles.btnPilih} onPress={() => {
                    let check = checkingDate(selectDate.fromDate, selectDate.toDate)
                    if(check) {
                      setIsFilter(true)
                      setFilterVisible(!filterVisible)
                      filterFunction(filterBy, listIncome, setFilteredList, selectDate)
                      ToastAndroid.show(`Filter Berdasarkan ${filterBy[0]['sortBy']}`, ToastAndroid.SHORT)  
                  }
                    }}>
                      <Text style={{fontSize:14, fontWeight:'700', textAlign:'center',color:'#FFF'}}>Pilih</Text>
                </TouchableOpacity> 
                )}
              </View> 
          </View>
        </View>
      </Modal>

   
  )
}

export default FilterLaporanModal

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    modalView: {
      width: windowWidth,
      height: windowHeigth * .6,
      margin: 20,
      backgroundColor: 'red',
      borderTopRightRadius: 20,
      paddingTop: 5,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderWidth: 1,
      borderColor: '#DFE1E0',
      position: 'absolute',
      bottom: -60,
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
      backgroundColor: '#DFE1E0',
      marginBottom: windowHeigth * .05
    },
    filterSelection:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textFilter: {
      fontSize: 18,
    },
    filterWrap:{
      width: '90%',
      height: windowHeigth * .1,
      paddingHorizontal: 10
    },
    txtInputWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: windowWidth *.8,
    },
    textInput:{
      padding: 5,
      width: '45%',
      height: 50,                       
      borderWidth: .8,                
      borderRadius: 8,
      justifyContent:'center', 
    },
    pilihWrapper :{
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: windowWidth *.8,
    },
    btnPilih: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: windowWidth *.8,
      backgroundColor:'#ED9B83',
      borderRadius: 5,
      elevation: 2
    }
  });