/**
 * @author: Anthony D'Alesandro
 */
import { Route, Routes } from 'react-router-dom'
import Home from '@/features/Home'
import Settings from '@/features/Settings'
import Login from '@/features/Auth/Login.jsx'

const PathConstants = {
    HOME: "/",
    SETTINGS: "/settings",
    LOGIN: "/login"
    // ...
}

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.SETTINGS, element: <Settings /> },
    { path: PathConstants.LOGIN, element: <Login /> },
]


function Router() {
    return (
        // <Routes>
        //     <Route path='/' element={<Home/>}/>
        //     <Route path='*' element={<div>Unknown Page</div>}/>
        // </Routes>
        <Routes>
            {routes.map((item,key) => {
                return (
                    <Route key={key} path={item.path} element={item.element}/>
                )
            })}
        </Routes>
    );
}

export default Router;