// HOW TO: import files. first fromt src/assets and second from public
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
/**
 *
 */
// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Router from './routes/Router.jsx';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '@/providers/AuthProvider.jsx'
import ThemeProvider from '@/providers/ThemeProvider.jsx'

// const themes = ["cupcake", "mytheme", "luxury", "forest"];
// const theme = themes[1];
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <div className="min-h-screen">
                        <Navbar/>
                        <Router/>
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
