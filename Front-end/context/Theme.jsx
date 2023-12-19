import { createContext, useContext, useState } from 'react'

const Cntx = createContext();
 
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const toggleMode = () => setTheme(pre => pre === 'dark' ? 'light' : 'dark');

    const currentModeStyle = theme === 'dark' ? 'text-white' : 'text-black';


    return <Cntx.Provider value={{theme, toggleMode, currentModeStyle}}>
        {children}
    </Cntx.Provider>
}

export default function useCustomContext(){
    return useContext(Cntx);
}