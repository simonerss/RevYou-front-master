import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataExtractionDetailsComponent from '../../components/apresentacao/dataExtractionDetailsComponent';
import { HTTP } from '../../services/config';

class DataExtractionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ExtractionStep: {},
            Field: [],
            dataStudy: {},
            extractor: {},
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const formid = this.props.match.params.refform;
        const studyid = this.props.match.params.refstudy;
        const extractorid = this.props.match.params.refresearcher;
        const templateformid = this.props.match.params.reftempform;

        HTTP.get(`form/data/extraction/${formid}`)
        .then(res => {
            let data = res.data;
            let ExtractionStep = res.data.TemplateForm.ExtractionStep;
            this.setState({ data, ExtractionStep });
        }).catch(erro => this.setState({ erro }));
        
        HTTP.get(`study/specificStudy/${studyid}`)
        .then(res => {
            let dataStudy = res.data;
            this.setState({ dataStudy });
        }).catch(erro => this.setState({ erro }));

        HTTP.get(`researcher/by/${extractorid}`)
        .then(res => {
            let extractor = res.data;
            this.setState({ extractor });
        }).catch(erro => this.setState({ erro }));

        HTTP.get(`form/fields/${templateformid}`).then(res => {
            let Field = res.data.map(Field => {
                return {
                    field_id: Field.field_id,
                    description: Field.description,
                    field_option: Field.field_option,
                    type: Field.type,
                    position: Field.position,
                    answer_id: Field.answer_id,
                    content: Field.content,
                    supportData: Field.supportData,
                    answer_option: Field.answer_option,
                    status: Field.status,
                };
            });
            this.setState({ Field });
        });
    }

    render() {
        return (
            <div>
                <DataExtractionDetailsComponent {...this.state} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    project: state.project
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DataExtractionDetails);
