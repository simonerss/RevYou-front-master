import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudySelectionResultReportComponent from '../../components/apresentacao/studySelectionResultReportComponent';
import { HTTP } from '../../services/config';

class StudySelectionResultReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSelStep: {},
            dataStudy: {},
            dataStudyResult: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const idStudy = this.props.match.params.refstudy;
        const idSelStep = this.props.match.params.refselstep;
        const idReseacher = this.props.match.params.refresearcher;

        fetch(`http://localhost:5000/study/specificStudy/${idStudy}`)
            .then(dataStudy => dataStudy.json().then(dataStudy =>
                this.setState({ dataStudy })))
            .catch(erro => this.setState({ erro }));

        fetch(`http://localhost:5000/selection/step/studySpecificSelectionStep/${idSelStep}/${idReseacher}`)
            .then(dataSelStep => dataSelStep.json().then(dataSelStep =>
                this.setState({ dataSelStep })))
            .catch(erro => this.setState({ erro }));

        HTTP.get(`selection/step/result/${idStudy}/${idSelStep}`).then(res => {
            let dataStudyResult = res.data.map(dataStudyResult => {
                return {
                    key: dataStudyResult.sr_id,
                    restultStatus: dataStudyResult.sr_status,
                    resultCreated: dataStudyResult.sr_createdat,
                    resultUpdated: dataStudyResult.sr_updatedat,
                    selectionStepId: dataStudyResult.SelectionStepId,
                    criteriaDescription: dataStudyResult.sc_desription,
                    criteriaType: dataStudyResult.sc_type                };
            });
            this.setState({ dataStudyResult });
            
        });

    }

    render() {
        return (
            <div>
                <h3>Study Selection Result Report</h3><hr />
                <StudySelectionResultReportComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudySelectionResultReport);
