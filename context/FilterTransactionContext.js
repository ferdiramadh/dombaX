import React, { createContext, useState } from 'react';
import { ToastAndroid } from 'react-native';

export const FilterTransactionContext = createContext()

const FilterTransactionProvider = (props) => {

  //Check if ToDate > FromDate
  const [showTanggal, setShowTanggal] = useState(false)
  //Filter Laporan
  const listExpense = []
  const [filterBy, setFilterBy] = useState();

  const [filteredList, setFilteredList] = useState([])
  const [filteredListIncome, setFilteredListIncome] = useState([])

  const [isFilter, setIsFilter] = useState(false)

  const [filterList, setFilterList] = useState([
    {
      id: 1,
      sortBy: 'Hari Ini',
      isChecked: false,
    },
    {
      id: 2,
      sortBy: '7 Hari Terakhir',
      isChecked: false,
    },
    {
      id: 3,
      sortBy: '30 Hari Terakhir',
      isChecked: false,
    },
    {
      id: 4,
      sortBy: 'Bulan Ini',
      isChecked: false,
    },
    {
      id: 5,
      sortBy: 'Pilih Tanggal',
      isChecked: false,
    }
    ,
    {
      id: 6,
      sortBy: 'Nominal Transaksi',
      isChecked: false,
    }
  ])

  const checkboxHandler = (value, index) => {
    const newValue = filterList.map((checkbox, i) => {
      if (i !== index)
        return {
          ...checkbox,
          isChecked: false,
        }
      if (i === index) {
        const item = {
          ...checkbox,
          isChecked: !checkbox.isChecked,
        }
        return item
      }
      if (value.isChecked && i === index) {
        const item = {
          ...checkbox,
          isChecked: !checkbox.isChecked,
        }
        return item
      }
      return checkbox
    })
    setFilterList(newValue)


    setTimeout(() => {
      let filterTrue = newValue.filter((item, i) => {
        return item.isChecked == true
      })
      let res = filterTrue[0]['sortBy']

      if (res !== 'Pilih Tanggal') {

        setShowTanggal(false)
        // setFilterVisible(!filterVisible)

      } else {
        setShowTanggal(true)
        ToastAndroid.show('Pilih Rentang Tanggal', ToastAndroid.SHORT)
      }

      setFilterBy(filterTrue)
      // console.log(filterTrue)
    }, 500)

  }
  //Filter Functions
  const filterFunction = (filterBy, array, func, dataObj) => {
    let res = filterBy[0]['sortBy']
    let today = new Date()
    let thisMonth = today.getMonth()
    let thisYear = today.getFullYear()

    let newList = array.filter((item, i) => {
      if (res == 'Hari Ini') {
        return new Date(new Date(item.tanggal).toISOString().split('T')[0]).toDateString() == new Date(today.toISOString().split('T')[0]).toDateString()

      } else if (res == '7 Hari Terakhir') {
        let priorDate = new Date(new Date().setDate(today.getDate() - 7));
        return new Date(item.tanggal) >= new Date(priorDate.toISOString().split('T')[0])

      } else if (res == '30 Hari Terakhir') {
        let priorDate = new Date(new Date().setDate(today.getDate() - 30));
        return new Date(item.tanggal) >= new Date(priorDate.toISOString().split('T')[0])

      } else if (res == 'Bulan Ini') {
        let itemTanggal = new Date(item.tanggal)
        let month = itemTanggal.getMonth()
        let year = itemTanggal.getFullYear()

        return month == thisMonth && year == thisYear

      } else if (res == 'Pilih Tanggal') {
        return new Date(item.tanggal) >= new Date(dataObj.fromDate) && new Date(item.tanggal) <= new Date(dataObj.toDate)

      } else if (res == 'Nominal Transaksi') {
        console.log(dataObj)
        if (dataObj.category !== 'All') {
          return parseInt(item.jumlah) >= parseInt(dataObj.from) && parseInt(item.jumlah) <= parseInt(dataObj.to) && item.kategori == dataObj.category
        } else {
          return parseInt(item.jumlah) >= parseInt(dataObj.from) && parseInt(item.jumlah) <= parseInt(dataObj.to)
        }

      }

      return []
    })
    func(newList)
  }

  const transactionCategories = {
    purchaseCategories: [
      {
        id: 0,
        title: 'All',
      },
      {
        id: 1,
        title: 'Penjualan',
      },
      {
        id: 2,
        title: 'Penambahan Modal',
      },
      {
        id: 3,
        title: 'Hibah',
      },
      {
        id: 4,
        title: 'Pinjaman',
      },
      {
        id: 5,
        title: 'Piutang',
      },
    ],
    sellingCategories: [
      {
        id: 0,
        title: 'All',
      },
      {
        id: 1,
        title: 'Pembelian Stok',
      },
      {
        id: 2,
        title: 'Pembelian Alat dan Mesin',
      },
      {
        id: 3,
        title: 'Pembayaran Utang',
      },
      {
        id: 4,
        title: 'Pemberian Utang',
      },
      {
        id: 5,
        title: 'Gaji Pekerja',
      },
      {
        id: 6,
        title: 'Tabungan atau Investasi',
      },
      {
        id: 7,
        title: 'Pengeluaran Lain-Lain',
      },
    ]
  }
  const [catatSekarang, setCatatSekarang] = useState(false)

  const resetFilter = () => {
    let startVal = filterList.map((val, i) => {
      return {
        ...val,
        isChecked: false
      }
    })
    setIsFilter(false)
    setFilterBy()
    setFilteredList([])
    setFilteredListIncome([])
    setFilterList(startVal)
    setShowTanggal(false)
  }

  const objectValues = {
    isFilter,
    setIsFilter,
    filterList,
    filterBy,
    setFilterBy,
    filteredList,
    setFilteredList,
    filteredListIncome,
    setFilteredListIncome,
    checkboxHandler,
    showTanggal,
    resetFilter,
    transactionCategories,
    filterFunction,
    catatSekarang,
    setCatatSekarang
  }

  return (
    <FilterTransactionContext.Provider value={objectValues}>
      {props.children}
    </FilterTransactionContext.Provider>
  );
};

export default FilterTransactionProvider;
