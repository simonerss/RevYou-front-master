import React, {Component} from 'react';
import SingupComponent from '../../components/projectDefinition/singupComponent';
import {Redirect } from 'react-router-dom'
import {message} from 'antd'
import {HTTP} from '../../services/config';

const initialValues = {
    email: '',
    password: '',
    passwordVerification: '',
    name: ''
}

class Singup extends Component {

    constructor(){
        super();
        this.state = {
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleSubmit (values) {
        HTTP.post(`researcher`, {
            name: values.name,
            email: values.email,
            password: values.password
        }).then(res => {
                message.success('You have successfully registered');
                this.setState({
                    redirect: true
                })
            }
        ).catch(error => {
            if(error.request.status === 401){
                message.error('Ops... This e-mail is already registered');
            }else{
                message.error('Ops... Server error, please contact the administrator');
            }
        })
    }

    render(){
        if(this.state.redirect === false){
            return( <SingupComponent initialValues={initialValues} handleSubmit={this.handleSubmit}/>)
        }else{
            return( <Redirect to="/" /> )
        } 
    }
}

export default Singup;