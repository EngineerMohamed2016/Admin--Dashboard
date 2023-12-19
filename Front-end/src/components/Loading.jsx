import React from 'react'
import { Spinner } from 'react-bootstrap'
import useCustomContext from '../../context/Theme';

const Loading = () => {
    const { theme, currentModeStyle } = useCustomContext();

    return (
        <main className={`min-vh-100 position-relative ${currentModeStyle} ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <Spinner animation="grow" className='position-absolute start-50 top-50 translate-middle'></Spinner>
        </main>
    )
}

export default Loading