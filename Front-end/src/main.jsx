import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import './index.css'
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import App from './App';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../context/Theme';
import Login from './pages/login';
import Products from './pages/products';
import { Provider } from 'react-redux';
import reduxStore from '../store';
import EditProduct from './components/EditProduct';
import Members from './pages/members';
import Transactions from './pages/transactions';
import Dashboard from './pages/dashboard';
import AddProduct from './pages/add-product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ThemeProvider><App><Outlet /></App></ThemeProvider>,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/add-product',
        element: <AddProduct />
      },
      {
        path: '/members',
        element: <Members />
      },
      {
        path: '/transactions',
        element: <Transactions />
      },
    ]
  },

  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/edit-product/:ID',
    element: <EditProduct />
  }
]);

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
