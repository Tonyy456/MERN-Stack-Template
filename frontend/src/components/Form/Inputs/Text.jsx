import {useEffect} from 'react';

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
    return (
        <label className="input input-bordered flex items-center gap-2 min-w-full">
            {label}
            <input
                type="text"
                className="grow"
                value={value || ""}
                name={name}
                onChange={handleChange}
                {...rest}
            />
        </label>
    );
}

export default Text;