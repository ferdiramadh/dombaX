import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput,LogBox ,ScrollView, Alert} from 'react-native'
import firebase from '../Firebaseconfig'
import { useSelector } from 'react-redux'


LogBox.ignoreAllLogs()
const TestingFireabase = () => {
    
    const [ schools, setSchools ] = useState([])
    const [ loading, setLoading ] = useState(false)
    
    const [state, setState] = useState({
        s:'',
        result:[],
        page:'',
        totalPages:'',
        movieResult:'',
        selected:{},
        imdbSelected:{}
  
      })
      const globalState = useSelector(state => state)

    const addTodo = () => {
        const datas = {
            id: firebase.firestore()
            .collection("todos")
            .doc().id
        }
        const db = firebase.firestore();
        db.collection("todos")
        .doc(datas.id)
        .set({title:state.s, completed:false,id:datas.id, createdAt:firebase.firestore.FieldValue.serverTimestamp()})
        setState(prevState => {
            return{ ...prevState, s: ''}
          })
          populate();
          
    }
    const handleInput = (e) => {
      
          setState(prevState => {
            return{ ...prevState, s: e}
          })
          
          
        }
    const populate = () => {
        setSchools([])
        return firebase
        .firestore()
        .collection("todos").orderBy('createdAt')
        .get()
        .then((querySnapshot) => {querySnapshot.forEach( function(doc){
            let newData = doc.data()
            
            dispatch({type:'STORE_DATA',results:newData})
        });
        
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }

    useEffect(() => {
        // populate()
    },[])

    // if(schools.length == 0){
    //     Alert.alert('Loading for Items')
    // }

    return (
        <View style={styles.container}>
            {/* <Text>Firebase Test</Text>
            <TextInput style={styles.input} onChangeText={(s) => handleInput(s)} value={state.s}/>
            <Button title='Test Add' onPress={addTodo}/>
            <Button title='Test Show' onPress={populate}/>
            <Button title='Test State' onPress={() => console.log(schools)}/>
            <Button title='Test Delete' onPress={() => setSchools([])}/>
            <Text>{globalState.name}</Text>
            <ScrollView>
            { schools.length !== 0? schools.map((school, i) => {
                return(
                    <View key={school.id} >
                       
                        <Text>{school.title}</Text>
                        
                    </View>
                )
            }):null}
            </ScrollView> */}

        </View>
    )
}

export default TestingFireabase

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width: 100,
        height:30,
        borderWidth:1,
        borderColor:'#000'
    }
})
