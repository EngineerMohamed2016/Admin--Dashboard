import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, setLatest, setPageNum } from '../features/transactionsSlice';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import useCustomContext from '../../context/Theme';
import Loading from './Loading';

const Transactions = () => {
    const { theme, currentModeStyle } = useCustomContext();
    const { transactions, allTransactionsCount, pageNum, limitPerPage, loading, latest } = useSelector(state => state.transactionsSlice)
    const dispatch = useDispatch();
    const paginationButtonsCount = Math.ceil(allTransactionsCount / limitPerPage)

    useEffect(() => {
        dispatch(getTransactions({ page: 1, limit: limitPerPage, sort: 'createdAt' }));
        dispatch(setPageNum(1));
        dispatch(setLatest(false));
    }, []);

    const handlePage = (e) => {
        const activePage = Number(e.target.value) + 1;
        dispatch(setPageNum(activePage));
        dispatch(getTransactions({ page: activePage, limit: limitPerPage, sort: 'createdAt' }));
        dispatch(setLatest(false))
    }

    const handleUp = () => {
        dispatch(setLatest(true))
        dispatch(getTransactions({ page: pageNum, limit: limitPerPage, sort: '-createdAt'}));
    }

    const handleDown = () => {
        dispatch(setLatest(false))
        dispatch(getTransactions({ page: pageNum, limit: limitPerPage, sort: 'createdAt'}));
    }

    if (loading)
        return <Loading />

    return (
        <section className={`p-3 ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} overflow-auto`} style={{ height: 'calc(100vh - 68px)', fontSize: '15px' }}>
            <h3 className='pb-1 px-2 border-bottom' style={{ width: 'fit-content' }}>Transactions</h3>
            <Row className='my-3 pb-1' style={{ borderBottom: theme === 'light' ? '1px solid black' : '1px solid white' }}>
                <Col xs={3}>
                    Transaction ID
                </Col>
                <Col xs={3}>
                    Member ID
                </Col>
                <Col xs={2}>
                    # of products
                </Col>

                <Col xs={2}>
                    Price
                </Col>

                <Col xs={2}>
                    Created At
                    {
                        !latest ? <BsArrowUp onClick={handleUp} className={`ms-1`} style={{ fontSize: '19px' }} role='button' />
                            :
                            <BsArrowDown onClick={handleDown} className={`ms-1`} style={{ fontSize: '19px' }} role='button' />
                    }
                </Col>
            </Row>
            {
                transactions.map(obj =>
                    <Row key={obj._id} className='border-bottom mb-3 overflow-auto border-color' style={{ fontSize: '13px' }}>
                        <Col xs={3}>
                            <p className='overflow-auto'>{obj._id}</p>
                        </Col>

                        <Col xs={3}>
                            <p className='overflow-auto'>{obj.userID}</p>
                        </Col>

                        <Col xs={2}>
                            <p className='overflow-auto'>{obj.productsCount}</p>
                        </Col>

                        <Col xs={2}>
                            <p className='overflow-auto'>{obj.totalPrice}$</p>
                        </Col>

                        <Col xs={2}>
                            <p className='overflow-auto'>{obj.createdAt ? obj.createdAt.slice(0, 10) : '2023-08-18'}</p>
                        </Col>
                    </Row>
                )
            }

            <div className='d-flex justify-content-end mt-4'>
                {
                    Array.from({ length: paginationButtonsCount }).map((_, i) =>
                        <button key={i} onClick={handlePage} value={i} className={`px-3 py-1 me-1  ${pageNum - 1 === i ? 'bg-primary text-white' : 'bg-white'} ${i === 0 ? 'rounded-start' : ''} ${i === paginationButtonsCount - 1 ? 'rounded-end' : ''} ${theme === 'light' ? 'border-1' : "border-0"}`}>{i + 1}</button>)
                }
            </div>
        </section>
    )
}

export default Transactions