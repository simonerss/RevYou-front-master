import React from 'react';
import { HashRouter as Router} from "react-router-dom";
import {connect} from 'react-redux'
import Layouts from '../../menu/Layout';
import LoginRouter from '../../router/loginRouter';

const MainScreen = ({login}) => {
    let logar;
    if(login.email === undefined ){
        logar = false;
    }else{
        logar = true;
    }
    return(
        <Router>
            {!logar && <LoginRouter/>}
            {logar && <Layouts/>}
        </Router>
    )
}

const mapStateToProps = (state) => ({
    login: state.login
  })

export default connect(mapStateToProps)(MainScreen);