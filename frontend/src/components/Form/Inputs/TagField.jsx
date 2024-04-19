/**
 * @author: Anthony D'Alesandro
 */
import {useEffect, useState, useRef} from 'react';
import './TagField.css'

function TagField(props) {
    const {
        label, name, onChange, initialize, value,
        options, freeSolo, getOptionLabel = (a) => a,
        ...rest} = props;
    const [deleting, setDeleting] = useState([]);
    const [currentText, setCurrentText] = useState('');
    useEffect(() => initialize({name: name, value: []}),[])

    // Handle Dropdown open and closing.
    const [focused, setFocused] = useState(false);
    const inputBoxRef = useRef(null);
    const dropdownRef = useRef(null);
    const onMouseDownClock = (e) => {
        const inInput = inputBoxRef.current && inputBoxRef.current.contains(e.target);
        const inDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
        setFocused(inInput || inDropdown)
    };
    useEffect(() => {
        document.addEventListener("mousedown", onMouseDownClock);
        return () => {
            document.removeEventListener("mousedown", onMouseDownClock);
        };
    },[]);

    // Update current text state.
    const handleTextChange = (e) => {
        e.preventDefault()
        setCurrentText(e.target.value);

    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTag(currentText)
        }
    }
    const addTag = (tag) => {
        if(!value.includes(tag)) {
            const newValue = freeSolo ? value.slice() : [];
            newValue.push(tag);
            props.onChange({name: name, value: newValue});
            setCurrentText('')
            return true;
        }
        return false;
    }
    const removeTag = (tag) => {
        setTimeout(() => {
            const newValue = value.slice();
            newValue.splice(newValue.indexOf(tag), 1)
            setDeleting(prev => prev.filter(item => item !== tag))
            props.onChange({name: name, value: newValue})
        },300)
    }

    // Render input form.
    if(!value) return <></>
    return (
        <div className="form-control m-0 w-full">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
                <span className="text-sm font-medium">click items to remove them from list</span>
            </div>
            <div className="relative h-fit">
                <label

                    className={`input input-bordered flex flex-row flex-wrap h-fit
                    items-center gap-2 bg-base-200 text-base-content min-w-full pt-2 pb-2
                    `}
                >
                    <div id="current-tags" className="flex flex-wrap h-fit flex-row gap-1">
                        {value.map((option, index) =>{
                                return (<span
                                    onClick={() => {
                                        removeTag(option)
                                        setDeleting(prev => ([...prev, option]))
                                    }}
                                    data-removing={deleting.includes(option)}
                                    className={`
                                    duration-300
                                    data-[removing=true]:scale-0
                                    hover:bg-primary hover:text-primary-content p-1 pl-2 pr-2 bg-neutral rounded-md text-neutral-content text-nowrap text-ellipsis`}
                                    key={index}
                                >
                            {getOptionLabel(option)}
                        </span>
                        )})}
                    </div>
                    <input
                        ref={inputBoxRef}
                        type={"text"}
                        className="grow w-fit h-full"
                        onKeyDown={handleKeyDown}
                        value={currentText}
                        name={name}
                        onChange={handleTextChange}
                        autoComplete="off"
                        {...rest}
                    />
                </label>
                <TagFieldDropdownMenu
                    refToUse={dropdownRef}
                    getOptionLabel={getOptionLabel}
                    addTag={addTag}
                    className={`${(focused) ? 'absolute' : 'hidden'} -bottom-2 z-50 w-full translate-y-full bg-neutral text-neutral-content p-2 rounded-md`}
                    values={options
                        .filter(item => getOptionLabel(item).toUpperCase().indexOf(currentText.toUpperCase()) >= 0)
                        .filter(item => !value.includes(item))
                    }
                />
            </div>
        </div>
    );
}

function TagFieldDropdownMenu(props) {
    const { values, refToUse, addTag, getOptionLabel, setFocused, ...rest } = props;
    return (
        <div ref={refToUse} {...rest}>
            <div className="flex flex-col gap-2">
                {values.map((item, index) => {
                    return(
                        <span
                            className="hover:bg-info hover:text-info-content p-1 rounded-sm"
                            key={index} onClick={() => addTag(item)}
                        >
                            {getOptionLabel(item)}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default TagField;