import React, {useEffect} from 'react';

const classAddOnMap = {
    "success": "bg-success",
    "warning": "bg-warning",
    "error": "bg-error",
}

function MessageProvider(props) {
    let message = localStorage.getItem("redirect-message");
    let messageType = localStorage.getItem("redirect-message-type");
    localStorage.removeItem("redirect-message");
    localStorage.removeItem("redirect-message-type");

    let classDetails = classAddOnMap[messageType] || "";
    return (
        <div>
            <div id="Message-Provider" className={`w-fit min-w-80 m-auto rounded-2xl text-center p-2 px-8 mt-2 ${classDetails}`}>
                <p className="m-auto">{message}</p>
            </div>
            {props.children}
        </div>
    );
}

export default MessageProvider;