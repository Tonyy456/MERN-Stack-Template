import React from 'react';

function FileDisplay(props) {
    const {src, ...rest} = props;
    const fileType = src.split('.').pop().toLowerCase();
    const validImageExtentions = ['jpg', 'png', 'jpeg', 'gif'];

    let element = null;
    if(fileType==="pdf") {
        element = <embed {...props}/>
    } else if (validImageExtentions.includes(fileType)) {
        element = <img {...props}/>
    } else {
        element = <p{...props}>{src}</p>
    }
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
}

export default FileDisplay;