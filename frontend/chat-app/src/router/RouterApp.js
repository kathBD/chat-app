import React, {useContext, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import Chat from '../pages/Chat/Chat'
import AuthRouter from './AuthRouter'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const RouterApp = () => {

    const { auth, renewToken } = useContext( AuthContext );

    useEffect( () => {
        renewToken();
    },[renewToken])


    if ( auth.checking ) {
        return <h1>Espere por favor</h1>
    }

  
    return (
       
        <Router>
            <div>
            <Switch>
            <PublicRoute isAuthenticated={ auth.logged } path="/auth" component={ AuthRouter } />
             <PrivateRoute isAuthenticated={ auth.logged } exact path="/" component={ Chat } />
             <Redirect to="/" />
            </Switch>
            </div>
            
        </Router>
    )
}

export default RouterApp
