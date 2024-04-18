import {useEffect, useRef} from 'react';
import trashIcon from '@/assets/x.svg'

function Files(props) {
    const {
        label, name, altText, onChange, initialize, value,
        ...rest} = props;
    const inputRef = useRef(null);

    // Called on first render to initialize useState in Form.
    useEffect(() => initialize({name: name, value: []}),[])

    // "control" input by setting it through javascript
    useEffect(() => {
        if (value && inputRef.current) {
            const dataTransfer = new DataTransfer();
            value.forEach(item => dataTransfer.items.add(item));
            inputRef.current.files = dataTransfer.files;
            //inputRef.current.focus();
        }
    }, [value]);

    // Handle change and alert form.
    const handleChange = (e) => {
        const newValue = [...value, ...e.target.files];
        if(onChange) onChange({name: name, value: newValue})
    }

    const handleDelete = (file) => {
        let newValue = value.slice();
        newValue.splice(newValue.indexOf(file), 1)
        if(onChange) onChange({name: name, value: newValue})
    }
    return (
        <div className="m-0">
            <span className="label-text text-lg font-medium">{label}</span>
            {value && Array.isArray(value) && <div className="">
                {value.map((item, index) => <FileCard onDelete={handleDelete} file={item} key={index}/>)}
            </div>}
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text-alt">{altText}</span>
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    name={name}
                    onChange={handleChange}
                    className="file-input file-input-primary file-input-bordered w-full max-w-xs"
                    {...rest}
                    multiple
                />
            </label>

        </div>

    );
}

function FileCard(props) {
    const {file, onDelete} = props;
    return (
        <div className="flex flex-row nowrap">
            <img
                onClick={() => onDelete(file)}
                className="w-4 h-4 hover:scale-110 duration-300 inline-block"
                src={trashIcon}/>
            <div className="flex justify-between gap-8 inline-block inline-flex ml-4">
                <span className="whitespace-nowrap text-ellipsis overflow-hidden max-w-52">{file.name}</span>
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">{GetFileSizeString(file.size)}</span>
            </div>
        </div>
    )
}

function GetFileSizeString(size) {
    if (size < 1000) return `${(size).toFixed(0)} B`
    else if (size < 1000000) return `${(size/1000).toFixed(0)} KB`
    else return `${(size/1000000).toFixed(0)} MB`
}

export default Files;