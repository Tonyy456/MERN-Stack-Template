import React, {useEffect, useRef} from 'react';

function FileField(props) {
    const {form, label, name, altText, ...rest} = props;
    const inputRef = useRef(null);
    const value = (!form || !name) ? null : form.state[name];

    // "control" input by setting it through javascript
    useEffect(() => {
        if (value && inputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(value);
            inputRef.current.files = dataTransfer.files;
            //inputRef.current.focus();
        }
    }, [value]);

    if(!form || !name) return <p className="text-red-600"> File field missing props. </p>


    // Handle change and alert form.
    const handleChange = (e) => {
        const value = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null
        form.onChange({name: e.target.name, value: value})
    }

    return (
        <label className="form-control w-full max-w-xs m-0">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
                <span className="label-text-alt">{altText}</span>
            </div>
            <input
                type="file"
                ref={inputRef}
                name={name}
                onChange={handleChange}
                className="file-input file-input-primary file-input-bordered w-full max-w-xs"
                {...rest}
            />
        </label>
    );
}

export default FileField;