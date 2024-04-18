import {useEffect} from 'react';

function TextField(props) {
    const {label, name, onChange, initialize, value} = props;

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: ""}),[])

    // Handle change and alert form.
    const handleChange = (e) => { onChange({
        name: name,
        value: e.target.value
    })}

    // Render input form.
    return (
        <div className="form-control w-full m-0">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
            </div>
            <label className="form-control flex flex-row items-center gap-2 min-w-full">
                <textarea
                    className="textarea textarea-neutral bg-base-200 text-base-content textarea-bordered w-full max-w-full"
                    placeholder={label}
                    value={value || ""}
                    name={name}
                    onChange={handleChange}
                >
                </textarea>
            </label>
        </div>


    )
}

export default TextField;