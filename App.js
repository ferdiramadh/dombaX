import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Routes from './navigation/Routes';
import { Provider } from 'react-redux'
import {store} from './redux';
import PhotoProfileProvider from './context/PhotoProfileContext';
import FilterTransactionProvider from './context/FilterTransactionContext';


export default function App() {
  return (
    <Provider store ={store}>
      <PhotoProfileProvider>
        <FilterTransactionProvider>
          <Routes />
        </FilterTransactionProvider>
      </PhotoProfileProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
