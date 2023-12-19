import React, { useEffect } from 'react'
import useCustomContext from '../../context/Theme';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, getProducts, getTransactions } from '../features/dashboardSlice';
import Loading from '../components/Loading';
import DoughnutChart from '../components/dashboard/Doughnut';
import LineChart from '../components/dashboard/Line';
import AreaChart from '../components/dashboard/Area';

const Dashboard = () => {
    const { theme, currentModeStyle } = useCustomContext();
    const { membersLoading, transactionsLoading, productsLoading, membersCount, allTransactionsCount, weeklyTransactionsCount, weeklySales, todaySales, doughnutData, lineData } = useSelector(state => state.dashboardSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMembers());
        dispatch(getTransactions());
        dispatch(getProducts());
    }, []);

    if (membersLoading || transactionsLoading || productsLoading)
        return <Loading />

    const stats = [
        {
            imgPath: './members.png',
            imgAlt: 'members',
            title: 'Total Members',
            count: membersCount,
        },

        {
            imgPath: './products.png',
            imgAlt: 'products',
            title: 'Total Products',
            count: '4',
        },

        {
            imgPath: './total-orders.png',
            imgAlt: 'total-orders',
            title: 'Total Transactions',
            count: allTransactionsCount,
        },

        {
            imgPath: './orders.png',
            imgAlt: 'orders',
            title: 'Weekly Transactions',
            count: weeklyTransactionsCount,
        },

        {
            imgPath: './dollar.png',
            imgAlt: 'dollar',
            title: 'Weekly Sales',
            count: '$' + weeklySales,
        },

        {
            imgPath: './dollar-sign.png',
            imgAlt: 'dollar-sign',
            title: 'Sales Today',
            count: '$' + todaySales,
        },

    ]

    return (
        <section className={`p-3 ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} min-vh-100`}>
            <h3 className='mb-3 border-bottom d-inline-block'>Dashboard</h3>

            <Row className='p-0 row-gap-3'>
                <Col md={8} className='p-0'>
                    <Row className='p-0 row-gap-2'>
                        {
                            stats.map((obj, i) =>
                                <Col key={i} md={6} className='px-1'>
                                    <article className={`px-2 py-3 border ${theme === 'dark' ? 'bg-slate-950 border-transparent' : 'bg-white  border-slate-500 shadow'} d-flex align-items-center gap-2`}>
                                        <div className={`rounded-circle p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-500'}`}>
                                            <img src={obj.imgPath} width={50} height={50} alt={obj.imgAlt} />
                                        </div>
                                        <div>
                                            <h6 className='mb-3'>{obj.title}</h6>
                                            <h5>{obj.count}</h5>
                                        </div>
                                    </article>
                                </Col>
                            )
                        }
                    </Row>
                </Col>

                <Col md={4} className='px-1 position-relative h-290px h-md-auto'>
                    <DoughnutChart data={doughnutData} bgColor={theme === 'dark' ? '#020617' : '#ffffff'} showBorder={theme === 'dark' ? 0 : 1} />
                </Col>
            </Row>

            <div className='p-1'>
                <div className={`over-hide mt-3 h-290px position-relative py-1 border ${theme === 'dark' ? 'bg-slate-950 border-transparent' : 'border-slate-500 bg-white'}`}>
                    <LineChart data={lineData} bgColor={theme === 'dark' ? '#020617' : '#ffffff'} />
                </div>
            </div>

            <div className='p-1'>
                <div className={`over-hide mt-3 h-290px position-relative py-1 border ${theme === 'dark' ? 'bg-slate-950 border-transparent' : 'border-slate-500 bg-white'}`}>
                    <AreaChart bgColor={theme === 'dark' ? '#020617' : '#ffffff'} />
                </div>
            </div>

        </section>
    )
}

export default Dashboard