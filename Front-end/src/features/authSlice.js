import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { showSuccessMsg } from '../../utils/successMsg'

// login | post req
export const login = createAsyncThunk('auth-slice/login',
    async ({ email, password }) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, { email, password });
        localStorage.setItem('xperia-admin-token', res.data.token);
        showSuccessMsg('Signed In Successfully.');
    }
)

// verify admin jwt | get req
export const verifyToken = createAsyncThunk('auth-slice/verifyToken',
    async () => {
        const token = localStorage.getItem('xperia-admin-token');
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
)

const initialState = {
    product: {},
    loading: true,
    error: '',
    email: '',
    password: '',
    successMsg: '',
    errorMsg: '',
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth-slice',

    initialState,

    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPassword: (state, action) => {
            state.password = action.payload;
        },

        setSuccessMsg: (state, action) => {
            state.successMsg = action.payload;
        },

        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },

        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    },

    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.email = '';
            state.password = '';
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.errorMsg = 'Enter valid credentials!';
            state.error = action.error.message;
        })

        // verifyToken
        builder.addCase(verifyToken.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
        })

        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
        })

        builder.addCase(verifyToken.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.error = action.error.message;
        })
    },
})


export const { setEmail, setErrorMsg, setPassword, setSuccessMsg, setIsAuth } = authSlice.actions
export default authSlice.reducer