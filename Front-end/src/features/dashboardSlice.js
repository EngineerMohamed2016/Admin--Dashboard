import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import constructLineData from '../../utils/constructLineData';

// fetch members | get req
export const fetchMembers = createAsyncThunk('dashboard-slice/fetchMembers',
    async () => {
        const { data: obj } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/members`);
        return obj;
    }
)

// fetch transactions | get req
export const getTransactions = createAsyncThunk('dashboard-slice/getTransactions',
    async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions`);
        return res.data;
    }
)

// fetch products | get req
export const getProducts = createAsyncThunk('dashboard-slice/getProducts',
    async () => {
        const laptops = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/laptops`);
        const mobiles = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mobiles`);
        const earbuds = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/earbuds`);
        const overears = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/overears`);
        const [res1, res2, res3, res4] = await Promise.all([laptops, mobiles, earbuds, overears]);
        return { laps: res1.data, mobs: res2.data, ears: res3.data, overs: res4.data }
    }
)

const initialState = {
    product: {},
    membersLoading: true,
    transactionsLoading: true,
    productsLoading: true,
    error: '',
    membersCount: 0,
    allTransactionsCount: 0,
    weeklyTransactionsCount: 0,
    weeklySales: 0,
    todaySales: 0,
    doughnutData: [],
    lineData: [],
}

const dashboardSlice = createSlice({
    name: 'edit-slice',

    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        // fetchMembers
        builder.addCase(fetchMembers.pending, (state) => {
            state.membersLoading = true;
        })

        builder.addCase(fetchMembers.fulfilled, (state, action) => {
            state.membersLoading = false;
            state.membersCount = action.payload.membersCount;
        })

        builder.addCase(fetchMembers.rejected, (state, action) => {
            state.membersLoading = false;
            state.error = action.error.message;
        })

        // getTransactions
        builder.addCase(getTransactions.pending, (state) => {
            state.transactionsLoading = true;
        })

        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.transactionsLoading = false;

            // transactions count
            state.allTransactionsCount = action.payload.allTransactionsCount;

            // weekly sales count
            state.weeklyTransactionsCount = action.payload.weeklyTransactions.length;

            state.weeklySales = action.payload.weeklyTransactions.reduce((total, transaction) => {
                return total += Number(transaction.totalPrice);
            }, 0);

            // sales today count
            state.todaySales = action.payload.transactionsToday.reduce((total, transaction) => {
                return total += Number(transaction.totalPrice);
            }, 0);

            // constructing line data
            const lineData = constructLineData(action.payload.weeklyTransactions);
            state.lineData = lineData;
        })

        builder.addCase(getTransactions.rejected, (state, action) => {
            state.transactionsLoading = false;
            state.error = action.error.message;
        })

        // getProducts
        builder.addCase(getProducts.pending, (state) => {
            state.productsLoading = true;
        })

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productsLoading = false;
            const { laps, mobs, ears, overs } = action.payload;
            state.doughnutData = [
                { label: 'Laptops', value: laps.length },
                { label: 'Mobiles', value: mobs.length },
                { label: 'Earbuds', value: ears.length },
                { label: 'Overears', value: overs.length }];
        })

        // When our request is rejected:
        builder.addCase(getProducts.rejected, (state, action) => {
            state.productsLoading = false;
            state.error = action.error.message;
        })
    },
})


export const { } = dashboardSlice.actions
export default dashboardSlice.reducer