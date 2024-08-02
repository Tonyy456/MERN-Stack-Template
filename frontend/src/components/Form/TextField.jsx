import emailIcon from '@/assets/email-icon.svg'
import userIcon from '@/assets/user-text-box-icon.svg'
import passwordIcon from '@/assets/password-icon.svg'
import React, {useState} from "react";

const nameToIconMap = {
    name: userIcon,
    username: userIcon,
    email: emailIcon,
    password: passwordIcon,
    newpassword: passwordIcon,
}

function TextField(props) {
    // Catch any missing form components
    const [reveal, setReveal] = useState(false)
    const {form, label, name, ...rest} = props;
    if(!form || !name) return <p className="text-red-600"> Text field missing props. </p>

    const value = form.state[name] || "";
    const textboxIcon = nameToIconMap[name]
    const passwordField = ['password','newpassword'].includes(name);

    const handleChange = (e,v) => { form.onChange({
        name: name,
        value: e.target.value,
    })}

    return (
        <>
            <div className="form-control m-0 w-full">
                <div className="flex justify-between">
                    <div className="label">
                        <span className="label-text text-lg font-medium">{label}</span>
                    </div>
                    {passwordField && <div className="flex gap-2">
                        <div className="label">
                            <span className="label-text text-sm font-medium"> Show Password? </span>
                        </div>
                        <input
                            type={'checkbox'}
                            id={name + "-show-password"}
                            value={value}
                            onChange={() => setReveal(prev => !prev)}
                            autoComplete={"on"}
                        />
                    </div>}
                </div>
                <label
                    className="input input-bordered flex items-center gap-2 bg-base-200 text-base-content min-w-full">
                    {textboxIcon && <img src={textboxIcon} className="w-4 h-4 opacity-70"/>}
                    <input
                        type={passwordField && !reveal ? 'password' : 'text'}
                        id={name}
                        className="grow"
                        value={value}
                        onChange={handleChange}
                        autoComplete={"on"}
                    />
                </label>
            </div>
        </>

    )
}

export default TextField;