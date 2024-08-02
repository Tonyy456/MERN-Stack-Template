import React from 'react';

function Submit(props) {
    return (
        <input className='btn btn-primary' type="submit" value={props.name || "Submit"}/>
    );
}

export default Submit;