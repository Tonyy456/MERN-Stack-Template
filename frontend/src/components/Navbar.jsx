/**
 *
 * @returns {JSX.Element}
 * @constructor
 */

import {useContext} from "react";
import {ThemeContext} from "@/providers/ThemeProvider.jsx";
import {themes} from '@/config/Themes.jsx'

function Navbar() {
    const {setTheme, nextTheme} = useContext(ThemeContext);
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
                        <li><a href='/'>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a href='/test-form'>Test Image Form</a></li>
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
                            </ul>
                        </li>
                        <li><a href="/">Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/'>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a href='/form-components'>Form Components</a></li>
                                <li><a href='/image-forms'>Test Image Form</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href="/">Item 3</a></li>
                </ul>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                             src="../assets/user-icon.png"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;