import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { filter, setBrand, setCate, setSort } from '../../features/productsSlice';

export default function Category() {
    const cates = ['All', 'Laptops', 'Mobiles', 'Earbuds', 'Overears'];
    const { cate, search } = useSelector(state => state.productsSlice);
    const dispatch = useDispatch();



    const selectCategory = (e) => {
        dispatch(setCate(e.target.value));
        dispatch(setBrand('All'));
        dispatch(filter({ cate: e.target.value, brand:'All', search }));
        dispatch(setSort('low'));
    };

    return (
        <Col xs={12} md={3}>
            <Form className='d-flex align-items-center gap-2' >
                Category
                <Form.Select size='sm' value={cate} onChange={selectCategory}>
                    {
                        cates.map((cate, i) => {
                            return <option key={i} value={cate}>{cate}</option>
                        })
                    }
                </Form.Select>
            </Form>
        </Col>)
}
