import React, {useEffect} from 'react';

function SelectField(props) {
    // Proccess props
    const {form, name, label, options, getOptionLabel = (a)=>a, ...rest} = props;
    if(!form || !name) return <p className="text-red-600"> Select field missing props. </p>
    const value = getOptionLabel(form.state[name] || options[0]);

    const handleChange = (e) => {
        const match = options.find(x => getOptionLabel(x) === e.target.value)
        form.onChange({name: name, value: match})
    }

    // Render input form.
    return (
        <label className="form-control w-full max-w-xs m-0">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
            </div>
            <select onChange={handleChange} value={value} className="select select-bordered select-neutral bg-base-200 text-base-content">
                {options.map((option,index) => {
                    const label = getOptionLabel(option)
                    return (
                        <option key={index} value={label}>{label}</option>
                    )
                })}
            </select>
        </label>
    )
}

export default SelectField;