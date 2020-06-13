import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudiesInExtractionConflictComponent from '../../components/apresentacao/studiesInExtractionConflictComponent';
import { HTTP } from '../../services/config';

class StudiesInSelectionConflict extends Component {

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
        const id = this.props.match.params;
        HTTP.get(`study/studiesInExtractionConflict/${id.refproject}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.id, 
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
                    form_id: data.form_id,
                    type: data.type,
                    form_status: data.form_status,
                    form_createdat: data.form_createdat,
                    form_updatedat: data.form_updatedat,
                    TemplateFormId: data.TemplateFormId,
                    StudyId: data.StudyId,
                    ResearcherId: data.ResearcherId,
                    answer_id: data.answer_id,
                    content: data.content,
                    supportData: data.supportData,
                    option: data.option,
                    answer_status: data.answer_status,
                    answer_createdat: data.answer_createdat,
                    answer_updatedat: data.answer_updatedat,
                    FormId: data.FormId,
                    FieldId: data.FieldId
                };
            });
            this.setState({ data });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Studies In Extraction Conflict</h3><hr />
                <StudiesInExtractionConflictComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudiesInSelectionConflict);
