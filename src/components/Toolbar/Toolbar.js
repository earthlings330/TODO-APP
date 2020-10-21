import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import classes from './Toolbar.css'


const toolbar = React.memo(props=>{

        return(
           <header className={classes.Toolbar}>
               <nav>
                   <ul className={classes.NavigationItems}>
                       <li className={classes.NavigationItem}>
                          {props.isAuth ?  <NavLink to='/logout' exact activeClassName={classes.active}>logout</NavLink>
                          :<NavLink to='/Login' exact activeClassName={classes.active}>Login</NavLink>}
                       </li>
                   </ul>
               </nav>
           </header>
        );

})

const mapStateToProps = state =>{
    return{
      isAuth : state.token !==null
    }
  }
export default connect(mapStateToProps) (toolbar)
