import React, { useContext } from 'react';
import { Alert,  StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { PhotoContext } from '../../context/PhotoProfileContext';

export const windowWidth = Dimensions.get('window').width;
export const windowHeigth = Dimensions.get('screen').height;


const FilterStokModal = ({filterVisible, setFilterVisible, setIsFilter, setFilterBy, filterList}) => {
  const { testStyle } = useContext(PhotoContext)

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
              <View style={styles.filterWrap}>
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
                      setFilterBy(item.sortBy)
                      setIsFilter(true)
                      setFilterVisible(!filterVisible)
                    }}>
                      <Text style={[styles.textFilter,{fontFamily: 'Inter'}]}>{item.sortBy}</Text>
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
              </View>
            
            

          </View>
        </View>
      </Modal>

   
  )
}

export default FilterStokModal

const styles = StyleSheet.create({
    centeredView: {
      
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        position:'relative',
       
    },
    modalView: {
      width:windowWidth,
      height:windowHeigth * .35,
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
      marginVertical: windowHeigth * .005

    },
    textFilter: {
      fontSize: 18,
    },
    filterWrap:{
      // backgroundColor:'red',
      width:'80%',
      height: windowHeigth * .25
    }
  });