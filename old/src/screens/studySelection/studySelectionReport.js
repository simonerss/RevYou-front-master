import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudySelectionReportComponent from '../../components/apresentacao/studySelectionReportComponent';
import { HTTP } from '../../services/config';

class StudySelectionReport extends Component {

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

    americanDate(newdate) {
        const date = new Date(newdate);
        let day = date.getDate();
        let mes = date.getMonth();
        const year = date.getFullYear();
        mes = ("00" + (mes + 1)).slice(-2);
        day = ("00" + (day + 1)).slice(-2);
        return year + "/" + mes + "/" + day;
    }

    getData() {
        const id = this.props.match.params;

        fetch(`http://localhost:5000/study/specificStudy/${id.refstudy}`)
            .then(dataStudy => dataStudy.json().then( dataStudy =>
                this.setState({ dataStudy })))
            .catch(erro => this.setState({ erro }));

        HTTP.get(`selection/step/studySelectionData/${id.refstudy}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.ss_id,
                    ss_id: data.ss_id,
                    dateChecker: this.americanDate(data.dateChecker),
                    dateConflicts: this.americanDate(data.dateConflicts),
                    method: data.method,
                    ss_status: data.ss_status,
                    ratedContent: data.ratedContent,
                    numCheckerStudy: data.numCheckerStudy,
                    scoreBoard: data.scoreBoard,
                    ss_createdat: this.americanDate(data.ss_createdat),
                    ss_updatedat: this.americanDate(data.ss_updatedat),
                    sa_id: data.sa_id,
                    assignDate: this.americanDate(data.assignDate),
                    examinationDate: this.americanDate(data.examinationDate),
                    sa_status: data.sa_status,
                    sa_createdat: this.americanDate(data.sa_createdat),
                    sa_updatedat: this.americanDate(data.sa_updatedat),
                    r_id: data.r_id,
                    name: data.name,
                    email: data.email,
                    r_createdat: this.americanDate(data.r_createdat),
                    r_updatedat: this.americanDate(data.r_updatedat)
                };
            });
            this.setState({ data });
        });
    }

    render() {
        return (
            <div>
                <h3>Study Selection Report</h3><hr />
                <StudySelectionReportComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudySelectionReport);
