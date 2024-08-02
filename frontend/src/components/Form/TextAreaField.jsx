import React from 'react';

function TextAreaField(props) {
    const {form, label, name} = props;
    if(!form || !name) return <p className="text-red-600"> Text Area field missing props. </p>
    const value = form.state[name];

    const handleChange = (e) => {
        form.onChange({name: name, value: e.target.value})
    }

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

export default TextAreaField;