import React from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { Link } from 'react-router-dom';
import useCustomContext from '../../context/Theme';
import ThemeToggler from './ThemeToggler';
import { FcSettings } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../features/authSlice';
import { showSuccessMsg } from '../../utils/successMsg';

const Navbar = ({ setShowSb }) => {
    const handleSidebar = () => setShowSb(pre => !pre);
    const { theme, currentModeStyle } = useCustomContext();
    const { isAuth } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('xperia-admin-token');
        dispatch(setIsAuth(false));
        showSuccessMsg('Signed out successfully.');
    }

    return (
        <nav className={`navbar px-4 py-3 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white border-bottom text-black'} d-flex justify-content-between align-items-center flex-nowrap gap-4`}>
            <button onClick={handleSidebar} className='bg-transparent border-0'><img src="./bars.png" width={33} height={33} alt="bars" /></button>

            <section className='d-flex align-items-center gap-2'>
                <ThemeToggler />
                <div className='position-relative'>
                    <IoMdNotifications className={`fs-4 ${currentModeStyle}`} />
                    <p className='notif-count d-flex align-items-center justify-content-center bg-danger text-white position-absolute fw-bold rounded-circle'>9</p>
                </div>

                <FcSettings className='fs-3 ms-2' />

                {isAuth ?
                    <button className={`fs-4 ms-2 border-0 bg-transparent p-0  ${currentModeStyle}`} onClick={logout}>Logout</button>
                    :
                    <Link to='/login' className={`fs-4 ms-2  ${currentModeStyle}`}>{'Login'}</Link>
                }
            </section>
        </nav>
    )
}

export default Navbar
