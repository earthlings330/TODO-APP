
import React from 'react'
import classes from './Task.css'


const task= React.memo(props =>{


        const CheckIconClasses = ["far","fa-check-circle","fa-2x"]
        const onDeleteClasses = ["fas","fa-trash","fa-2x",classes.Delete]
        const TaskClasses = [classes.Task]
        const paragClasses = []
        if(props.status){
            CheckIconClasses.push(classes.success)
            TaskClasses.push(classes.TaskSuccess)
            paragClasses.push(classes.deleteParag)
        }
 

        return(
        <div className={TaskClasses.join(' ')}>
            <button onClick={props.done} className={classes.Done}> <i className={CheckIconClasses.join(' ')}></i> </button>
            <p className={paragClasses.join(' ')}>
              {props.content}
            </p>
            <button className={classes.Delete} onClick={props.delete}> <i className={onDeleteClasses.join(' ')}></i> </button>
        </div>)
    })



export default task