/**
 * @author: Anthony D'Alesandro
 */
import { Route, Routes } from 'react-router-dom'
import Home from '@/features/Home'
import Settings from '@/features/Settings'
import Login from '@/features/Auth/Login.jsx'
import TestForm from "@/features/Test/TestForm.jsx";

import PaymentTestForm from "@/features/Payment/PaymentTestForm.jsx";
import PaymentReturn from "@/features/Payment/PaymentReturn.jsx";

import FilesUploadForm from "@/features/Images/FilesUploadForm.jsx";

export const PathConstants = {
    HOME: "/",
    SETTINGS: "/settings",
    LOGIN: "/login",
    TESTFORM: "/test-form",
    PAYMENT_PAGE: "/payment",
    PAYMENT_RETURN: "/return",
    FILES_TEST: "/file",
    // ...
}

const routes = [
    { path: PathConstants.TESTFORM, element: <TestForm /> },
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.SETTINGS, element: <Settings /> },
    { path: PathConstants.LOGIN, element: <Login /> },
    { path: PathConstants.PAYMENT_PAGE, element: <PaymentTestForm /> },
    { path: PathConstants.PAYMENT_RETURN, element: <PaymentReturn /> },
    { path: PathConstants.FILES_TEST, element: <FilesUploadForm /> },
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
            <Route path="/*" element={<h1>404</h1>}/>
        </Routes>
    );
}

export default Router;