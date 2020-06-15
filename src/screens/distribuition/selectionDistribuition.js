import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectionDistribuitionComponent from '../../components/apresentacao/selectionDistribuitionComponent';
import { HTTP } from '../../services/config';

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
        const login = this.props.login;
        this.setState({login: login});

        const id = this.props.match.params;
        HTTP.get(`report/aboutproject/${id.refproject}`)
            .then(res => {
                let data = res.data;
                let coordinator = res.data.ProjectCoordinator;
                let researchers = res.data.Researchers;
                this.setState({ data, coordinator, researchers });
            }).catch(erro => this.setState({ erro }));
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
