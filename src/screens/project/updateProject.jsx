import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import { connect } from 'react-redux';
import UpdateComponent from '../../components/projectDefinition/registerProject';
import {HTTP} from '../../services/config';

const infoTitle = 'Edit';

class UpdateProject extends PureComponent {
  constructor() {
    super();
    this.state = {
      redirect: false,
      valueSelect: undefined,
      initialValues: {
        title: '',
        description: '',
        objective: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleChange(value) {
    this.setState({ valueSelect: value });
    console.log(this.state.valueSelect);
  }

  handleSubmit(values) {
    const { title, description, objective } = values;
    HTTP
      .put(`project/`, {
        title,
        description,
        objective,
        CoordinatorId: this.props.login.id //mudar depois
      })
      .then(res => {
        message.success('your project was successfully update');
        this.setState({
          redirect: true
        });
      })
      .catch(error => {
        message.error('Ops... Server error, please contact the administrator');
      });
  }

  getData() {
    const id = this.props.project.id;
    HTTP.get(`project/${id}`).then(res => {
      this.setState({
        initialValues: {
          title: res.data.title,
          description: res.data.description,
          objective: res.data.objective,
        },
        valueSelect: res.data.reviewType
      });
    });
  }

  render() {
    if (this.state.redirect === false) {
      return (
        <UpdateComponent
          {...this.state}
          infoTitle={infoTitle}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      );
    } else {
      return <Redirect to="/user/listprojects" />;
    }
  }
}

const mapStateToProps = state => ({
  project: state.project,
  login: state.login
});

export default connect(mapStateToProps)(UpdateProject);
