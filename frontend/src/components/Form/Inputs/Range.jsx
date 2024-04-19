import React, {useEffect} from 'react';

/**
 * @props:
 * label, altText, name, value,
 * min, max
 */
function Range(props) {
    const {label, name, onChange, initialize, value, ...rest} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: props.min || 0}),[])


    // Handle change and alert form.
    const handleChange = (e) => {
        if(onChange) onChange({name: name, value: e.target.value})
    }

    const currentValue = value || props.min || 0;
    return (
        <label className="form-control w-screen max-w-96 m-0">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
                <span className="label-text-alt text-primary text-lg font-medium">{value}</span>
            </div>
            <input
                name={name}
                onChange={handleChange}
                type="range"
                className="range range-primary"
                min={0} max="100" value={currentValue}
                {...rest}
            />
        </label>
    )
        ;
}

export default Range;