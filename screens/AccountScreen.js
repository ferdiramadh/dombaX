import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AccountDisplay from '../components/akunDetail/AccountDisplay';

const AccountScreen = ({navigation}) => {
 
  return (
    <View style={styles.container}>
       <AccountDisplay navigation={navigation}/>
     </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',  
    }
});
