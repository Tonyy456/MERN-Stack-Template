import React, {useEffect} from 'react';

function CheckboxField(props) {
    const {form, name, label} = props;
    if(!form || !name) return <p className="text-red-600"> Checkbox field missing props. </p>
    const value = form.state[name] || false;

    // Handle change and alert form.
    const handleChange = (e) => {
        form.onChange({
            name: name,
            value: e.target.checked
        })
    }

    // Render input form.
    return (
        <div className="form-control m-0">
            <label className="label cursor-pointer justify-start w-min">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={value} />
                <span className="label-text ml-2 text-lg font-medium">{label}</span>
            </label>
        </div>
    );
}

export default CheckboxField;