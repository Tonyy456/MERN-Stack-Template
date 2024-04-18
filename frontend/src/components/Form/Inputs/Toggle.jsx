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
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text mr-4">Remember me</span>
                <input
                    onChange={handleChange}
                    type="checkbox"
                    className="toggle"
                    checked={value || false} />
            </label>
        </div>
    );
}

export default Toggle;