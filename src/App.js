
import React, { useCallback, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './Containers/Login/Login';
import * as actionType from './Store/action/index'
import Logout from './Containers/Logout/Logout'
import Tasks from './Containers/Tasks/Task1'
const app = React.memo(props=>{
  const isAuth = useSelector(state => state.auth.token !==null)
  const dispatch = useDispatch();
  const onTryLogin = useCallback(()=> dispatch(actionType.AuthCheckState()),[])
  useEffect(()=>{
    onTryLogin();
  },[onTryLogin])
  
    let ReRouter = (
      <Switch>
        <Route path='/Login' component={Login}/>
        <Redirect to='/Login'/>
      </Switch>
    )
    if(isAuth)
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



export default withRouter(app);



