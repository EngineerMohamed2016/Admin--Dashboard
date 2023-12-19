import React from 'react'
import { BiSolidDashboard } from 'react-icons/bi'
import { AiFillDollarCircle, AiFillFolder, AiFillFolderAdd } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import useCustomContext from '../../context/Theme'

const links = [
    {
        path: '/',
        name: 'Dashboard',
        icon: <BiSolidDashboard className='fs-3 me-2' />
    },
    {
        path: '/products',
        name: 'Products',
        icon: <AiFillFolder className='fs-3 me-2' />

    },
    {
        path: '/add-product',
        name: 'Add Product',
        icon: <AiFillFolderAdd className='fs-3 me-2' />
    },
    {
        path: '/members',
        name: 'Members',
        icon: <FaUserFriends className='fs-3 me-2' />
    },
    {
        path: '/transactions',
        name: 'Transactions',
        icon: <AiFillDollarCircle className='fs-3 me-2' />
    },
]

const Sidebar = ({ showSb, setShowSb }) => {
    const location = useLocation();
    const { theme, currentModeStyle } = useCustomContext();

    const handleLink = () => {
        if (window.innerWidth < 992)
            setShowSb(pre => !pre);
    }

    return (
        <div className={`sidebar h-100 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white border-end text-black'} position-absolute w-100 z-3 position-lg-static w-lg-240px ${!showSb ? 'start-0 ms-lg-n240px' : 'start-n100 ms-lg-0'} bg-slate-950 px-3 py-3 d-flex flex-column gap-5`}>
            <Link to={'/'} onClick={handleLink} className='d-flex align-align-items-center gap-2'>
                <img src="./logo.png" width={34} height={34} alt="logo" />
                <h3 className={`${currentModeStyle}`}>Xperia</h3>
            </Link>

            <ul>
                {
                    links.map((link, i) =>
                        <li key={i}>
                            <Link to={link.path} onClick={handleLink} className={`dash-links ${currentModeStyle} ${location.pathname === link.path ? 'bg-primary text-white' : ''} mb-1 rounded d-block p-2`}>
                                {link.icon}  {link.name}
                            </Link>
                        </li>
                    )
                }
            </ul>

        </div>
    )
}

export default Sidebar
