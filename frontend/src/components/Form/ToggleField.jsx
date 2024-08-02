import React, {useEffect} from 'react';

function ToggleField(props) {
    const {form, label, name} = props;
    if(!form || !name) return <p className="text-red-600"> Toggle field missing props. </p>
    const value = form.state[name]
    const handleChange = (e) => {
        form.onChange({name: name, value: e.target.checked})
    }
    return (
        <div className="form-control m-0">
            <label className="label cursor-pointer justify-start w-min">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={value || false} />
                <span className="label-text ml-2 text-lg font-medium">{label}</span>
            </label>
        </div>
    );
}

export default ToggleField;