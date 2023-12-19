import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { showSuccessMsg } from '../../utils/successMsg'
import { showErrorMsg } from '../../utils/errorMsg'

// fetch Products | get req
export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async () => {
        const { data: laps } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/laptops`);
        const { data: mobs } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mobiles`);
        const { data: earbuds } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/earbuds`);
        const { data: overears } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/overears`);
        return [...laps, ...mobs, ...earbuds, ...overears].sort((x, y) => x.price - y.price);
    }
)

// filter | get req
export const filter = createAsyncThunk('products/filter',
    async (obj) => {
        const { cate, brand, search } = obj;
        const queries = brand ? `brand=${brand === 'All' ? '' : brand}` + '&' + `search=${search}` : `search=${search}`;
        const { data: laps } = (cate === 'All' || cate === 'Laptops') ? await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/laptops?${queries}`) : { data: [] };
        const { data: mobs } = (cate === 'All' || cate === 'Mobiles') ? await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mobiles?${queries}`) : { data: [] };
        const { data: earbuds } = (cate === 'All' || cate === 'Earbuds') ? await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/earbuds?${queries}`) : { data: [] };
        const { data: overears } = (cate === 'All' || cate === 'Overears') ? await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/overears?${queries}`) : { data: [] };
        return [...laps, ...mobs, ...earbuds, ...overears].sort((x, y) => x.price - y.price);
    }
)

// delete product | delete req
export const deleteProduct = createAsyncThunk('products/deleteProduct',
    async ({ ID, category }) => {
        const token = localStorage.getItem('xperia-admin-token')
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/${category}/${ID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        showSuccessMsg('Product is deleted successfully');
    }
)

const initialState = {
    products: [],
    helper: [],
    initLoading: true,
    loading: false,
    error: '',
    cate: 'All',
    brand: 'All',
    search: '',
    sort: 'low',
}

const productsSlice = createSlice({
    name: 'products-slice',

    initialState,

    reducers: {
        setCate: (state, action) => {
            state.cate = action.payload;
        },

        setBrand: (state, action) => {
            state.brand = action.payload;
        },

        setSearch: (state, action) => {
            state.search = action.payload;
        },

        setSort: (state, action) => {
            state.sort = action.payload;
            if (action.payload === 'low')
                state.products = state.products.sort((x, y) => x.price - y.price);
            else
                state.products = state.products.sort((y, x) => x.price - y.price);
        },
    },

    extraReducers: (builder) => {
        // fetchProducts
        builder.addCase(fetchProducts.pending, (state) => {
            state.initLoading = true;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.initLoading = false;
            state.products = action.payload;
            state.helper = action.payload;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.initLoading = false;
            state.error = action.error.message;
        });

        // filter
        builder.addCase(filter.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(filter.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            if (state.brand === 'All')
                state.helper = action.payload;
        });

        builder.addCase(filter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // deleteProduct
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true; // loading will be false in filter after deleteing
        });

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
        });

        builder.addCase(deleteProduct.rejected, (state, action) => {
            showErrorMsg('Login with admin account before deleting.');
        });
    },
})


export const { setCate, setBrand, setSearch, setSort } = productsSlice.actions
export default productsSlice.reducer