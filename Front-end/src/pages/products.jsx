import React, { useEffect } from 'react'
import useCustomContext from '../../context/Theme';
import { Row, Spinner } from 'react-bootstrap';
import Search from '../components/products/Search';
import Brand from '../components/products/Brand';
import Category from '../components/products/Category';
import ProductsComp from '../components/products/Products';
import Sort from '../components/products/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setBrand, setCate, setSearch, setSort } from '../features/productsSlice';

const Products = () => {
    const { theme, currentModeStyle } = useCustomContext();

    const { initLoading } = useSelector(state => state.productsSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(setSearch(''));
        dispatch(setCate('All'));
        dispatch(setBrand('All'));
        dispatch(setSort('low'));
    }, [])


    if (initLoading)
        return <main className={`min-vh-100 position-relative ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <Spinner animation="grow" className='position-absolute start-50 top-50 translate-middle'></Spinner>
        </main>

    return (
        <section className={`p-3 ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} min-vh-100`}>
            <Row className='border-bottom pb-2 align-items-center row-gap-2'>
                <Search />
                <Category />
                <Brand />
                <Sort />
            </Row>
            <ProductsComp />
        </section >
    )
}

export default Products