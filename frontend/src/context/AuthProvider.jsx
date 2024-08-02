import {createContext, useState, useEffect} from 'react'
import axios from '@/utils/axios.jsx'
import useAuth from "@/hooks/useAuth.jsx";
import * as result from "autoprefixer";
const AuthContext = createContext({})

// // Handle sending 'Bearer CODE'
// axios.interceptors.request.use(function (config) {
//     const token = localStorage.getItem(ACCESSTOKENKEY);
//     config.headers.Authorization =  (token && token.length > 10) ? `Bearer ${token}` : '';
//     return config;
// });

export const AUTHKEY = "mcdonalds-drive-thru-promo-code-key"
export const ACCESSTOKENKEY = "mcdonalds-drive-thru-big-mac"
export const ACCESSTOKENEXPIRESKEY = "mcdonalds-drive-thru-big-mac-meal"
export const REFRESHTOKENKEY = "mcdonalds-drive-thru-refresh-token"
export const REFRESHTOKENEXPIRESKEY = "mcdonalds-drive-thru-refresh-token-big-mac"

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        confirmed: false,
    });

    const clearStorage = () => {
        localStorage.removeItem(AUTHKEY);
        localStorage.removeItem(ACCESSTOKENKEY);
        localStorage.removeItem(ACCESSTOKENEXPIRESKEY);
        localStorage.removeItem(REFRESHTOKENKEY);
        localStorage.removeItem(REFRESHTOKENEXPIRESKEY);
    }

    const refreshTokens = async () => {
        let success = true;
        axios.post('/api/refresh').then(result => {
            setAuth(prev => {
                return {...prev, user: result.data.user._id, isAuthenticated: true, confirmed: true};
            });
            localStorage.setItem(AUTHKEY, result.data.user._id);
            localStorage.setItem(ACCESSTOKENKEY, result.data.accessToken);
            localStorage.setItem(ACCESSTOKENEXPIRESKEY, result.data.accessTokenExpiresAt);
            localStorage.setItem(REFRESHTOKENKEY, result.data.refreshToken);
            localStorage.setItem(REFRESHTOKENEXPIRESKEY, result.data.refreshTokenExpiresAt);
        }).catch(result => {
            console.log('Failed to refresh user.')
            success = false;
            setAuth(prev => {
                return {...prev, user: undefined, accessToken: undefined, isAuthenticated: false, confirmed: true};
            })
            clearStorage();
        });
        return success;
    }

    const tokenExpired = () => {
        const accessTokenExpiresAt = localStorage.getItem(ACCESSTOKENEXPIRESKEY);
        if(!accessTokenExpiresAt) return true;

        const expiresAt = new Date(accessTokenExpiresAt);
        const now = new Date();

        const bufferTimeMinutes = 0;
        const bufferTime = bufferTimeMinutes * 60 * 1000;

        //console.log(`${now.getTime()} > (${expiresAt.getTime()} - bufferTime)`)
        return now.getTime() > (expiresAt.getTime() - bufferTime);
    }

    const setUserState = async () => {
        const userID = localStorage.getItem(AUTHKEY);
        const storedAccessToken = localStorage.getItem(ACCESSTOKENKEY);
        if(!userID || userID.length < 10) {
            console.log('User is not logged in.')
            return;
        }

        const acccessTokenExpired = tokenExpired();
        if(acccessTokenExpired || !storedAccessToken) {
            console.log('refreshing tokens!');
            const success = await refreshTokens();
            if(!success) { return; }
        }

        setAuth(prev => {
            return { ...prev,
                user: userID,
                accessToken: storedAccessToken,
                isAuthenticated: true,
                confirmed: true,
                }
            }
        )
    }

    /* On load of every page, get user id, access token, and weather the user is authenticated. */
    useEffect(() => {
        setUserState();
    },[])

    return (
        <AuthContext.Provider value={{auth, setAuth, clearStorage}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;