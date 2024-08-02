import React, {useState, useEffect, createContext} from 'react';
import {themes} from '@/config/Themes.jsx'

export const ThemeContext = createContext();
function ThemeProvider(props) {
    const [themeIndex, _setThemeIndex] = useState(0 || localStorage.getItem('themeIndex'));
    const setThemeIndex = (themeIndex) => {
        localStorage.setItem('themeIndex', themeIndex);
        _setThemeIndex(themeIndex)
    }
    const setTheme = (name) => {
        const index = themes.findIndex(theme => theme === name);
        if(index >= 0) {
            setThemeIndex(index);
        }
    }
    const nextTheme = () => { setThemeIndex(prev => (prev + 1) % themes.length)}
    const theme = themes[themeIndex];
    return (
        <ThemeContext.Provider value={{setTheme, nextTheme, theme}}>
            <div id='website-theme-provider' data-theme={themes[themeIndex]}>
                {props.children}
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;