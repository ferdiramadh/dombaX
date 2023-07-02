import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { DisplayedDateWithName } from '../../utils/DisplayDate'

const DatePickerField = ({ showDatepicker, setFieldValue, date, values }) => {

  useEffect(() => {
    if (date) {
      setFieldValue("kadaluarsa", date)
    }

  }, [date])
  
  return (
    <TouchableOpacity style={styles.wrapper} onPress={showDatepicker}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
        <Text style={{ color: '#474747' }}>{values.kadaluarsa? DisplayedDateWithName(values.kadaluarsa) : '-'}</Text>
        <MaterialIcons name="date-range" size={24} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DFE1E0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    marginVertical: 10,
  }
})

export default DatePickerField