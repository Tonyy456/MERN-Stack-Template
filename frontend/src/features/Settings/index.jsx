import LinkLadder from "@/components/LinkLadder.jsx";
import Form, {Text} from "@/components/Form";
import axios from "axios";
import {useSelector} from "react-redux";
import { toast, Toaster} from "sonner";

function Settings() {
    const user = useSelector(state => state.user);

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
                        <Form
                            onSubmit={UpdateCredentials}
                            defaultValue={{name: user.name, email: user.email}}
                            actionName="Update Profile"
                        >
                            <Text name="name" label="Name"/>
                            <Text name="email" label="Email"/>
                        </Form>
                        <h1 id="Password" className="text-4xl font-bold mb-2 mt-8"> Password </h1>
                        <Form
                            onSubmit={UpdateCredentials}
                            defaultValue={{name: user.name, email: user.email}}
                            actionName="Update Password"
                        >
                            <Text name="password" label="Password" type="password"/>
                            <Text name="newpassword" label="New Password" type="password"/>
                        </Form>
                    </div>
                }
            </div>
    );
}

export default Settings;