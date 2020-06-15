import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResearcherSelectionDistribuitionComponent from '../../components/apresentacao/researcherSelectionDistribuitionComponent';
import { HTTP } from '../../services/config';

class ResearcherSelectionDistribuition extends Component {

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

        HTTP.get(`researcher/by/${id.refresearcher}`)
            .then(res => {
                let researcher = res.data;
                this.setState({ researcher });
            }).catch(erro => this.setState({ erro }));

        HTTP.get(`studyAssigned/distribuition/${id.refproject}/${id.refresearcher}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.s_id,
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
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    ProjectId: data.ProjectId,
                    SearchId: data.SearchId,
                    assignDate: data.assignDate,
                    examinationDate: data.examinationDate,
                    status: data.status,
                    SelectionStepId: data.SelectionStepId,
                    StudyId: data.StudyId,
                    ResearcherId: data.ResearcherId,
                    name: data.name,
                    email: data.email
                };
            });
            this.setState({ data });
        });
    }

    render() {
        return (
            <div>
                <ResearcherSelectionDistribuitionComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherSelectionDistribuition);
