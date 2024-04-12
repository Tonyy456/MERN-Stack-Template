// HOW TO: import files. first fromt src/assets and second from public
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'

const themes = ["cupcake", "mytheme", "luxury", "forest"];
function App() {
    const [theme, setTheme] = useState(0);

    return (
        <div id="theme-provider" data-theme={themes[theme]} >
            <div className='h-screen w-screen'>
                <div className='h-1/5 flex items-center justify-center'>
                    <button className='btn font-bold' onClick={() => setTheme(prev => (prev + 1) % themes.length)}>Next Theme </button>
                    <h1 className="text-3xl font-bold underline ml-10">
                        {themes[theme]}
                    </h1>
                </div>

            </div>
        </div>

    )

}

export default App
