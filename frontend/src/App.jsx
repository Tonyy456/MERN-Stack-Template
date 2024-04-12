// HOW TO: import files. first fromt src/assets and second from public
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'

function App() {
    const [num, setNum] = useState(0);

    return (
        <div style={{margin: 'auto'}}>
            <button onClick={() => setNum(prev => prev + 2)}> {num}</button>
        </div>
    )

}

export default App
