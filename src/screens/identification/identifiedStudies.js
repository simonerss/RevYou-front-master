import React, { Component } from 'react';
import { connect } from 'react-redux';
import IdentifiedStudiesComponent from '../../components/apresentacao/identifiedStudiesComponent';
import { HTTP } from '../../services/config';

class IdentifiedStudies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataStudies: [],
            projectid: '',
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const projectid = this.props.match.params.refproject;
        HTTP.get(`study/identified/${projectid}`).then(res => {
            let dataStudies = res.data.map(dataStudies => {
                return {
                    key: dataStudies.id,
                    title: dataStudies.title,
                    authors: dataStudies.authors,
                    citekey: dataStudies.citekey,
                    abstract: dataStudies.abstract,
                    keywords: dataStudies.keywords,
                    venue: dataStudies.venue,
                    year: dataStudies.year,
                    pages: dataStudies.pages,
                    volume: dataStudies.volume,
                    url: dataStudies.url,
                    issn: dataStudies.issn,
                    doi: dataStudies.doi,
                    base: dataStudies.base,
                    search: dataStudies.search,
                    generalStatus: dataStudies.generalStatus,
                    venueType: dataStudies.venueType,
                    createdAt: dataStudies.createdAt,
                    updatedAt: dataStudies.updatedAt,
                    ProjectId: dataStudies.ProjectId,
                    SearchId: dataStudies.SearchId,
                };
            });
            this.setState({ dataStudies, projectid });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <IdentifiedStudiesComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(IdentifiedStudies);
