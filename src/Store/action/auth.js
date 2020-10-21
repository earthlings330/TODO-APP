import * as actionType  from './actionType'
import axios from 'axios'





export const AuthLogOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('exTime')
    localStorage.removeItem('userID')
   
    return{
        type:actionType.AUTH_LOG_OUT
    }
}
export const CheckAuthTimeOut = timeOut =>{
    return dispatch =>{
      setTimeout(()=>{
        dispatch(AuthLogOut())
      }
       ,timeOut*1000)
    }
}


export const authStart = ()=>{
    return{
        type:actionType.AUTH_START
    }
}


export const authSuccess = (authData,userID)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        token:authData,
        userID:userID
    }
}

export const authFail = (error) =>{
    return{
        type:actionType.AUTH_FAIL,
        error:error
    }
}

export const authInit = (email,password)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuM1CZNWpEYdiO4IpSFwziN8qeQdtF3GU'
        axios.post(url,authData)
        .then(res =>{
            const exTime = new Date(new Date().getTime() + (res.data.expiresIn * 1000))
            console.log(res.data)
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('exTime',exTime)
            localStorage.setItem('userID',res.data.localId)
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(CheckAuthTimeOut(res.data.expiresIn))
        }).catch(error=>{
            console.log(error)
            dispatch(authFail(error.response.data.error.message))
        })
    }
}

export const AuthCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token)
        dispatch(AuthLogOut())
        else
        {
            const exTime =new Date(localStorage.getItem('exTime'))
            if(exTime <= new Date())
            dispatch(AuthLogOut())
            else{
                const userID = localStorage.getItem('userID');
                dispatch(authSuccess(token,userID));
                dispatch(CheckAuthTimeOut((exTime.getTime()- new Date().getTime())/1000))
            }
             
        }
    }
}