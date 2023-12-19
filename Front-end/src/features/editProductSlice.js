import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { showSuccessMsg } from '../../utils/successMsg'
import { showErrorMsg } from '../../utils/errorMsg'

// fetch product | get req
export const fetchProduct = createAsyncThunk('edit-product/fetchProduct',
    async (ID) => {
        const { data: lap } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/laptops/${ID}`);
        const { data: mob } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mobiles/${ID}`);
        const { data: earbud } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/earbuds/${ID}`);
        const { data: overear } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/overears/${ID}`);
        return lap ? lap : mob ? mob : earbud ? earbud : overear;
    }
)

// edit product | patch req
export const editProduct = createAsyncThunk('edit-product/editProduct',
    async ({ cate, ID, objEdited }) => {
        const token = localStorage.getItem('xperia-admin-token')
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/${cate}/${ID}`, { ...objEdited },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        showSuccessMsg('Product is updated successfully');
    }
)

const initialState = {
    product: {},
    loading: true,
    error: '',
    brand: '',
    name: '',
    price: '',
    editErr: '',
}

const editProductSlice = createSlice({
    name: 'edit-slice',

    initialState,

    reducers: {
        setBrand: (state, action) => {
            state.brand = action.payload;
        },

        setName: (state, action) => {
            state.name = action.payload;
        },

        setPrice: (state, action) => {
            state.price = action.payload;
        },
    },

    extraReducers: (builder) => {
        // fetchProduct
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.brand = action.payload.brand;
            state.name = action.payload.name;
            state.price = action.payload.price;
        })

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        // editProduct
        builder.addCase(editProduct.pending, (state) => {
        })

        builder.addCase(editProduct.fulfilled, (state, action) => {
        })

        builder.addCase(editProduct.rejected, (state, action) => {
            state.editErr = action.error.message;
            showErrorMsg('You must login with admin account before editing.')
        })
    },
})

export const { setBrand, setName, setPrice } = editProductSlice.actions
export default editProductSlice.reducer