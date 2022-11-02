import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Modal from "react-native-modal";
import { PhotoContext } from '../../context/PhotoProfileContext';
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup';
import { FilterTransactionContext } from '../../context/FilterTransactionContext';

const FilterIncomeModal = ({filterVisible, setFilterVisible}) => {
  const { testStyle } = useContext(PhotoContext)
  const { setIsFilter, setFilterBy, isFilter,filterList} = useContext(FilterTransactionContext)

  return (
      <Modal
      backdropColor='white'
      deviceWidth={windowWidth}
      deviceHeight={windowHeigth}
      backdropOpacity={0.8}
        // animationType="slide"
        // transparent={true}
        isVisible={filterVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setFilterVisible(!filterVisible);
        // }}
        onSwipeComplete={() => setFilterVisible(!filterVisible)}
        swipeDirection="down"
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.handleModal}></View>
              <View style={styles.filterDates}>
                {/* <TouchableOpacity style={styles.filterSelection} onPress={() => {
                  // loadUserProduct()
                  setIsFilter(true)
                  setFilterVisible(!filterVisible)
                }}>
                  <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>Stok Terendah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterSelection}>
                  <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>Stok Tertinggi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterSelection}>
                  <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>Harga Beli Terendah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterSelection}>
                  <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>Harga Beli Tertinggi</Text>
                </TouchableOpacity> */}

                { filterList.map((item, i) => {
                  return (
                    <TouchableOpacity style={styles.filterSelection} key={item.id} onPress={() => {
                      console.log('filterList')
                      setFilterBy(item.sortBy)
                      setIsFilter(!isFilter)
                      setFilterVisible(!filterVisible)
                    }}>
                      <Text style={[styles.textFilter,{fontFamily: 'Inter', fontWeight:'bold'}]}>{item.sortBy}</Text>
                    </TouchableOpacity>
                  )
                })}
                {/* <TouchableOpacity style={styles.filterSelection} onPress={() => {
                  setIsFilter(false)
                  setFilterVisible(!filterVisible)
                  setFilterBy()
                }}>
                  <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>Reset</Text>
                </TouchableOpacity> */}
                <View style={{ flexDirection: 'row'}}>
                  <Text style={{ marginRight: windowWidth*.4}}>Dari</Text>
                  <Text>Ke</Text>
                </View>
                <View style={styles.textInputWrapper}>
                  <TextInput style={styles.textInput} />
                  <TextInput style={styles.textInput} />
                </View>
                
              </View>
              <View style={styles.filterTotalAmount}>
                <Text style={[styles.textFilter,{fontFamily: 'Inter', fontWeight:'bold'}]}>Nilai Transaksi</Text>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={{ marginRight: windowWidth*.4}}>Dari</Text>
                  <Text>Ke</Text>
                </View>
                <View style={styles.textInputWrapper}>
                  <TextInput style={styles.textInput} />
                  <TextInput style={styles.textInput} />
                </View>
                </View>
          </View>
        </View>
      </Modal>
  )
}

export default FilterIncomeModal

const styles = StyleSheet.create({
    centeredView: {
      
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        position:'relative',
       
    },
    modalView: {
      width:windowWidth,
      height:windowHeigth * .7,
      margin: 20,
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      paddingTop: 5,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderWidth:1,
      borderColor:'#DFE1E0',
      position:'absolute',
      bottom:-windowHeigth*.06,
      justifyContent: 'flex-start'
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
      marginVertical: windowHeigth * .005

    },
    textFilter: {
      fontSize: 18,
    },
    filterDates:{
      // backgroundColor:'red',
      width:'80%',
      height: '40%',
      marginBottom: 10
    },
    filterTotalAmount:{
      // backgroundColor:'green',
      width:'80%',
      height: '20%',
      marginVertical: 10
    },
    textInputWrapper:{
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    textInput:{
      backgroundColor:'#E7E7E7',
      width:'45%',
      height:40,                                    
      justifyContent:'center', 
      paddingLeft:20,
      marginVertical:10,
      borderRadius: 10
      
    },
  });