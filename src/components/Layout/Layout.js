import React from 'react'
import Toolbar from '../Toolbar/Toolbar';
import classes from './Layout.css'

const layout = React.memo(props=>{

        return(
            <React.Fragment>
            <Toolbar />
            <h1>asdasd</h1>
            <main className={classes.Content}>
                {props.children}
            </main>
            </React.Fragment>
        );

})

export default layout