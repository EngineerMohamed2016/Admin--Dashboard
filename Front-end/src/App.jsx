
import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import { verifyToken } from './features/authSlice';

export default function App({ children }) {
  const [showSb, setShowSb] = useState(true);
  const { loading, isAuth } = useSelector(state => state.authSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth)
      dispatch(verifyToken());
  }, []);

  if (loading)
    return <Loading />

  return (
    <div className='d-flex'>
      <aside className='min-vh-100'>
        <Sidebar showSb={showSb} setShowSb={setShowSb} />
      </aside>

      <section className='d-flex flex-column flex-grow-1'>
        <Navbar setShowSb={setShowSb} />
        {children}
      </section>
    </div>
  )
}
