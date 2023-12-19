import React from 'react'
import useCustomContext from '../../context/Theme';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, setBrand, setCate, setHardCap, setHardType, setImgUrl, setMemory, setName, setOS, setPrice, setRam } from '../features/addProductSlice';
import { showErrorMsg } from '../../utils/errorMsg';

const AddProduct = () => {
    const { theme, currentModeStyle } = useCustomContext();

    const { cate, brand, name, price, os, memory, hardCap, hardType, ram, imgUrl } = useSelector(state => state.addProductSlice);
    const dispatch = useDispatch();

    const handleCate = (e) => dispatch(setCate(e.target.value));
    const handleBrand = (e) => dispatch(setBrand(e.target.value));
    const handleName = (e) => dispatch(setName(e.target.value));

    const handlePrice = (e) => {
        const price = e.target.value.replace(/\D/g, "");
        dispatch(setPrice(price))
    };

    const handleOS = (e) => dispatch(setOS(e.target.value));

    const handleMemory = (e) => {
        const memo = e.target.value.replace(/\D/g, "");
        dispatch(setMemory(memo))
    };

    const handleHardCap = (e) => {
        const capacity = e.target.value.replace(/\D/g, "");
        dispatch(setHardCap(capacity))
    };

    const handleHardType = (e) => dispatch(setHardType(e.target.value));

    const handleRam = (e) => {
        const ram = e.target.value.replace(/\D/g, "");
        dispatch(setRam(ram))
    };

    const handleUrl = (e) => dispatch(setImgUrl(e.target.value));

    // on submit
    const handleSubmit = (e) => e.preventDefault();

    // add product = post 
    const handleAdd = () => {
        if (brand.toLowerCase() === 'all')
            return showErrorMsg('(All) or (all) are not allowed to be a brand name.')

        const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

        if (!urlRegex.test(imgUrl))
            return;

        if (cate === 'Laptops') {
            if (brand.length >= 3 && name.length >= 4 && price.length >= 1 && os.length >= 3 && hardCap.length > 0 && hardType.length >= 3 && ram.length > 0 && imgUrl.length > 0)
                dispatch(addProduct({ cate, newProduct: { brand: brand.toLowerCase(), name, price, os, hardCap, hardType, ram, imgUrl } }));
        }

        if (cate === 'Mobiles') {
            if (brand.length >= 3 && name.length >= 4 && price.length >= 1 && memory.length >= 3 && os.length >= 3 && ram.length > 0 && imgUrl.length > 0)
                dispatch(addProduct({ cate, newProduct: { brand: brand.toLowerCase(), name, price, os, ram, memory, imgUrl } }));
        }

        if (cate === 'Earbuds' || cate === 'Overears') {
            if (brand.length >= 3 && name.length >= 4 && price.length >= 1 && imgUrl.length > 0)
                dispatch(addProduct({ cate, newProduct: { brand: brand.toLowerCase(), name, price, imgUrl } }));
        }
    };


    return (
        <section className={`p-3 ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} min-vh-100`}>
            <h3 className='pb-1 border-bottom'>Add Product</h3>

            <Form className={`p-4 mt-3 w-md-50 mx-auto ${theme === 'light' ? 'border' : ''}`} onSubmit={handleSubmit}>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label> Category</Form.Label>
                    <Form.Select size='sm' value={cate} onChange={handleCate}>
                        {
                            ['Laptops', 'Mobiles', 'Earbuds', 'Overears'].map((cate, i) => {
                                return <option key={i} value={cate}>{cate}</option>
                            })
                        }
                    </Form.Select>
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label> Brand</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required
                        minLength={3}
                        maxLength={12}
                        value={brand}
                        onChange={handleBrand}
                    />
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required
                        minLength={4}
                        maxLength={12}
                        value={name}
                        onChange={handleName}
                    />
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label> Price</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required
                        minLength={1}
                        maxLength={12}
                        value={price}
                        onChange={handlePrice}
                    />
                </div>

                <div className={`d-flex justify-content-between align-items-center flex-wrap mb-4 ${(cate === 'Laptops' || cate === 'Mobiles') ? '' : 'd-none'}`}>
                    <Form.Label>OS</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required={(cate === 'Laptops' || cate === 'Mobiles') ? true : false}
                        minLength={3}
                        maxLength={12}
                        value={os}
                        onChange={handleOS}
                    />
                </div>

                <div className={`d-flex justify-content-between align-items-center flex-wrap mb-4 ${(cate === 'Mobiles') ? '' : 'd-none'}`}>
                    <Form.Label>Memory Capacity</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required={(cate === 'Mobiles') ? true : false}
                        minLength={1}
                        maxLength={12}
                        value={memory}
                        onChange={handleMemory}
                    />
                </div>

                <div className={`d-flex justify-content-between align-items-center flex-wrap mb-4 ${cate === 'Laptops' ? '' : 'd-none'}`}>
                    <Form.Label>Hard Capacity</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required={cate === 'Laptops' ? true : false}
                        minLength={3}
                        maxLength={12}
                        value={hardCap}
                        onChange={handleHardCap}
                    />
                    {/* {vError.price && <p className='text-danger'>{vError.price}</p>} */}
                </div>

                <div className={`d-flex justify-content-between align-items-center flex-wrap mb-4 ${cate === 'Laptops' ? '' : 'd-none'}`}>
                    <Form.Label>Hard Type</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='text'
                        size='sm'
                        required={cate === 'Laptops' ? true : false}
                        minLength={3}
                        maxLength={12}
                        value={hardType}
                        onChange={handleHardType}
                    />
                </div>

                <div className={`d-flex justify-content-between align-items-center flex-wrap mb-4 ${(cate === 'Laptops' || cate === 'Mobiles') ? '' : 'd-none'}`}>
                    <Form.Label>Ram Size</Form.Label>
                    <Form.Control
                        className={`px-1 px-sm-3 py-1`}
                        type='text'
                        size='sm'
                        required={(cate === 'Laptops' || cate === 'Mobiles') ? true : false}
                        minLength={1}
                        maxLength={12}
                        value={ram}
                        onChange={handleRam}
                    />
                </div>

                <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        className='px-1 px-sm-3 py-1'
                        type='url'
                        size='sm'
                        required
                        minLength={0}
                        value={imgUrl}
                        onChange={handleUrl}
                    />
                </div>

                <Button type='submit' onClick={handleAdd} variant="primary" className='py-1 px-4 w-100' id="button-addon2">Add Product</Button>
            </Form>
        </section>
    )
}

export default AddProduct