import LinkLadder from "@/components/LinkLadder.jsx";

import axios from "@/utils/axios.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import {useState, useEffect} from "react";
import { toast, Toaster} from "sonner";
import useHistory from "@/hooks/useHistory.jsx"

import {TextField, Submit, useForm} from "@/components/Form"

function Settings() {
    const [user, setUser] = useState(null);
    const {auth} = useAuth();
    const history = useHistory();
    if(!auth.isAuthenticated && auth.confirmed) {
        history("/", {message: "Not Logged In!", type:"error"})
    }
    useEffect(() => {
        if(auth.user) {
            axios.get(`/api/users/${auth.user}`).then(result => {
                setUser(result.data.user)
            })
        }
    }, [auth.user]);
    if(!auth.confirmed) return ( <></> )
    const UpdateCredentials = async (e,v) => {
        try {
            const response = await axios.put(`/api/users/${user._id}`, v)
            if(response.status === 200) {
                toast.success(`User updated successfully.`, {className: 'alert alert-success'});
            }
        } catch (e) {
            toast.warning(e.response.data.message, {className: 'alert alert-error'})
        }
    }

    return (
            <div className="m-4 flex flex-row items-start">
                <Toaster position="top-center"/>
                <LinkLadder />
                { user &&
                    <div className="ml-4 flex-grow">
                        <h1 id="Profile" className="text-4xl font-bold mb-2"> Profile </h1>
                        <AccountDetailsForm onSubmit={UpdateCredentials} value={user}/>
                        <h1 id="Password" className="text-4xl font-bold mb-2 mt-8"> Password </h1>
                        <PasswordsDetailsForm onSubmit={UpdateCredentials}/>
                    </div>
                }
            </div>
    );
}

function AccountDetailsForm(props) {
    const form = useForm();

    useEffect(() => {
        const user = props.value;
        form.setState((prev) => {
            return {
                email: user.email,
                name: user.name,
                ...prev}
        })
    }, [props.value]);

    const onSubmit = (e,v) => {
        e.preventDefault();
        props.onSubmit(e,form.state);
    }

    return (
        <form onSubmit={onSubmit}>
            <TextField label="Username" name="name" form={form}/>
            <TextField label="Email" name="email" form={form}/>
            <br/>
            <Submit />
        </form>
    )
}

function PasswordsDetailsForm(props) {
    const form = useForm();
    const onSubmit = (e,v) => {
        e.preventDefault();
        props.onSubmit(e,form.state);
    }
    return (
        <form onSubmit={onSubmit}>
            <TextField reveal label="Password" name="password" form={form}/>

            <TextField reveal label="New Password" name="newpassword" form={form}/>
            <br/>
            <Submit />
        </form>
    )
}

export default Settings;