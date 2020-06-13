import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudyDetailsComponent from '../../components/apresentacao/studyDetailsComponent';
import { HTTP } from '../../services/config';

class StudyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            datasel: [],
            dataext: [],
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
        const studyid = this.props.match.params.refstudy;
        const projectid = this.props.match.params.refproject;

        fetch(`http://localhost:5000/study/identified/details/${studyid}`)
        .then(data => data.json().then(data =>
            this.setState({ data: data })))
        .catch(erro => this.setState({ erro }));

        HTTP.get(`selection/step/studySelectionData/${studyid}`).then(res => {
            let datasel = res.data.map(datasel => {
                return {
                    key: datasel.ss_id,
                    ss_id: datasel.ss_id,
                    dateChecker: this.americanDate(datasel.dateChecker),
                    dateConflicts: this.americanDate(datasel.dateConflicts),
                    method: datasel.method,
                    ss_status: datasel.ss_status,
                    ratedContent: datasel.ratedContent,
                    numCheckerStudy: datasel.numCheckerStudy,
                    scoreBoard: datasel.scoreBoard,
                    ss_createdat: this.americanDate(datasel.ss_createdat),
                    ss_updatedat: this.americanDate(datasel.ss_updatedat),
                    sa_id: datasel.sa_id,
                    assignDate: this.americanDate(datasel.assignDate),
                    examinationDate: this.americanDate(datasel.examinationDate),
                    sa_status: datasel.sa_status,
                    sa_createdat: this.americanDate(datasel.sa_createdat),
                    sa_updatedat: this.americanDate(datasel.sa_updatedat),
                    r_id: datasel.r_id,
                    name: datasel.name,
                    email: datasel.email,
                    r_createdat: this.americanDate(datasel.r_createdat),
                    r_updatedat: this.americanDate(datasel.r_updatedat)
                };
            });
            this.setState({ datasel });
        });

        HTTP.get(`extraction/step/list/${projectid}`).then(res => {
            let dataext = res.data.map(dataext => {
                return {
                    key: dataext.id,
                    startDate: this.americanDate(dataext.startDate),
                    endDate: this.americanDate(dataext.endDate),
                    dateExtractor: this.americanDate(dataext.dateExtractor),
                    dateConflicts: this.americanDate(dataext.dateConflicts)    ,
                    method: dataext.method,
                    status: dataext.status,
                    numExtractorStudy: dataext.numExtractorStudy,
                    scoreBoard: dataext.scoreBoard,
                }
            });
            this.setState({ dataext });            
        });        
    }

    render() {
        console.log(this.state.datasel);
        return (
            <div>
                <StudyDetailsComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudyDetails);
