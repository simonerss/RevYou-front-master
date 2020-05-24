import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchEngineDistribuitionComponent from '../../components/apresentacao/searchEngineDistribuitionComponent';
import { HTTP } from '../../services/config';

class SearchEngineDistribuition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;

        HTTP.get(`projectResearcherSearchEngine/${id.refproject}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.id,
                    researcher: data.Researcher.name,
                    searchengine: data.SearchEngine.name
                };
            });
            this.setState({ data });
        });
    }

    render() {
        return (
            <div>
                <SearchEngineDistribuitionComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngineDistribuition);
