import React, {useState, useEffect} from 'react';

function Form(props) {
    const [formData, setFormData] = useState({});

    /** Handle filling in defaults. */
    useEffect(() => {
        if(props.defaultValue) setFormData(prev => {
            return {
                ...prev,
                ...props.defaultValue
            }
        })
    }, [props.defaultValue])

    /** Handle children components */
    const onChildChange = (e) => {
        setFormData(prev => {return {...prev, [e.name]: e.value}});
    }
    const onChildInit = (e) => {
        setFormData(prev => {return {[e.name]: e.value, ...prev}});
    }
    const childAddOnProps = {onChange: onChildChange, initialize: onChildInit};
    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            if(child.type.name === 'Block'){
                return React.cloneElement(child,
                    {formData: formData, childAddOnProps: childAddOnProps}
                );
            } else {
                return React.cloneElement(child,
                    {value: formData[child.props.name], ...childAddOnProps}
                );
            }
        }
        return child;
    });

    /** Form Helper Methods */
    const onSubmit = (e) => {
        e.preventDefault();
        if (props.onSubmit) props.onSubmit(e, formData);
    }

    /** Render Component */
    return (
        <form onSubmit={onSubmit} className="m-0 flex gap-3 flex-col items-start min-w-full flex-grow">
            {childrenWithProps}
            <input className='btn btn-primary' type="submit" value={props.actionName || "Submit"} />
        </form>
    );
}

export default Form;