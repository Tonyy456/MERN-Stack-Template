import axios from 'axios';
import {AUTHKEY, ACCESSTOKENKEY, ACCESSTOKENEXPIRESKEY, REFRESHTOKENKEY, REFRESHTOKENEXPIRESKEY} from '@/context/AuthProvider.jsx';


// Create an instance of axios
const myAxios = axios.create({
    baseURL: ''
});

function getIDPart() {
    return Math.random().toString(36).substring(2);
}

function getClientId() {
    let clientId = localStorage.getItem('clientId');
    if (!clientId) {
        clientId = `client-${getIDPart()}-${getIDPart()}-${getIDPart()}`
        localStorage.setItem('clientId', clientId);
    }
    return clientId;
}

myAxios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem(ACCESSTOKENKEY);
        const refreshToken = localStorage.getItem(REFRESHTOKENKEY);
        const clientID = getClientId();

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (refreshToken) {
            config.headers['x-refresh-token'] = refreshToken; // Custom header for refresh token
        }

        if(clientID) {
            config.headers['Client-ID'] = clientID;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



export default myAxios;
