import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

// get members | get req
export const getMembers = createAsyncThunk('membersSlice/getMembers',
    async ({ page, limit, sort }) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/members?page=${page}&limit=${limit}&sortKey=${sort}`);
        return res.data;
    }
)

const initialState = {
    product: {},
    loading: true,
    error: '',
    members: [],
    membersCount: 0,
    pageNum: 1,
    limitPerPage: 10,
    latest: false,
}

const membersSlice = createSlice({
    name: 'members-slice',

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
        // getMembers
        builder.addCase(getMembers.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getMembers.fulfilled, (state, action) => {
            state.loading = false;
            state.members = action.payload.members;
            state.membersCount = action.payload.membersCount
        })

        builder.addCase(getMembers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
})


export const { setPageNum, setLatest } = membersSlice.actions
export default membersSlice.reducer