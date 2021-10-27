import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

const AuthRouter = () => {
    return (
       <Switch>
           <Route  path="/auth/login" component={Login}/>
           <Route  path="/auth/register" component={ Register}/>
            <Redirect to="/auth/login"/>
      </Switch>
    )
}

export default AuthRouter
