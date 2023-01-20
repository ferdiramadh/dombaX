import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { windowHeigth, windowWidth } from '../../utils/DimensionSetup'
import { formatTotalToCurrency } from '../../utils/FormatCurrency'
import firebase from '../../Firebaseconfig'
import { useNavigation } from '@react-navigation/native';
import ExpenseItem from './ExpenseItem'
import { FilterTransactionContext } from '../../context/FilterTransactionContext';
import { MaterialIcons } from '@expo/vector-icons';

const ExpenseSection = ({listExpense, searchItems, isSearch, searchKeyword, isLoading, setSearchItems}) => {
  const { isFilter, filteredList, filterBy, setIsFilter } = useContext(FilterTransactionContext)
  const [editData, setEditData] = useState({});
  const navigation = useNavigation();

  const sortData = listExpense.sort((a, b) => {
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
    .collection("expense")
    .doc(item.id)
    .get()
    .then((i) => {
        setEditData(i.data());
    })
    
    
}

useEffect(() => {
  console.log("Cek Data")
  let isExpense = true
  if(Object.keys(editData).length !== 0) {
      // setGlobalModalVisible(!modalGlobalVisible)
      console.log("ada nih edit data"+editData)
      navigation.navigate("IncomeDetail",{editData, navigation, isSearch, searchItems, setSearchItems, isExpense })
  } if (editData !== undefined) {
      console.log("MANA nih edit data")
      // navigation.navigate("DetailProduct",{editData, setEditData})
  }

},[editData])

  return (
    <View style={styles.container}>
     {!isSearch && !isFilter && <View style={styles.totalIncomeWrapper}>
          <Text style={styles.totalIncomeTitle}>Total Pengeluaran</Text>   
        <Text style={styles.totalIncomeCount}>{formatTotalToCurrency(getSum(listExpense, "jumlah"))}</Text>
      </View>  }
      {isLoading? <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="orange" />
                </View>:
      <ScrollView >
             {isSearch? <View style={{paddingTop: 10}}>
                  
                  <Text style={{marginLeft: 20, marginBottom: 15}}>{searchItems.length} hasil ditemukan untuk "{searchKeyword}"</Text>
                {
                  searchItems.map((item, i) => {
                    return <ExpenseItem item={item} key={item.id} editItem={editItem}/>
                  }) 
                }
              </View>: null}
            
              {isFilter? <View style={{paddingTop: 10}}> 
                  
              <View style={{width: '100%', flexDirection:'row', justifyContent: 'space-around', marginBottom: 10}}>
                <Text>Filter Berdasarkan {filterBy[0]['sortBy']}</Text><TouchableOpacity style={{flexDirection:'row'}} onPress={() => setIsFilter(false)}>
                    <Text> Ulang Penyaringan.</Text>
                    <MaterialIcons name="refresh" size={20} color="black" />
                </TouchableOpacity>
              </View>
                {
                  filteredList.map((item, i) => {
                    return <ExpenseItem item={item} key={item.id} editItem={editItem}/>
                  }) 
                }
              </View>: null}

            {sortData.length > 0 && !isSearch && !isFilter? sortData.map((item, i) => {
                return <ExpenseItem item={item} key={item.id} editItem={editItem}/>
                })
             : null}
      </ScrollView>}
    </View>
  )
}

export default ExpenseSection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'blue',
        height: windowHeigth,
        width:windowWidth,
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
        color: '#EB3223'
    }, 
    loaderContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    //   backgroundColor: 'red',
    }
})