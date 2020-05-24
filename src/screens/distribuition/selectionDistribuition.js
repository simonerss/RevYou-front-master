import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectionDistribuitionComponent from '../../components/apresentacao/selectionDistribuitionComponent';
// import { HTTP } from '../../services/config';

class SelectionDistribuition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            coordinator: {},
            researchers: [],
            login: {},
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;
        const login = this.props.login;
        this.setState({login: login});

        fetch(`http://localhost:5000/report/aboutproject/${id.refproject}`)
            .then(data => data.json().then(data =>
                this.setState({
                    data: data,
                    coordinator: data.ProjectCoordinator,
                    researchers: data.Researchers
                })))
            .catch(erro => this.setState({ erro }));
    }
    
    render() {
        return (
            <div>
                <SelectionDistribuitionComponent {...this.state} />
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => ({
    login: state.login,
    project: state.project
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SelectionDistribuition);
