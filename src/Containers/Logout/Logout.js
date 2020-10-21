import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionType from '../../Store/action/index'


const logout = React.memo(props=>{
useEffect(()=>{
    props.onLogout();
},[])


        return(
            <Redirect to="/Login"/>
        );
    })


const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=> dispatch(actionType.AuthLogOut())
    }
}
export default   connect(null,mapDispatchToProps) (logout)