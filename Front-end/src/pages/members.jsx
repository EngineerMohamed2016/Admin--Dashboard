import React, { useEffect } from 'react'
import useCustomContext from '../../context/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers, setLatest, setPageNum } from '../features/membersSlice';
import { Col, Row } from 'react-bootstrap';
import Loading from '../components/Loading'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const Members = () => {
  const { theme, currentModeStyle } = useCustomContext();
  const { members, membersCount, pageNum, limitPerPage, loading, latest } = useSelector(state => state.membersSlice)
  const dispatch = useDispatch();
  const paginationButtonsCount = Math.ceil(membersCount / limitPerPage)


  useEffect(() => {
    dispatch(getMembers({ page: 1, limit: limitPerPage, sort: 'createdAt' }));
    dispatch(setPageNum(1));
    dispatch(setLatest(false));
  }, []);

  const handlePage = (e) => {
    const activePage = Number(e.target.value) + 1;
    dispatch(setPageNum(activePage));
    dispatch(getMembers({ page: activePage, limit: limitPerPage, sort: 'createdAt' }));
    dispatch(setLatest(false));
  }

  const handleUp = () => {
    dispatch(setLatest(true))
    dispatch(getMembers({ page: pageNum, limit: limitPerPage, sort: '-createdAt' }));
  }

  const handleDown = () => {
    dispatch(setLatest(false))
    dispatch(getMembers({ page: pageNum, limit: limitPerPage, sort: 'createdAt' }));
  }

  if (loading)
    return <Loading />

  return (
    <section className={`p-3 ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} overflow-auto`} style={{ height: 'calc(100vh - 68px)', fontSize: '15px' }}>
      <h3 className='pb-1 px-2 border-bottom' style={{ width: 'fit-content' }}>Members</h3>
      <Row className='my-3 pb-1' style={{ borderBottom: theme === 'light' ? '1px solid black' : '1px solid white' }}>
        <Col xs={3} md={3} className='d-none d-md-block'>
          ID
        </Col>
        <Col xs={2} md={2}>
          Name
        </Col>
        <Col xs={4} md={4}>
          Email
        </Col>
        <Col xs={3} md={3}>
          Created At
          {
            !latest ? <BsArrowUp onClick={handleUp} className={`ms-1`} style={{ fontSize: '19px' }} role='button' />
              :
              <BsArrowDown onClick={handleDown} className={`ms-1`} style={{ fontSize: '19px' }} role='button' />
          }
        </Col>
      </Row>
      {
        members.map(obj =>
          <Row key={obj._id} className='border-bottom mb-3 overflow-auto border-color' style={{ fontSize: '13px' }}>
            <Col xs={3} md={3} className='d-none d-md-block'>
              <p>{obj._id}</p>
            </Col>

            <Col xs={2} md={2}>
              <p className='overflow-auto'>{obj.name}</p>
            </Col>

            <Col xs={6} md={4}>
              <p className='overflow-auto'>{obj.email} {obj.isAdmin && <span title='Admin' className='fs-6'>💎</span>} </p>
            </Col>

            <Col xs={4} md={3}>
              <p>{obj.createdAt ? obj.createdAt.slice(0, 10) : '2023-08-18'}</p>
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

export default Members