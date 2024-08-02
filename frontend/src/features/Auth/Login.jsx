import React, {useState, useEffect} from 'react'
import useHistory from "@/hooks/useHistory.jsx"
import useAuth from "@/hooks/useAuth.jsx";
import axios from "@/utils/axios.jsx";
import {Toaster, toast} from "sonner";
import {PathConstants} from "@/routes/Router.jsx";

import {
    useForm,
    TextField,
    Submit
} from "@/components/Form"

function Login() {
    const history = useHistory();
    const { auth, login, logout } = useAuth();

    const HandleLogin = async (e,v) => {
        axios.post('/api/login', v).then(result => {
            const loginData = {
                userID: result.data.user._id,
                accessToken: result.data.accessToken,
                accessTokenExpiresAt: result.data.accessTokenExpiresAt,
                refreshToken: result.data.refreshToken,
                refreshTokenExpiresAt: result.data.refreshTokenExpiresAt,
            }
            login(loginData)
            history(PathConstants.HOME, {message: 'Logged in!'} )
        }).catch(err => {
            const errorMessage = err.message || err.response.data.message;
            toast(errorMessage ,{className: 'alert alert-error'})
        })
    }
    const HandleLogout = () => {
        logout().then(() => {
            history(0, {message: "Logged Out"});
        }).catch(() => {
            console.log('Failed to logout.');
        })

    }

    return (
        <React.Fragment>
            <Toaster position="top-right" richColors/>
            {(auth && !auth.isAuthenticated) ?
                <LoginForm
                    onSubmit={HandleLogin}
                />
                :
                <AlreadyLoggedInPage
                    handle={HandleLogout}
                />
            }
        </React.Fragment>

    );
}

function LoginForm(props) {
    const form = useForm();

    const onSubmit = (e,v) => {
        e.preventDefault();
        props.onSubmit(undefined, form.state);
    }

    return (
        <div className="w-1/2 mt-20 m-auto">
            <form onSubmit={onSubmit}>
                <TextField
                    form={form}
                    label="Email"
                    name="email"
                />
                <TextField
                    form={form}
                    label="Password"
                    name="password"
                />
                <br/>
                <Submit />
            </form>
        </div>
    )
}

function AlreadyLoggedInPage(props) {
    const HandleLogout = props.handle;
    return (
        <div className="w-1/2 mt-20 m-auto">
            <h1>Already Logged In!</h1>
            <button className="btn btn-primary" onClick={HandleLogout}>Logout</button>
        </div>
    )
}

export default Login;