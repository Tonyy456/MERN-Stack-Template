import React, {useEffect} from 'react';

function RadioGroup(props) {
    const {label, options, name, onChange, initialize, value} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => {
        if (options) initialize({name: name, value: options[0] || ""})
    },[options])

    // // Handle change and alert form.
    const handleChange = (e) => {
        onChange({
            name: name,
            value: e
        })
    }

    // Render input form.
    return (
        <div className="flex">
            {options.map((option, index) => {
                const checked = value === option;
                return (
                    <div key={index} className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4">{option}</span>
                            <input type="radio" onChange={(e) => handleChange(option)} name={name} value={name} className="radio checked:bg-blue-500" checked={checked}/>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioGroup;