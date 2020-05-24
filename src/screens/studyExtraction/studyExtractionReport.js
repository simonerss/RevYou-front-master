import React, { Component } from 'react';
import { connect } from 'react-redux';
// import StudySelectionReportComponent from '../../components/apresentacao/studySelectionReportComponent';
import { HTTP } from '../../services/config';

class studyExtractionReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataStudy: {},
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        const id = this.props.match.params;

        fetch(`http://localhost:5000/study/specificStudy/${id.refstudy}`)
            .then(dataStudy => dataStudy.json().then( dataStudy =>
                this.setState({ dataStudy })))
            .catch(erro => this.setState({ erro }));

        // Busca Dados da ExtractionStep
        HTTP.get(`selection/step/studySelectionData/${id.refstudy}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.ss_id,
                    ss_id: data.ss_id,
                    dateChecker: data.dateChecker,
                    dateConflicts: data.dateConflicts,
                    method: data.method,
                    ss_status: data.ss_status,
                    ratedContent: data.ratedContent,
                    numCheckerStudy: data.numCheckerStudy,
                    scoreBoard: data.scoreBoard,
                    ss_createdat: data.ss_createdat,
                    ss_updatedat: data.ss_updatedat,
                    sa_id: data.sa_id,
                    assignDate: data.assignDate,
                    examinationDate: data.examinationDate,
                    sa_status: data.sa_status,
                    sa_createdat: data.sa_createdat,
                    sa_updatedat: data.sa_updatedat,
                    r_id: data.r_id,
                    name: data.name,
                    email: data.email,
                    r_createdat: data.r_createdat,
                    r_updatedat: data.r_updatedat
                };
            });
            this.setState({ data });
        });
    }

    render() {
        return (
            <div>
                <h3>Study Extraction Report</h3><hr />
                {/* <StudySelectionReportComponent {...this.state} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(studyExtractionReport);
