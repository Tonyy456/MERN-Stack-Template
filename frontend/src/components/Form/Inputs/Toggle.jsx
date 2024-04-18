import React, {useEffect} from 'react';

function Toggle(props) {
    const {label, name, onChange, value, initialize} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: false}),[])

    // Handle change and alert form.
    const handleChange = (e) => {
        onChange({
            name: name,
            value: e.target.checked
        })
    }

    // Render input form.
    return (
        <div className="form-control m-0">
            <label className="label cursor-pointer">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={value || false} />
                <span className="label-text ml-2 text-lg font-medium">Remember me</span>
            </label>
        </div>
    );
}

export default Toggle;