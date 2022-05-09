import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect} from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import IncomeItem from './IncomeItem'
import { formatTotalToCurrency } from '../../utils/FormatCurrency'
import firebase from '../../Firebaseconfig'
import { useNavigation } from '@react-navigation/native';

const IncomeSection = ({listIncome}) => {

  const [editData, setEditData] = useState({});
  const navigation = useNavigation();

  const sortData = listIncome.sort((a, b) => {
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
  function getSum(arr, jumlah) {
    return arr.reduce((total, obj) => {
      if (typeof obj[jumlah] === 'string') {
        return total +  parseInt(obj.jumlah);;
      }
      return total +  parseInt(obj.jumlah);;
    }, 0);
  }

  const editItem = (item) => {
        
    return firebase
    .firestore()
    .collection("income")
    .doc(item.id)
    .get()
    .then((i) => {
        setEditData(i.data());
    })
    
    
}

useEffect(() => {
  console.log("Cek Data")
  if(Object.keys(editData).length !== 0) {
      // setGlobalModalVisible(!modalGlobalVisible)
      console.log("ada nih edit data"+editData)
      navigation.navigate("IncomeDetail",{editData, navigation})
  } if (editData !== undefined) {
      console.log("MANA nih edit data")
      // navigation.navigate("DetailProduct",{editData, setEditData})
  }

},[editData])

  return (
    <View style={styles.container}>
      <View style={styles.totalIncomeWrapper}>
        <Text style={styles.totalIncomeTitle}>Total Pemasukan</Text>
        <Text style={styles.totalIncomeCount}>{formatTotalToCurrency(getSum(listIncome, "jumlah"))}</Text>
      </View>
      
      <ScrollView >
          {sortData.map((item, i) => {
            return <IncomeItem item={item} key={item.id} editItem={editItem}/>
        })} 
      </ScrollView>
    </View>
  )
}

export default IncomeSection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        height: windowHeigth,
        width:windowWidth
    },
    totalIncomeWrapper: {
        width: windowWidth,
        height: windowHeigth*.1,
        // backgroundColor:'green',
        paddingVertical: 5,
        paddingLeft: 20
    },
    totalIncomeTitle:{
        fontSize: 22,
        fontWeight:'700',
        fontFamily:'Inter'
    },
    totalIncomeCount:{
        fontSize: 26,
        fontWeight:'700',
        fontFamily:'Inter',
        color: '#43B88E'
    }
})