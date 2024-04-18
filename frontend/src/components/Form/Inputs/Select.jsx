import React, {useEffect} from 'react';

function Select(props) {
    const {label, options, name, onChange, initialize, value} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => {
        if (options) initialize({name: name, value: options[0] || ""})
    },[options])

    // // Handle change and alert form.
    const handleChange = (e) => {
        onChange({
            name: name,
            value: e.target.value
        })
    }

    // Render input form.
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select onChange={handleChange} value={value || ""} className="select select-bordered">
                {options.map((option) =>
                    <option key={option}>{option}</option>
                )}
            </select>
        </label>
    )
}

export default Select;