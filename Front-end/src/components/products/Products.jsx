import React, { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import useCustomContext from '../../../context/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading'
import { deleteProduct, filter } from '../../features/productsSlice';

const ProductsComp = () => {
    const { theme, currentModeStyle } = useCustomContext();
    const { products, loading, cate, search, brand } = useSelector(state => state.productsSlice);
    const dispatch = useDispatch();

    const handleDelete = async (product) => {
        const category = product.hardType ? 'laptops' : product.memory ? 'mobiles' : product.earbud ? 'earbuds' : 'overears';
        await dispatch(deleteProduct({ ID: product._id, category }));
        await dispatch(filter({ cate, search, brand }));
    };


    if (loading)
        return <Loading />

    if (!loading && products.length < 1)
        return <h3 className={`text-center mt-5`}>No products.</h3>

    return (
        < Row className=''>
            {
                products.map(obj =>
                    <Col key={obj._id} sm={6} md={4} xl={3} className='p-3'>
                        <Card className={`${currentModeStyle} ${theme === 'dark' ? 'bg-slate-950' : 'bg-white shadow-lg border-1'} px-2 py-3`}>
                            <Card.Img variant="top" className='w-75 mx-auto' height={180} src={obj.images[0].path} />
                            <Card.Body className='px-2 pt-4 pb-0'>
                                <Card.Title className='mb-2'>{obj.name.split(' ').slice(0, 2).join(' ')}</Card.Title>
                                <span className='fw-bold d-block'>{obj.price}$</span>
                                <span className='text-capitalize'>{obj.brand}</span>

                                <Row className='mt-3 gap-1 justify-content-center flex-nowrap'>
                                    <Col xs={6} className='p-0'><Link to={`/edit-product/${obj._id}`} title='Edit' className='d-block text-center py-0 w-100 py-1 rounded border-primary' style={{ border: '1px solid' }}><img src="./edit.png" width={24} height={24} alt="trash" /></Link></Col>
                                    <Col xs={6} className='p-0'><Button title='Delete' onClick={() => handleDelete(obj)} className='py-0 w-100 py-1 bg-transparent border-1'><img src="./trash.png" width={24} height={24} alt="trash" /></Button></Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
        </Row>)
}

export default ProductsComp