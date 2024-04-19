import {useEffect} from 'react';

function Checkbox(props) {
    const {name, onChange, value, initialize, label} = props;

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
            <label className="label cursor-pointer justify-start w-min">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={value || false} />
                <span className="label-text ml-2 text-lg font-medium">{label}</span>
            </label>
        </div>
    );
}

export default Checkbox;