import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectInvitationsComponent from '../../components/apresentacao/projectInvitationsComponent';

class ProjectInvitations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inviteds: []
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;
        fetch(`http://localhost:5000/report/show/${id.refproject}`)
            .then(data => data.json().then(data =>
                this.setState({ data: data, inviteds: data.Inviteds })
            ))
            .catch(erro => this.setState({ erro }));
    }

    render() {
        return (
            <div>                
                <ProjectInvitationsComponent {...this.state} />
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => ({
    login: state.login,
    project: state.project
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInvitations);
