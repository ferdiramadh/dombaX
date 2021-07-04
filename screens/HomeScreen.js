import React, {useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator ,StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton'
import CustomHeder from '../components/CustomHeder'

export default function HomeScreen({navigation}) {
    const [selectedLanguage, setSelectedLanguage] = useState({
        country: 'uk'
    });
    
    
    return (
        <View style={styles.container}>
            <CustomHeder home={true}/>
            <StatusBar
        animated={true}
        
   />
            <Text>Home</Text>
            {/* <CustomButton name='Yoyo' onPress={() => Alert.alert('Bro!')} /> */}
            {/* <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
                }
                style={{
                    width:200,
                    height:50,
                    borderColor:'black',
                    borderWidth:2,
                    padding:10,
                   
                    borderRadius:10
                }}
                itemStyle={{
                    backgroundColor: "grey", color: "blue",  fontSize:17
                }}
                mode='dropdown'
                prompt='Test'
                >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            </View> */}

            
            {/* <Button title='Test Ke Login' onPress={() => navigation.navigate('Login')} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    }
})
