

import { createSlice, configureStore } from '@reduxjs/toolkit';
import {
    loginUser,
    logoutUser,
    refreshUser
} from './commands.jsx';


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true
}

const extraReducers = (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false
        })
        .addCase(refreshUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false
        })
        .addCase(refreshUser.rejected || refreshUser.pending, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        });
}

const reducers = {
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers,
    extraReducers
})

export const store = configureStore({
    reducer: AuthSlice.reducer,
});