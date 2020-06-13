import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import InviteResearchers from '../../components/projectDefinition/inviteResearchers';
import {HTTP} from '../../services/config';

class inviteResearchers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  handleSubmit(e) {
    const email = e.target.value || document.getElementById('invite').value;
    const id = this.props.project.id;
    HTTP
      .post(`invitation`, {
        email,
        ProjectId: id
      })
      .then(res => {
        this.getData();
      })
      .catch(error => {});
  }

  handleDelete(value) {
    HTTP
      .delete(`invitation/${value}`)
      .then(res => {
        this.getData();
      })
      .catch(error => {
        message.error('Ops... Server error, please contact the administrator');
      });
  }

  getData() {
    HTTP
      .get(`project/inviteds/${this.props.project.id}`)
      .then(res => {
        let data = res.data.map(data => {
          return {
            email: data.email,
            situation: data.situation,
            key: data.id
          };
        });
        this.setState({ data });
      });
  }

  render() {
    return (
      <InviteResearchers
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps)(inviteResearchers);
