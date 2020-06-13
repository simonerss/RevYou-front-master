import React, { Component } from 'react';
import ListProject from './listProject';
import InvitationalProject from './invitationalProjects'
// import ProjectInvitations from './projectInvitations'

class project extends Component {
  render() {
    return (
      <div>
        <ListProject/>
        <InvitationalProject/>
      </div>
    )
  }
}

export default project;