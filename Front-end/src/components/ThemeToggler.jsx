import React from 'react'
import useCustomContext from '../../context/Theme'

export default function ThemeToggler() {
    const { theme, toggleMode } = useCustomContext();
    
    return (
        <div className='bg-transparent border-0'>
            {
                theme === 'dark' ?
                    <button style={{ width: '30px', height: '30px' }} className='p-1 d-flex justify-content-center align-items-center bg-transparent border-0 fs-4' title='Light Mode' onClick={toggleMode}>🔆</button>
                    :
                    <button style={{ width: '30px', height: '30px' }} className='p-1 d-flex justify-content-center align-items-center bg-transparent border-0 fs-5' title='Dark Mode' onClick={toggleMode}>🌙</button>
            }
        </div>
    )
}
