
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './Containers/Login/Login';
import * as actionType from './Store/action/index'
import Logout from './Containers/Logout/Logout'
import Tasks from './Containers/Tasks/Task1'
const app = React.memo(props=>{
 
  useEffect(()=>{
    props.onTryLogin();
  },[])
  
    let ReRouter = (
      <Switch>
        <Route path='/Login' component={Login}/>
        <Redirect to='/Login'/>
      </Switch>
    )
    if(props.isAuth)
    ReRouter = (
      <React.Fragment>
      <Route path="/logout" component={Logout}/>
      <Route path="/" exact  component={Tasks}/>
      <Redirect to="/" />
      </React.Fragment>
    )
    
    return (
      <div>
     <Layout>
       {ReRouter}
     </Layout>
     </div>
    );
  }
);

const mapStateToProps = state =>{
  return{
    isAuth : state.token !==null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryLogin : () => dispatch(actionType.AuthCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (app));



