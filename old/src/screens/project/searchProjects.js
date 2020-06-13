import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchProjectsComponent from '../../components/apresentacao/searchProjectsComponent';
import { HTTP } from '../../services/config';

class SearchProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        HTTP.get(`report/search/`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.id,
                    title: data.title,
                    objective: data.objective,
                    description: data.description,
                    reviewType: data.reviewType,
                    coordinatorName: data.coordinatorName,
                    coordinatorEmail: data.coordinatorEmail
                };
            });
            this.setState({ data });
        });
    }

    render() {
        return (
            <div>
                <SearchProjectsComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchProjects);
