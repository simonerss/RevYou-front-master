import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResearcherExtractionDistribuitionComponent from '../../components/apresentacao/researcherExtractionDistribuitionComponent';
import { HTTP } from '../../services/config';

class ResearcherExtractionDistribuition extends Component {

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
        const id = this.props.match.params;

        fetch(`http://localhost:5000/researcher/by/${id.refresearcher}`)
            .then(researcher => researcher.json().then(researcher =>
                this.setState({ researcher })))
            .catch(erro => this.setState({ erro }));

        HTTP.get(`form/distribution/${id.refproject}/${id.refresearcher}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.form_id,
                    type: data.type,
                    status: data.status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    TemplateFormId: data.TemplateFormId,
                    ResearcherId: data.ResearcherId,
                    study_id: data.ResearcherId,
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
        console.log(this.state);
        return (
            <div>
                <ResearcherExtractionDistribuitionComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherExtractionDistribuition);
