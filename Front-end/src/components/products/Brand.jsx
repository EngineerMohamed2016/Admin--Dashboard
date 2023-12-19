import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { filter, setBrand, setSort } from '../../features/productsSlice';

export default function Brand() {

    const { helper, cate, brand, search } = useSelector(state => state.productsSlice);
    const brands = ['All', ...new Set(helper.map(obj => obj.brand))];
    const dispatch = useDispatch();


    const selectBrand = (e) => {
        dispatch(setBrand(e.target.value));
        dispatch(filter({ cate, brand: e.target.value, search }));
        dispatch(setSort('low'));
    };

    return (
        <Col xs={6} md={3}>
            <Form className='d-flex align-items-center gap-2'>
                Brand
                <Form.Select size='sm' value={brand} onChange={selectBrand}>
                    {
                        brands.map((b, i) => {
                            return <option key={i} value={b}>{b[0].toUpperCase() + b.slice(1)}</option>
                        })
                    }
                </Form.Select>
            </Form>
        </Col>)
}
