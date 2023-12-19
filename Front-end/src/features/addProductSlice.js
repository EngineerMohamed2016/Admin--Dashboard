import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { showSuccessMsg } from '../../utils/successMsg'
import { showErrorMsg } from '../../utils/errorMsg';

// add product | post request
export const addProduct = createAsyncThunk('add-product/addProduct',
    async ({ cate, newProduct }) => {
        const token = localStorage.getItem('xperia-admin-token')
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/${cate}`, { ...newProduct },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        showSuccessMsg('New product is added successfully');
    }
)

const initialState = {
    product: {},
    loading: true,
    error: '',
    cate: 'Laptops',
    brand: '',
    name: '',
    price: '',
    os: '',
    memory: '',
    hardCap: '',
    hardType: '',
    ram: '',
    imgUrl: ''
}

const addProductSlice = createSlice({
    name: 'add-slice',

    initialState,

    reducers: {
        setCate: (state, action) => {
            state.cate = action.payload;
        },

        setBrand: (state, action) => {
            state.brand = action.payload;
        },

        setName: (state, action) => {
            state.name = action.payload;
        },

        setPrice: (state, action) => {
            state.price = action.payload;
        },

        setOS: (state, action) => {
            state.os = action.payload;
        },
        setMemory: (state, action) => {
            state.memory = action.payload;
        },

        setHardCap: (state, action) => {
            state.hardCap = action.payload;
        },

        setHardType: (state, action) => {
            state.hardType = action.payload;
        },

        setRam: (state, action) => {
            state.ram = action.payload;
        },

        setImgUrl: (state, action) => {
            state.imgUrl = action.payload;
        },
    },

    extraReducers: (builder) => {
        // -------------- add product --------------
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
        })

        // When request is fulfilled:
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.brand = '';
            state.hardCap = '';
            state.hardType = '';
            state.imgUrl = '';
            state.memory = '';
            state.name = '';
            state.os = '';
            state.ram = '';
            state.price = '';
            state.loading = false;
        })

        // When request is rejected:
        builder.addCase(addProduct.rejected, (state, action) => {
            state.editErr = action.error.message;
            showErrorMsg('Login with admin account before adding.');
            state.loading = false;
        })
    },
})

export const { setCate, setBrand, setName, setPrice, setHardCap, setHardType, setImgUrl, setOS, setRam, setMemory } = addProductSlice.actions
export default addProductSlice.reducer