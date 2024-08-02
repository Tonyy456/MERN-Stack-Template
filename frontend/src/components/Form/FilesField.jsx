import {useEffect, useRef} from 'react';
import trashIcon from '@/assets/x.svg'

function FilesField(props) {
    // Process props
    const { form, name, label, altText, ...rest} = props;
    const value = ((!form || !name) ? null : form.state[name]) || [];

    // Hooks
    const inputRef = useRef(null);
    useEffect(() => { // "control" input by setting it through javascript
        if (value && inputRef.current) {
            const dataTransfer = new DataTransfer();
            value.forEach(item => dataTransfer.items.add(item));
            inputRef.current.files = dataTransfer.files;
        }
    }, [value]);

    // Check if component is used correctly.
    if(!form || !name) return <p className="text-red-600"> Files field missing props.</p>

    // Handle change and alert form.
    const handleChange = (e) => {
        const newValue = [...value, ...e.target.files];
        form.onChange({name: name, value: newValue})
    }
    const handleDelete = (file) => {
        let newValue = value.slice();
        newValue.splice(newValue.indexOf(file), 1)
        form.onChange({name: name, value: newValue})
    }

    return (
        <div>
            <div className="m-0 w-max flex flex-row gap-4 items-center">
                <span className="label-text text-lg font-medium">{label}</span>
                <label className="form-control w-full max-w-xs">
                    {/*<div className="label">*/}
                    {/*    <span className="label-text-alt">{altText}</span>*/}
                    {/*</div>*/}
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
            {value && Array.isArray(value) && <div className="">
                {value.map((item, index) => <FileCard onDelete={handleDelete} file={item} key={index}/>)}
            </div>}
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

export default FilesField;