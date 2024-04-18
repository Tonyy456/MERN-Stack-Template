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

const themes = ["cupcake", "mytheme", "luxury", "forest"];
const theme = themes[1];
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div data-theme={theme} className="min-h-screen">
                    <Navbar/>
                    <Router/>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
