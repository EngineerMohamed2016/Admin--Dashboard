import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

// get transaction | get req
export const getTransactions = createAsyncThunk('transactionsSlice/getTransactions',
    async ({ page, limit, sort }) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions?page=${page}&limit=${limit}&sortKey=${sort}`);
        return res.data;
    }
)

const initialState = {
    product: {},
    loading: true,
    error: '',
    transactions: [],
    allTransactionsCount: 0,
    pageNum: 1,
    limitPerPage: 10,
    latest: false,
}

const transactionsSlice = createSlice({
    name: 'transactions-slice',

    initialState,

    reducers: {
        setPageNum: (state, action) => {
            state.pageNum = action.payload;
        },

        setLatest: (state, action) => {
            state.latest = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getTransactions.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload.transactions;
            state.allTransactionsCount = action.payload.allTransactionsCount
        })

        builder.addCase(getTransactions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
})


export const { setPageNum, setLatest } = transactionsSlice.actions
export default transactionsSlice.reducer