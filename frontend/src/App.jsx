// HOW TO: import files. first fromt src/assets and second from public
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
/**
 *
 */
import './App.css'
import Navbar from './components/Navbar.jsx'
import Router from './routes/Router.jsx';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '@/context/AuthProvider.jsx'
import MessageProvider from "@/context/MessageProvider.jsx";
import ThemeProvider from '@/context/ThemeProvider.jsx'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                        <div className="min-h-screen">
                            <Navbar/>
                            <MessageProvider>
                                <Router/>
                            </MessageProvider>
                        </div>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
