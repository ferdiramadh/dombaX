import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import ProductItem from '../components/selectedproduct/ProductItem'
import firebase from '../Firebaseconfig'
import {useSelector, useDispatch} from 'react-redux'
import { FireSQL } from 'firesql'

const UserProductScreen = () => {
    const dispatch = useDispatch();
    const sortTipe = (sortBy) => (a,b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1: -1; 
    const userProductState = useSelector(state => state.userProductReducer)
    const DATA = userProductState.listUserProduct;
    const sortData = DATA.sort((a, b) => {
        let bd = objToDate(b.createdAt);
        let ad = objToDate(a.createdAt);
        return ad - bd;
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState({});

    const itemsSort = DATA.sort(sortTipe('tipe'))

    function objToDate (obj) {
        let result = new Date(0);
        if( obj !== null) {
            result.setSeconds(obj.seconds);
            result.setMilliseconds(obj.nanoseconds/1000000);
            return result;
        }
        
    }
    // You can either query the collections at the root of the database...
const dbRef = firebase.firestore();

// ... or the subcollections of some document
// const docRef = firebase.firestore().doc('userproduk');

// And then just pass that reference to FireSQL
const fireSQL = new FireSQL(dbRef);

// Use `.query()` to get a one-time result
fireSQL.query(`SELECT * FROM userproduk WHERE tipe = 'pakan'`).then(documents => {
  documents.forEach(doc => {
    /* Do something with the document */
    console.log(doc.tipe)
  });
});


    const loadUserProduct = () => {
        
        return firebase
        .firestore()
        .collection("userproduk").where("userId","==","moD0YtFRBxOv8Igw6ALSslh6RoA2").orderBy('tipe')
        .startAt('pak')
        
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach( function(doc){
                let newValue = doc.data()
                // let sortNewValue = newValue.sort(sortTipe())
                // console.log("nih userprod" + newValue)
                items.push(newValue)
                // console.log(newValue)
                // console.log('Itu newValue dari snapshot dalem')
                
            });
            const itemsSort = items.sort(sortTipe('tipe'))
            console.log("nih itemsSort" + itemsSort)
            
            dispatch({type:'LOAD_USERPRODUK',results:itemsSort})
        })
    }

    
  return (
    <ScrollView >
      <View style={styles.container}>
          {/* <Button title='test' onPress={() => console.log(DATA)} /> */}
          <Button title='test' onPress={() => {
              fireSQL.query(`SELECT * FROM userproduk WHERE tipe LIKE 'dom%'`).then(documents => {
                documents.forEach(doc => {
                  /* Do something with the document */
                  console.log(doc)
                });
              });
          }} />
          { sortData.map((item, i) => {
              return(
                  <View key={item.id} >
                      <Text>{item.namaProduk}</Text>
                      <Text>{item.tipe}</Text>
                      {/* <Text>{item.createdAt}</Text> */}
                  </View>
              )
          })}
        
        
      </View>

    </ScrollView>
  )
}

export default UserProductScreen

const styles = StyleSheet.create({
  container:{
    width:'100%',
    padding: 10,
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})