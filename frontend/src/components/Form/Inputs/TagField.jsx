import {useEffect, useState, useRef} from 'react';
import './TagField.css'
function TagField(props) {
    const {label, name, onChange, initialize, value, options, ...rest} = props;
    const [currentText, setCurrentText] = useState('');

    // Handle Dropdown open and closing.
    const [focused, setFocused] = useState([false, false]);
    // const [item1Focused, setItem1Focused] = useState(false);
    // const [item2Focused, setItem2Focused] = useState(false);
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

    const handleTextChange = (e) => {
        setCurrentText(e.target.value);
    }
    useEffect(() => initialize({name: name, value: ""}),[])

    // Render input form.
    const dataListID = `${name}-datalist`
    return (
        <div className="form-control m-0 w-full">
            <div className="label">
                <span className="label-text text-lg font-medium">{label}</span>
            </div>
            <div className="relative">
                <label
                    ref={inputBoxRef}
                    className="input input-bordered flex flex-column items-center gap-2 bg-base-200 text-base-content min-w-full">
                    <input
                        type={"text"}
                        list={dataListID}
                        className="grow"
                        value={currentText}
                        name={name}
                        onChange={handleTextChange}
                        {...rest}
                    />
                </label>
                <TagFieldDropdownMenu
                    refToUse={dropdownRef}
                    className={`${(focused) ? 'absolute' : 'hidden'} -bottom-2 w-full translate-y-full bg-neutral text-neutral-content p-2 rounded-md`}
                    values={options.filter(item => item.toUpperCase().indexOf(currentText.toUpperCase()) >= 0)}
                />
            </div>
        </div>
    );
}

function TagFieldDropdownMenu(props) {
    const { values, refToUse, setFocused, ...rest } = props;
    return (
        <div ref={refToUse} {...rest}>
            <div className="flex flex-col gap-2">
                {values.map((item, index) => {
                    return(
                        <span
                            className="hover:bg-info hover:text-info-content p-1 rounded-sm"
                            key={index} onClick={() => console.log(item)}
                        >
                            {item}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default TagField;