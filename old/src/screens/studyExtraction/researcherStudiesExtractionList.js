import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResearcherStudiesExtractionListComponent from '../../components/apresentacao/researcherStudiesExtractionListComponent';
import { HTTP } from '../../services/config';

class ResearcherStudiesExtractionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            researcher: {},
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const projectid = this.props.match.params.refproject;
        const researcherid = this.props.match.params.refresearcher;

        fetch(`http://localhost:5000/researcher/by/${researcherid}`)
            .then(researcher => researcher.json().then(researcher =>
                this.setState({ researcher })))
            .catch(erro => this.setState({ erro }));

        HTTP.get(`form/distribution/${projectid}/${researcherid}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.form_id,
                    type: data.type,
                    status: data.status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    TemplateFormId: data.TemplateFormId,
                    ResearcherId: data.ResearcherId,
                    study_id: data.study_id,
                    title: data.title,
                    authors: data.authors,
                    citekey: data.citekey,
                    abstract: data.abstract,
                    keywords: data.keywords,
                    venue: data.venue,
                    year: data.year,
                    pages: data.pages,
                    volume: data.volume,
                    url: data.url,
                    issn: data.issn,
                    doi: data.doi,
                    base: data.base,
                    search: data.search,
                    generalStatus: data.generalStatus,
                    venueType: data.venueType,
                    ProjectId: data.ProjectId,
                    SearchId: data.SearchId
                };
            });
            this.setState({ data });
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>                
                <ResearcherStudiesExtractionListComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherStudiesExtractionList);
