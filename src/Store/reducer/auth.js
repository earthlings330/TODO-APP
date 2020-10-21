import * as actionType  from '../action/actionType'


const initState = {
    token : null,
    userID : null,
    error:null,
    loading:false
}

const reducer = (state = initState, action) =>{
    switch (action.type) {
        case actionType.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                userID:action.userID,
                token:action.token,
                loading:false,
                error:null
            }
        case actionType.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionType.AUTH_LOG_OUT:
            return{
                ...state,
                token:null,
                userID:null
            }
    
        default:
            return state;
    }
}

export default reducer