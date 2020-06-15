import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectInvitationsComponent from '../../components/apresentacao/projectInvitationsComponent';
import {HTTP} from '../../services/config';

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

        HTTP.get(`report/show/${id.refproject}`)
            .then(res => {
                let data = res.data;
                let inviteds = res.data.Inviteds;
                this.setState({ data, inviteds });
            }).catch(erro => this.setState({ erro }));
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
