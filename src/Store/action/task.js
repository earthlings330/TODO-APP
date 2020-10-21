import * as actionType  from './actionType'



export const taskInit = (todo)=>{
    return{
        type:actionType.INIT_TASKS,
        tasks:{...todo}
    }
}