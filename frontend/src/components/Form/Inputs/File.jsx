import {useEffect, useRef} from 'react';

function File(props) {
    const {label, name, altText, onChange, initialize, value, ...rest} = props;
    const inputRef = useRef(null);

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: null}),[])

    // "control" input by setting it through javascript
    useEffect(() => {
        if (value && inputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(value);
            inputRef.current.files = dataTransfer.files;
            //inputRef.current.focus();
        }
    }, [value]);

    // Handle change and alert form.
    const handleChange = (e) => {
        const value = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null
        if(onChange) onChange({name: e.target.name, value: value})
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

export default File;