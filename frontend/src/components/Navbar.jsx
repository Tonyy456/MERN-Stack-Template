/**
 *
 * @returns {JSX.Element}
 * @constructor
 */

import {useContext} from "react";
import {ThemeContext} from "@/context/ThemeProvider.jsx";
import {themes} from '@/config/Themes.jsx'
import { PathConstants } from '@/routes/Router.jsx'
import useAuth from "@/hooks/useAuth.jsx";
import icon from '@/assets/user-icon.png'
import useHistory from "@/hooks/useHistory.jsx";
import "./NavbarStyles.css"

function Navbar() {
    const {setTheme, nextTheme, theme} = useContext(ThemeContext);
    const {auth, logout} = useAuth();
    const history = useHistory();
    const loggedIn = auth.isAuthenticated;
    const handleLogout = async () => {
        logout().then(() => {
            history(PathConstants.HOME, {message: 'Successfully Logged Out'});
        }).catch(() => {
            history(PathConstants.HOME, {message: 'Failed to logout!', type: 'error'});

        })
    }
    return (
        <div className="navbar bg-base-100 border-b-black border-b">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <select
                                onChange={e => setTheme(e.target.value)}
                                className="select select-primary select-sm w-full max-w-xs"
                            >
                                {themes.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </li>
                        <IfBlock cond={!loggedIn}>
                            <li><a href={PathConstants.LOGIN}>Login</a></li>
                        </IfBlock>
                        <li>
                            <p></p>
                            <ul className="p-2">
                                <li><a href={PathConstants.SETTINGS}>Settings</a></li>
                                <button
                                    className="btn btn-primary btn-sm w-min ml-2"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </ul>
                        </li>

                    </ul>
                </div>
                <a href={PathConstants.HOME} className="btn btn-ghost text-xl">Website</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex items-center">
                    <li><a href={PathConstants.FILES_TEST}>Images</a></li>
                    <li><a href={PathConstants.PAYMENT_PAGE}>Pay/Checkout</a></li>
                    <li><a href={PathConstants.TESTFORM}>Form Components</a></li>
                    <li>
                        <details className="dropdown dropdown-end">
                            <summary>Options</summary>
                            <ul className="menu menu-sm dropdown-content">
                                <li>
                                    <select
                                        onChange={e => setTheme(e.target.value)}
                                        value={theme}
                                        className="select select-primary select-sm w-72 max-w-xs"
                                    >
                                        {themes.map((item, index) => (
                                            <option value={item} key={index}>{item}</option>
                                        ))}
                                    </select>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <IfBlock cond={loggedIn}>
                        <li className="dropdown dropdown-end m-1">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="rounded-full inset-0 bg-primary p-1 w-full opacity-100">
                                    <div className="profileIcon bg-primary-content"/>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a href={PathConstants.SETTINGS}>Settings</a></li>
                                <li>
                                    <button
                                        className="btn btn-primary btn-sm w-min ml-2"
                                        onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </IfBlock>
                    <IfBlock cond={!loggedIn}>
                        <li>
                            <a
                                href={PathConstants.LOGIN}
                                className="font-bold hover:text-white hover:bg-blue-950 duration-300">
                                Login
                            </a>
                        </li>
                    </IfBlock>
                </ul>
            </div>
        </div>
    );
}

function IfBlock(props) {
    return props.cond ? props.children : <></>
}

export default Navbar;