import React from 'react';
import classes from './Button.css';


const button = (props)=>{
    let type = props.type;
    return(
    <button className={[classes.Button,classes[type]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
    >
        {props.children}</button>
    );
}


export default button