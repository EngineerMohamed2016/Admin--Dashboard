import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../features/productsSlice';

export default function Sort() {
    const { sort } = useSelector(state => state.productsSlice);
    const dispatch = useDispatch();

    const sortProducts = (e) => {
        dispatch(setSort(e.target.value));
    }

    return (
        <Col xs={6} md={3}>
            <Form className='d-flex align-items-center gap-2'>
                Sort
                <Form.Select size='sm' value={sort} onChange={sortProducts}>
                    <option value={'low'}>Price(Lowest)</option>
                    <option value={'high'}>Price(Highest)</option>
                </Form.Select>
            </Form>
        </Col>)
}
