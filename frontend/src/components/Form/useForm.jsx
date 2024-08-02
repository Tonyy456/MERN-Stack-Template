import React, {useState} from 'react';

function useForm(input = {}) {
    // TODO: check if input is a valid object
    const [state, setState] = useState(input)
    const onChange = (v) => {
        const name = v.name;
        const value = v.value;
        setState((prev) => {
            return ({...prev, [name]: value})
        })
    }
    return {
        state,
        setState,
        onChange
    };
}

export default useForm;