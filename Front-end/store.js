import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './src/features/productsSlice';
import editProductSlice from './src/features/editProductSlice';
import addProductSlice from './src/features/addProductSlice';
import membersSlice from './src/features/membersSlice';
import transactionsSlice from './src/features/transactionsSlice';
import dashboardSlice from './src/features/dashboardSlice';
import authSlice from './src/features/authSlice';


const reduxStore = configureStore({
    reducer: {
        productsSlice,
        editProductSlice,
        addProductSlice,
        membersSlice,
        transactionsSlice,
        dashboardSlice,
        authSlice,
    }
});

export default reduxStore;