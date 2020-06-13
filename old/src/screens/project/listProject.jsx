import React, { Component } from 'react';
import {connect} from 'react-redux';
import { message } from 'antd';
import ProjectComponent from '../../components/projectDefinition/listProjects';
import {editProject} from '../../reducers/project/actions';
import {HTTP} from '../../services/config';

class Project extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.getData = this.getData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    this.getData();
  };

  handleEdit(value){
    this.props.onEditProject(value);
  };

  handleDelete(value) {
    const id = value;
    HTTP
      .delete(`project/${id}`)
      .then(res => {
        this.getData();
      })
      .catch(error => {
        message.error('Ops... Server error, please contact the administrator');
      });
  }

  getData() {
    const email = this.props.login.email;
    if(email){
      HTTP.get(`researcher/my-projects/${email}`).then(res => {
        console.log(res)
        let data = res.data.map(data => {
          return {            
            key: data.id,
            name: data.title,
            coordinator: data.ProjectCoordinator.name,
            reviewType : data.reviewType,
          };
        });
        this.setState({ data });
      });
    }
  }

  render() {
    return <ProjectComponent {...this.state} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />;
  }
}

//redux
const mapStateToProps = (state) => ({
  login: state.login,
  project: state.project
})

const mapDispatchToProps = (dispatch) => ({
  onEditProject: (id) => dispatch(editProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);
