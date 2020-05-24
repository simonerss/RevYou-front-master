import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';
import RegisterProjectComponent from '../../components/projectDefinition/registerProject';
import {HTTP} from '../../services/config';

const initialValues = {
  title: '',
  description: '',
  objective: ''
};

const infoTitle = 'Create';

class registerProject extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      valueSelect: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ valueSelect: value });
  }

  handleSubmit(values) {
    HTTP
      .post('project', {
        title: values.title,
        description: values.description,
        objective: values.objective,
        reviewType: this.state.valueSelect,
        CoordinatorId: this.props.login.id
      })
      .then(res => {
        message.success('your project was successfully registered');
        this.setState({
          redirect: true
        });
      })
      .catch(error => {
        if (error.status === 404) {
          message.error('Ops... Server error, please contact the administrator');
        } else {
          message.error('Ops... Server error, please contact the administrator');
        }
      });
  }

  render() {
    if (this.state.redirect === false) {
      return (
        <RegisterProjectComponent
          {...this.state}
          infoTitle={infoTitle}
          initialValues={initialValues}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      );
    } else {
      return <Redirect to="/home" />;
    }
  }
}

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(mapStateToProps)(registerProject);
