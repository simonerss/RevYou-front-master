import React, { Component } from 'react';
import { message } from 'antd';
import StandardQueryComponent from '../../components/protocol/standardQuery';
import {HTTP} from '../../services/config';

class StandardQuery extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      initialValues: {
        query: ''
      }
    };
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  handleSubmit(values) {
    const ProjectId = this.props.project.id;
    if(this.state.id === ''){
      HTTP.post('standardQuery', {
        query: values.query,
        ProjectId
      }).then(res =>{
        this.getData();
        message.success('Standard Query was successfully registered');
      }).catch(err =>{
        message.error('Ops... Server error, please contact the administrator');
      });
    }else{
      HTTP.put(`standardQuery/updateStandardQuery/${this.state.id}`,{
        query: values.query
      }).then(res =>{
        message.success('Standard Query was successfully updated');
      }).catch(err =>{
        message.error('Ops... Server error, please contact the administrator');
      });
    }
  }

  getData() {
    HTTP.get(`standardQuery/${this.props.project.id}`).then(res => {
      this.setState({
        initialValues: {
          query: res.data.query
        },
        id: res.data.id
      });
    });
  }

  render() {
    return <StandardQueryComponent {...this.state} handleSubmit={this.handleSubmit} />;
  }
}

export default StandardQuery;
