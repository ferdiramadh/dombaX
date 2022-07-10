import { StyleSheet } from 'react-native';
import React, {createContext, useState, useEffect} from 'react';
 
export const FilterTransactionContext = createContext()

const FilterTransactionProvider = (props) => {
    const [ filterVisible, setFilterVisible ] = useState(false)

    const [ isFilter, setIsFilter ] = useState(false)
    const [ filterItems, setFilterItems ] = useState([])
    const filterList = [
      {
        id: 1,
        sortBy: 'Hari Ini',
      },
      {
        id: 2,
        sortBy: '7 Hari Terakhir',
      },
      {
        id: 3,
        sortBy: '30 Hari Terakhir',
      },
      {
        id: 4,
        sortBy: 'Bulan Ini',
      },
      {
        id: 5,
        sortBy: 'Pilih Tanggal',
      }
    ]
    const [ filterBy, setFilterBy ] = useState();

    return (
    <FilterTransactionContext.Provider value={{filterVisible, setFilterVisible,isFilter, setIsFilter, filterItems, setFilterItems, filterList, filterBy, setFilterBy }}>
      {props.children}
    </FilterTransactionContext.Provider>
  );
};

export default FilterTransactionProvider;

const styles = StyleSheet.create({});
