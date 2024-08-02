import React, {useEffect} from 'react';

/**
 * @props:
 * label, altText, name, value,
 * min, max
 */
function RangeField(props) {
    const {form, label, name, ...rest} = props;
    if(!form || !name) return <p className="text-red-600"> Checkbox field missing props. </p>
    const min = props.min || 0
    const max = props.max || Math.max(100,min)
    const value = form.state[name] || props.min;

    const handleChange = (e) => {
        form.onChange({name: name, value: e.target.value})
    }

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
                min={min} max={max} value={value}
                {...rest}
            />
        </label>
    )
        ;
}

export default RangeField;