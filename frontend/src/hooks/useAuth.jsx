import {useContext} from 'react';
import AuthContext, {AUTHKEY, ACCESSTOKENKEY, ACCESSTOKENEXPIRESKEY, REFRESHTOKENKEY, REFRESHTOKENEXPIRESKEY} from '@/context/AuthProvider.jsx';
import axios from "@/utils/axios.jsx";


function useAuth(props) {
    const {auth, setAuth, clearStorage} = useContext(AuthContext);

    const login = (data) => {
        const {userID, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt} = data;
        if(userID && accessToken && accessTokenExpiresAt) {
            setAuth(prev => {
                return {...prev, user: userID, isAuthenticated: true};
            });
            localStorage.setItem(AUTHKEY, userID);
            localStorage.setItem(ACCESSTOKENKEY, accessToken);
            localStorage.setItem(ACCESSTOKENEXPIRESKEY, accessTokenExpiresAt);
            localStorage.setItem(REFRESHTOKENKEY, refreshToken);
            localStorage.setItem(REFRESHTOKENEXPIRESKEY, refreshTokenExpiresAt);

        } else {
            console.error('Did not pass enough data to the login method.')
            throw new Error('hello world');
        }

    }

    const handleLogout = async () => {
        const userID = localStorage.getItem(AUTHKEY);
        const response = await axios.post('/api/logout');
        console.log(`Logged out response: ${response}`);
    }

    const logout = async () => {
        await handleLogout();
        setAuth(prev => {
            return {...prev, user: null, isAuthenticated: false};
        });
        clearStorage();
    }

    return {
        auth,
        login,
        logout
    };
}

export default useAuth;
