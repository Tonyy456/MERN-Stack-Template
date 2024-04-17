/**
 * @author: Anthony D'Alesandro
 */
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='*' element={<div>Unknown Page</div>}/>
        </Routes>
    );
}

export default Router;