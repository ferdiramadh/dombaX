import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid, Alert } from 'react-native';
import Modal from "react-native-modal";
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup';
import { FilterTransactionContext } from '../../context/FilterTransactionContext';
import { CheckBox } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector} from 'react-redux'
import { count } from 'rxjs';

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

const NominalComponent = ({data, setCount, count}) => {

  return(
    <View>
      <View style={styles.txtInputWrapper}>
        <TextInput style={[styles.textInput,{borderColor:'black'}]} 
          placeholder='Rp.'
          keyboardType='numeric'
          onChangeText={(value) => setCount((prev) => ({ ...prev, from: value}))}
          value={count.from}
        />
        <TextInput style={[styles.textInput,{borderColor:'black'}]} 
          placeholder='Rp.'
          keyboardType='numeric'
          onChangeText={(value) => setCount((prev) => ({ ...prev, to: value}))}
          value={count.to}
        />
      </View>
      <View>
        <View style={styles.pilihWrapper}>
          <Text style={{color:'#474747',fontSize:14, fontWeight:'700', }}>Dari</Text>   
          <Text style={{color:'#474747',fontSize:14, fontWeight:'700', }}>Sampai</Text>  
        </View> 
      </View>
      <View style={styles.txtInputWrapper}>
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={count.category}
                onValueChange={(itemValue, itemIndex, prev) =>
                  setCount({...prev, category: itemValue})
                }
                style={{
                  fontSize: 22,
                  fontFamily: 'Inter-Bold',
                  color: "#474747",
                }} 
                prompt="Kategori"
                >
                {data.map((item, index) => <Picker.Item label={item.title} value={item.title} key={index}/>)}
            </Picker>
          </View>
        </View>
    </View>
  )
}
const FilterIncomeModal = ({filterVisible, setFilterVisible, isIncome}) => {
  const { filterBy, setIsFilter, filterList, checkboxHandler, resetFilter, transactionCategories, showTanggal, filterFunction, setFilteredList} = useContext(FilterTransactionContext)
  
 
  const incomeCategories = transactionCategories.purchaseCategories
  const expenseCategories = transactionCategories.sellingCategories

  const transactionsData = useSelector(state => state.transactionsReducer)
  const listIncome = transactionsData.listIncome
  const listExpense = transactionsData.listExpense
  //Setting Nominal
  const [ count, setCount ] = useState({
    from : 0,
    to : 0,
    category: incomeCategories[0].title
  })


  //Setting Range Tanggal
  const [ selectDate, setSelectDate ] = useState({
    fromDate : '',
    toDate: ''
  })
  
  //Check if ToDate > FromDate
 
  const checkingDate = (fromDate, toDate ) => {
      let a = new Date(fromDate)
      let b = new Date(toDate)

      if (filterBy[0]['sortBy'] !== "Pilih Tanggal") 
      return true
      if( a > b ) {
          
          setIsDateError(true)
          Alert.alert( "Perhatian!", "Tanggal Dari Harus Lebih Dari Tanggal Sampai", [{ text: "Reset Tanggal", onPress: () => {
              setIsDateError(false)
              setSelectDate({
                  fromDate : '',
                  toDate: ''
                }) }
          }])
          return false
      } else if(fromDate == '' || toDate == '') {
          console.log("wah")
          Alert.alert( "Perhatian!", "Silakan Isi Tanggal Terlebih Dahulu.")
      } else 
      {
          console.log("aman")
          setIsDateError(false)
      }
      return true
  }


  const [ isDateError, setIsDateError ] = useState(false)
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
  const pickDate = (val) => {
    setIsFromDate(val)
    showDatepicker()
  }
  function reset() {
    resetFilter()
    setFilterVisible(!filterVisible)
  }

  return (
      <Modal
        backdropColor='white'
        deviceWidth={windowWidth}
        deviceHeight={windowHeigth}
        backdropOpacity={0.8}
        isVisible={filterVisible}
        onSwipeComplete={reset}
        onBackdropPress={reset}
        onBackButtonPress={reset}
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
                { filterList.map((item, i) => {
                  return (
                    <View>
                      <View style={styles.filterSelection} key={item.id}>
                          <Text style={[styles.textFilter,{fontFamily: 'Inter-SemiBold'}]}>{item.sortBy}</Text>
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
                      {item.sortBy == "Pilih Tanggal" && showTanggal && <SelectDateComponent selectDate={selectDate} isDateError={isDateError} pickDate={pickDate}/>}
                      {item.sortBy == "Nominal Transaksi" && filterBy?.[0]['sortBy'] == "Nominal Transaksi" && <NominalComponent data={isIncome == 'income'? incomeCategories : expenseCategories} setCount={setCount} count={count}/>}
                    </View>
                  )
                })}           
                <TouchableOpacity style={styles.btnPilih} onPress={() => {
                        let check = checkingDate(selectDate.fromDate, selectDate.toDate)
                        let obj = filterBy[0]['sortBy'] == "Pilih Tanggal" ? selectDate : count
                        let array = isIncome == 'income' ? listIncome : listExpense
                        if(check) {
                          setIsFilter(true)
                          setFilterVisible(!filterVisible)
                          filterFunction(filterBy, array, setFilteredList, obj)
                          ToastAndroid.show(`Filter Berdasarkan ${filterBy[0]['sortBy']}`, ToastAndroid.SHORT)  
                        }
                        console.log({array})
                    }}>
                      <Text style={styles.btnTxt}>Lakukan Penyaringan</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
  )
}

export default FilterIncomeModal

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    modalView: {
      width: windowWidth,
      height: windowHeigth * .8,
      margin: 20,
      backgroundColor: '#FFF',
      borderTopRightRadius: 20,
      paddingTop: 5,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderWidth: 1,
      borderColor:'#DFE1E0',
      position: 'absolute',
      bottom: -windowHeigth*.06,
      justifyContent: 'flex-start'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
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
      width: windowWidth - 40
    },
    textFilter: {
      fontSize: 18,
    },
    filterWrap:{
      width: '90%',
      height: windowHeigth * .1,
      paddingHorizontal: 10
    },
    textInput:{
      backgroundColor: '#E7E7E7',
      width: '45%',
      height: 50,                                    
      justifyContent: 'center', 
      paddingHorizontal: 10,
      marginVertical: 10,
      borderRadius: 10
    },
    txtInputWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pilihWrapper :{
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    btnPilih: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor:'#ED9B83',
      borderRadius:5,
      elevation: 2,
      marginTop: 10
    },
    pickerContainer:{
     backgroundColor: '#DFE1E0',
     flex: 1,
     height: 50,                      
     borderRadius: 10,
     justifyContent: 'center', 
     alignSelf: 'center',
     marginVertical: 10
   },
   btnTxt: {
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center',
    color: '#FFF'}
  });