import React from 'react';

function Block(props) {
    const {formData, childAddOnProps, vertical, fitW, fitH} = props;
    const children = React.Children.map(props.children, (child) => {
        if(React.isValidElement(child)) {
            if(child.type.name === 'Block') {
                return React.cloneElement(child,
                    {formData, childAddOnProps: childAddOnProps}
                );
            } else {
                return React.cloneElement(child,
                    {value: formData[child.props.name], ...childAddOnProps}
                );
            }
        }
    })
    let style = (vertical ?
        "md:flex flex-col justify-evenly gap-4"  :
        "md:flex flex-row justify-evenly gap-4");
    style += (fitW ? " w-fit" : " w-full");
    style += (fitH ? " h-fit" : " ");

    return (
        <div className={style}>
            {children}
        </div>
    );
}

export default Block;