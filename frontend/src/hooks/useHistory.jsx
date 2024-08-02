import React from 'react';
import {useNavigate} from "react-router-dom"


function useHistory(props) {
    const functionalHistory = useNavigate();
    const history = (path, data) => {
        // console.log(data.message)
        // localStorage.setItem("redirect-message", data.message);
        // const messageType = data.type || "success"
        // localStorage.setItem("redirect-message-type", messageType);
        // window.location.reload()
        functionalHistory(path)
    }
    return history;
}

export default useHistory;