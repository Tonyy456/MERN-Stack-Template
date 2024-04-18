import {useEffect} from 'react';
import emailIcon from '@/assets/email-icon.svg'
import userIcon from '@/assets/user-text-box-icon.svg'
import passwordIcon from '@/assets/password-icon.svg'

const nameToIconMap = {
    name: userIcon,
    username: userIcon,
    email: emailIcon,
    password: passwordIcon,
    newpassword: passwordIcon,
}

function Text(props) {
    const {label, name, onChange, initialize, value, ...rest} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: ""}),[])

    // Handle change and alert form.
    const handleChange = (e) => { onChange({
        name: name,
        value: e.target.value
    })}

    // Render input form.
    const textboxIcon = nameToIconMap[name]
    return (
        <div className="form-control m-0 w-full">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
            </div>
            <label className="input input-bordered flex items-center gap-2 bg-base-200 text-base-content min-w-full">
                {textboxIcon && <img src={textboxIcon} className="w-4 h-4 opacity-70"/>}
                <input
                    type={"text"}
                    className="grow"
                    value={value || ""}
                    name={name}
                    onChange={handleChange}
                    {...rest}/>
            </label>
        </div>
    );
}

export default Text;