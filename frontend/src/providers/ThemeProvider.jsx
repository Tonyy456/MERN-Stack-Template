import React, {useState, useEffect, createContext} from 'react';
import {themes} from '@/config/Themes.jsx'

export const ThemeContext = createContext();
function ThemeProvider(props) {
    const [themeIndex, setThemeIndex] = useState(0);
    const setTheme = (name) => {
        const index = themes.findIndex(theme => theme === name);
        if(index >= 0) setThemeIndex(index);
        console.log(index, name)
    }
    const nextTheme = () => { setThemeIndex(prev => (prev + 1) % themes.length)}
    return (
        <ThemeContext.Provider value={{setTheme,nextTheme}}>
            <div id='website-theme-provider' data-theme={themes[themeIndex]}>
                {props.children}
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;