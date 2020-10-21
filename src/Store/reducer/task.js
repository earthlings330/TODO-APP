import * as actionType  from '../action/actionType'


const IintialState = {
    tasks:{}
}


const reducer = (state = IintialState, action) =>{
    switch(action.type){
        case actionType.INIT_TASKS:
            return {
                ...state,
                tasks:action.tasks
            }
        default:
            return state
        
    }
}

export default reducer


