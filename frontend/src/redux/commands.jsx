import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// Thunk commands. used in store to update store state. Asyncronous so much be Thunk.
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const res = await axios.post(`/api/login`, {
        email: credentials.email,
        password: credentials.password
    }).catch();
    if (res && res.status === 200)
        return res.data;
    else
        throw new Error('unable to login')
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const res = await axios.post(`/api/logout`, null, {
        withCredentials: true
    }).catch();
    if (res && res.status === 200)
        return res.data;
    else
        throw new Error("Unable to logout. Please try again.")
});

export const refreshUser = createAsyncThunk('auth/refresh', async () => {
    const res = await axios.post(`/api/refresh`, {}, {
        withCredentials: true,
    }).catch();
    if(res && res.status === 200)
        return res.data;
    else
        throw new Error('Unable to refresh')
});