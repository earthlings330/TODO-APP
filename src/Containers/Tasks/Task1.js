import React,{useCallback, useEffect, useMemo, useReducer, useState,useRef} from  'react'
import * as actionType from '../../Store/action/actionType'
import classes from './Tasks.css'
import Task from '../../components/Task/Task'
import firebase from '../../util/firebase'
import { connect } from 'react-redux'



const tasksReducer = (CurrentTasksState, action)=>{
    switch(action.type){
        case actionType.INIT_TASKS:
            return action.tasks
        default:
            return
    }
}



const tasks = React.memo ( props =>{
    const inputRef = useRef();
    const userID = useSelector(state => state.userID)
    const [TasksState , dispatchTasks] = useReducer(tasksReducer,{})
    const [InputValue , setInputValue] = useState({value:''})


    useEffect(()=>{
        console.log('[INIT TASKS ]')
        const toDoRef  = firebase.database().ref('Tasks').child(props.userID);
        toDoRef.on('value', (snapshot) => {
             const todos = snapshot.val();
             dispatchTasks({type:actionType.INIT_TASKS,tasks:{...todos} })
       })
    },[])


    const addTask = useCallback(()=>{
        console.log('[ADD TASK]')
        let newTask = {content:InputValue.value,status:false};
        const toDoRef  = firebase.database().ref('Tasks').child(props.userID);
            toDoRef.push(newTask)
            setInputValue({value:''})
    },[InputValue])
    
    const doneTask = useCallback( key =>{
        console.log('[DONE TASK]')
        const doneChild = firebase.database().ref("Tasks").child(props.userID).child(key);
        doneChild.update({
        status:!TasksState[key].status
    })
    },[TasksState])

    const deeleteTask = useCallback(key =>{
        console.log('[DELETE TASK]')
        const deleteChild = firebase.database().ref('Tasks').child(props.userID).child(key)
        deleteChild.remove();
    },[])

    const initTasks = useMemo(()=>{
        console.log('[MEMO TASK]')
        let tasksElem = []  
        let tasks = {...TasksState}
           for(let key of  Object.keys(tasks)){
               let task = tasks[key];
                let elm =  <Task 
                content={task.content}
                status={task.status} 
                done={() => doneTask(key)}
                delete={() => deeleteTask(key)} 
                key={key} />;
                tasksElem.push(elm);
           }
           return tasksElem
    },[TasksState])
return(
    <div>
        <div className={classes.InputForm}>
                <input className={classes.Input}
                ref={inputRef}
                 type="text" placeholder="Type your task ..." 
                 required="" 
                 value={InputValue.value}
                 onChange={event =>{
                     
                     setInputValue({value:event.target.value})
                 }}/> 
                <button onClick={addTask}>
                    <i className="fas fa-plus-square fa-2x" style={{color:'blue'}} />
                </button>
            </div>
            <div className={classes.Container}>
            {initTasks}
            </div>
    </div>

);
})

const mapStateToProps = state =>{
    return {
        userID:state.userID
    }
}
export default connect(mapStateToProps) (tasks)