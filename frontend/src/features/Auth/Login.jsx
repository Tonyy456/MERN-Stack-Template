import Form, {Text} from "@/components/Form";

import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { loginUser } from '@/stores/user-commands.jsx'

function Login() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const HandleLogin = async (e,v) => {
        const response = await dispatch(loginUser(v));
        if (response.meta.requestStatus === 'fulfilled') {
            history("/", {state:{message: "Successfully logged in!"}})
        } else {
            history("/login", {state:{error: "Invalid Login Details!"}})
        }
    }
    return (
        <Form onSubmit={HandleLogin}>
            <Text name="email" label="Email"/>
            <Text name="password" label="Password"/>
        </Form>
    );
}

export default Login;