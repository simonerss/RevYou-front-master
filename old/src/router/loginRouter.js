import React from 'react';
import Login from '../screens/login/login';
import Singup from '../screens/singup/singup';
import {Route} from "react-router-dom";

const loginrouter = () => (
    <div>
        <Route exact path='/' component={Login}/>
        <Route path='/singup' component={Singup}/>
    </div>
);


export default loginrouter;