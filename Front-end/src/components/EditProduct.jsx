import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { editProduct, fetchProduct, setBrand, setName, setPrice } from '../features/editProductSlice';
import { Button, Form, Spinner } from 'react-bootstrap';
import { showErrorMsg } from '../../utils/errorMsg'

const EditProduct = () => {
    const [vError, setVError] = useState({ brand: '', name: '', price: '' });
    const { ID } = useParams();

    const { loading, product, error, brand, name, price } = useSelector(state => state.editProductSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct(ID));
    }, []);

    // validate every input field
    const validateField = (inputValue, field, minLength, head) => {
        if (inputValue.length === 0)
            setVError({ ...vError, [field]: 'Required' });

        else if (inputValue.length < minLength)
            setVError({ ...vError, [field]: `${head} must be >= ${minLength} ${field === 'price' ? "numbers" : 'letters'}!` });
        else

            setVError({ ...vError, [field]: '' });
    }


    const handleBrand = (e) => {
        dispatch(setBrand(e.target.value));
        validateField(e.target.value, 'brand', 2, 'Product brand')
    }

    const handleName = (e) => {
        dispatch(setName(e.target.value));
        validateField(e.target.value, 'name', 3, 'Product name')
    }

    const handlePrice = (e) => {
        const price = e.target.value.replace(/\D/g, "");
        dispatch(setPrice(price));
        validateField(price, 'price', 1, 'Product price')
    }


    const handleEdit = () => {
        if (brand.toLowerCase() === 'all')
            return showErrorMsg('(All) or (all) are not allowed to be a brand name.')

        const cate = product.hardType ? 'laptops' : product.memory ? 'mobiles' : product.earbud ? 'earbuds' : 'overears';
        if (brand.length >= 2 && name.length >= 3 && String(price).length >= 1)
            dispatch(editProduct({ cate, ID, objEdited: { brand: brand.toLowerCase(), name, price } }));
    }

    if (loading)
        return <main className={`min-vh-100 position-relative bg-white`}>
            <Spinner animation="grow" className='position-absolute start-50 top-50 translate-middle'></Spinner>
        </main>

    if (error || Object.keys(product).length < 1)
        return <h3 className='text-center mt-5'>Product not found.</h3>


    return (
        <main className='d-flex justify-content-center align-items-center vh-100 '>
            <Form className='w-350px w-sm-400px shadow rounded p-4' onSubmit={(e) => e.preventDefault()}>
                <h3 className='text-center mb-4'>Edit Product</h3>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1 shadow-none w-240px'
                        placeholder="Product Brand"
                        type='text'
                        size='sm'
                        max={12}
                        value={brand}
                        onChange={handleBrand}
                    />
                    {vError.brand && <p className='text-danger'>{vError.brand}</p>}
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1 shadow-none w-240px'
                        placeholder="Product Name"
                        type='text'
                        size='sm'
                        max={12}
                        value={name}
                        onChange={handleName}
                    />
                    {vError.name && <p className='text-danger'>{vError.name}</p>}
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1 shadow-none w-240px'
                        placeholder="Product Price"
                        type='text'
                        size='sm'
                        max={12}
                        value={price}
                        onChange={handlePrice}
                    />
                    {vError.price && <p className='text-danger'>{vError.price}</p>}
                </div>


                <div className='text-end'>
                    <Link to={'/products'} className='d-inline-block py-1 px-3 me-2 bg-danger rounded' id="button-addon1">Back</Link>
                    <Button type='submit' onClick={handleEdit} variant="primary" className='py-1 px-4' id="button-addon2">Edit</Button>
                </div>
            </Form>
        </main>
    )
}

export default EditProduct