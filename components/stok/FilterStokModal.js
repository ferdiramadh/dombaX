import React from 'react'
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from 'react-native'
import Modal from "react-native-modal"
import { CheckBox } from 'react-native-elements'

export const windowWidth = Dimensions.get('window').width
export const windowHeigth = Dimensions.get('screen').height


const FilterStokModal = ({ filterVisible, setFilterVisible, setIsFilter, setFilterBy, filterList, setFilterList }) => {

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

      setFilterBy(res)
      setIsFilter(true)
      setFilterVisible(!filterVisible)
      ToastAndroid.show(`Filter dengan ${res}`, ToastAndroid.SHORT)

    }, 500)

  }

  return (

    <Modal
      backdropColor='white'
      deviceWidth={windowWidth}
      deviceHeight={windowHeigth}
      backdropOpacity={0.8}
      isVisible={filterVisible}
      onSwipeComplete={() => setFilterVisible(!filterVisible)}
      swipeDirection="down"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.handleModal}></View>
          <View style={styles.filterWrap}>
            {filterList.map((item, i) => {
              return (
                <View style={styles.filterSelection} key={item.id}>
                  <Text style={styles.textFilter}>{item.sortBy}</Text>
                  <CheckBox
                    center
                    checked={item.isChecked}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => {
                      if (item.isChecked) {
                        console.log('do nothing')
                      } else {
                        checkboxHandler(item, i)
                      }
                    }}
                  />

                </View>
              )
            })}
          </View>
        </View>
      </View>
    </Modal>


  )
}

export default FilterStokModal

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  modalView: {
    width: windowWidth,
    height: windowHeigth * .45,
    margin: 20,
    backgroundColor: 'white',
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
  handleModal: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DFE1E0',
    marginBottom: windowHeigth * .05
  },
  filterSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,

  },
  textFilter: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 20
  },
  filterWrap: {
    width: '80%',
    height: windowHeigth * .35
  }
})