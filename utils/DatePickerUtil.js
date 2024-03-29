import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerUtil = () => {
    const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if(selectedDate){
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    } else {
        console.log("eweuh")
    }
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View style={{flex:1, justifyContent:'center'}}> 
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <Text>selected: {date.toDateString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  )
}

export default DatePickerUtil

export const onChangeNew = (event, selectedDate, setShow, setFunc) => {
  if(selectedDate){
    const currentDate = selectedDate;
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let tanggal = day + '-' + month + '-' + year
    console.log(new Date(currentDate.toISOString().split('T')[0]))
    console.log(tanggal)

    setShow(false);
    setFunc('tanggal', currentDate.toISOString().split('T')[0])
} else {
    console.log("eweuh")
    setShow(false);
    setFunc('tanggal', '')
}
}