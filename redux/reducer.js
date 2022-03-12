import {combineReducers} from 'redux'

const initialState = {
    name:'Ferdiansyah Ramadhan',

};

const initialUserState = {};

const initialProfileState = {
    namaDepan:'',
    namaBelakang:'',
    email:'',
    password:'',
    posisi:'',
    namaBisnis:'',
    whatsApp:'',
    domisili:'',
    tanggalLahir:'',
    jumlahDomba:'',
    omzet:'',
    dapatInfo:'',
}

const initialStock = {
    formDombaTest:{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        jenisProduk: 'Domba',
        jenisDomba:'Garut',
        hargaBeli: 500000,
        hargaJual: 2500000,
        usia: 2,
        berat: 15,
        kategori:'Penggemukan',
        jumlah: 30
    },
    formDomba:{
        jenisProduk:'Domba',
        jenisDomba:'',
        hargaBeli: '',
        hargaJual: '',
        usia: '',
        kategori:'',
        jumlah: '',
        biayaOverall: ''
    },
    formPakan:{
        jenisProduk:'Pakan',
        namaMerk:'',
        Jumlah: 0,
        kadaluarsa: '',
        petunjuk: '',
        jumlah: 0,
        biayaOverall: 0
    },
    listDomba:[],
    listPakan:[],
    listObat:[]
}

const initialCost = {
    listKandang:[],
    listPegawai:[],
    listLahan:[],
    dataKandang:{
        tipeKandang:'Koloni',
        bahanKandang:'Kayu',
        jumlah:'',
        luas:'',
        statusKepemilikan:'Sendiri',
        biayaBuat:''
    },
    dataPegawai:{
        tipePegawai:'Manajerial',
        jumlah:'',
        gaji:''
    },
    dataLahan:{
        jenisLahan:'Tanah',
        lokasi:'',
        luas:'',
        statusKepemilikan:'Sendiri',
        hargaBeli:''

    }
}

const initialTransaction = {
    dataPurchasing:{
        produk:'',
        deskripsi: '',
        kuantitas:'',
        hargaBeli: '',
        diskon:'',
        pajak: '',
        tanggalBeli: '',
        status:'Belum Lunas',
        tipeTransaksi: 'Pembelian'
    },
    dataSelling:{
        produk:'',
        deskripsi: '',
        kuantitas:'',
        hargaJual: '',
        diskon:'',
        pajak: '',
        batasBayar: '',
        status:'Belum Lunas',
        tipeTransaksi: 'Penjualan'
    },
    listPurchasing: [],
    listSelling: []
}

const initialUserProduct = {

    listUserProduct: []
}

const initialUserCategoryProduct = {

    listUserCategoryProduct: []
}

const stokReducer = (state = initialStock, action) => {
    switch(action.type){
    case 'STORE_DATA':
        return {
            ...state,
            listDomba: [...state.listDomba, action.results]
            
        }
    case 'STORE_DATA_PAKAN':
        return {
            ...state,
            listPakan: [...state.listPakan, action.results]
            
        }
    case 'STORE_DATA_OBAT':
        return {
            ...state,
            listObat: [...state.listObat, action.results]
            
        }
    case 'LOAD_DOMBA_DATA':
        return {
            ...state,
            listDomba: action.results
            
    }
    case 'SET_EMPTY_DOMBA_DATA':
        return {
            ...state,
            listDomba:  []
            
    }
    case 'LOAD_PAKAN_DATA':
        return {
            ...state,
            listPakan: action.results
        
    }
    case 'SET_EMPTY_PAKAN_DATA':
        return {
            ...state,
            listPakan:  []
            
    }
    case 'LOAD_OBAT_DATA':
        return {
            ...state,
            listObat: action.results
        
    }
    case 'SET_EMPTY_OBAT_DATA':
        return {
            ...state,
            listObat:  []
            
    }
    case 'SIGN_OUT_CLEAR_DATA':
        return {
            ...state,
            listObat:  [],
            listPakan:[],
            listDomba:[]
            
    }
        default: return state;
    }
}

const costReducer = (state = initialCost, action) => {
    switch(action.type){
        case 'STORE_KANDANG_COST':
            return {
                ...state,
                listKandang:[...state.listKandang, action.results]
                
        }
        case 'STORE_DATA_PEGAWAI':
            return {
                ...state,
                listPegawai: [...state.listPegawai, action.results]
                
            }
        case 'STORE_DATA_LAHAN':
            return {
                ...state,
                listLahan: [...state.listLahan, action.results]
                    
            }
        case 'LOAD_KANDANG_COST':
            return {
                ...state,
                listKandang: action.results
                    
            }
        case 'SET_EMPTY_KANDANG_COST':
            return {
                ...state,
                listKandang: []
                    
            }
        case 'LOAD_PEGAWAI_COST':
            return {
                ...state,
                listPegawai: action.results
                    
            }
        case 'SET_EMPTY_PEGAWAI_COST':
            return {
                ...state,
                listPegawai: []
                    
            }
        case 'LOAD_LAHAN_COST':
            return {
                ...state,
                listLahan: action.results
                    
            }
        case 'SET_EMPTY_LAHAN_COST':
            return {
                ...state,
                listLahan: []
                    
            }
        default: return state;
        }
}


const transactionsReducer = (state = initialTransaction, action) => {
    switch(action.type){
        case 'STORE_PURCHASING':
            return {
                ...state,
                listPurchasing: [...state.listPurchasing, action.results]
                
        }
        case 'STORE_SELLING':
            return {
                ...state,
                listSelling: [...state.listSelling, action.results]
                
        }
        case 'LOAD_PURCHASING':
            return {
                ...state,
                listPurchasing: action.results
                    
            }
        case 'SET_EMPTY_PURCHASING':
            return {
                ...state,
                listPurchasing: []
                    
            }
        case 'LOAD_SELLING':
            return {
                ...state,
                listSelling: action.results
                    
            }
        case 'SET_EMPTY_SELLING':
            return {
                ...state,
                listSelling: []
                    
            }
       
        default: return state;
            }
}

const userProductReducer = (state = initialUserProduct, action) => {
    switch(action.type){
        case 'STORE_DATA_USERPRODUK':
            return {
                ...state,
                listUserProduct: [...state.listUserProduct, action.results]
                
        }

        case 'LOAD_USERPRODUK':
            return {
                ...state,
                listUserProduct: action.results
                    
            }
        case 'SET_EMPTY_USERPRODUK':
            return {
                ...state,
                listUserProduct: []
                    
            }
       
        default: return state;
            }
}

const userCategoryProductReducer = (state = initialUserCategoryProduct, action) => {
    switch(action.type){
        case 'STORE_DATA_USER_KATEGORI':
            return {
                ...state,
                listUserCategoryProduct: [...state.listUserCategoryProduct, action.results]
                
        }

        case 'LOAD_USER_KATEGORI':
            return {
                ...state,
                listUserCategoryProduct: action.results
                    
            }
        case 'SET_EMPTY_USER_KATEGORI':
            return {
                ...state,
                listUserCategoryProduct: []
                    
            }
       
        default: return state;
            }
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type){
        case 'REGISTER':
            return action.results;
        case 'LOGIN':
            return action.results;
        case 'LOGOUT':
            return state = {};
        default: return state;
        }
}

const profileReducer = (state = initialProfileState, action) => {
    switch(action.type){
        case 'STORE_PROFILE_DATA':
            return action.results;
        case 'UPDATE_PROFILE_DATA':
            return action.results;
        case 'LOAD_PROFILE_DATA':
            return action.results;
        case 'DELETE_PROFILE_DATA':
            return state = {};
        default: return state;
        }
}

const reducer = combineReducers(
    {
    costReducer,
    stokReducer,
    transactionsReducer,
    userReducer,
    profileReducer,
    userProductReducer,
    userCategoryProductReducer
    }
)
export default reducer;