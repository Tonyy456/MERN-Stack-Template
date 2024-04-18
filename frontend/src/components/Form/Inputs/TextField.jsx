import {useEffect} from 'react';

function TextField(props) {
    const {label, name, onChange, initialize, value} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: ""}),[])

    // Handle change and alert form.
    const handleChange = (e) => { onChange({
        name: name,
        value: e.target.value
    })}

    // Render input form.
    return (
        <label className="form-control flex flex-row items-center gap-2 min-w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <textarea
                className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                placeholder={label}
                value={value || ""}
                name={name}
                onChange={handleChange}
            >
            </textarea>
        </label>

)
    ;
}

export default TextField;