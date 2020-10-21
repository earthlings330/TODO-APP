import React from 'react'
import classes from './Input.css'

const input = (props)=>{

    let InputElement  = null
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

   
    switch(props.elementtype){
        case 'input':
            InputElement = <input    className={inputClasses.join(' ')}   onChange={props.changed} {...props.elementConfig} value={props.value} required=''/>
            break;
        case 'textarea':
            InputElement = <textarea    className={inputClasses.join(' ')}  onChange={props.changed} {...props.elementConfig} value={props.value} required=''/>
            break;
       case 'select':
           InputElement = <select    className={inputClasses.join(' ')}  onChange={props.changed} value={props.value}>
               {props.elementConfig.options.map(option=>{
                   return <option key={option.value} value={option.value}>{option.displayValue}</option>
               })}
           </select>
           break;
        default:
            InputElement= <input     className={inputClasses.join(' ')}  onChange={props.changed}  {...props.elementConfig} value={props.value} required=''/>
            break;

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {InputElement}
        </div>
    );
}


export default input