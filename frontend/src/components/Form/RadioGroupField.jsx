import React, {useEffect} from 'react';

function RadioGroupField(props) {
    const {form, label, options, name, getOptionLabel = (e) => e, ...rest} = props;
    if(!form || !name || !options) return <p className="text-red-600"> Radio group field missing props. </p>

    // // Handle change and alert form.
    const handleChange = (e) => {
        form.onChange({
            name: name,
            value: e
        })
    }
    const value = form.state[name] || options[0];


    // Render input form.
    return (
        <div className="form-group m-0">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
            </div>
            <div className="flex">
                {options.map((option, index) => {
                    const checked = getOptionLabel(value) === getOptionLabel(option);
                    return (
                        <div key={index} className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-4">{getOptionLabel(option)}</span>
                                <input type="radio" onChange={(e) => handleChange(option)} name={name} value={name}
                                       className="radio radio-primary" checked={checked}/>
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RadioGroupField;