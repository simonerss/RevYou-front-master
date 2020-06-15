import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExtractionStepListComponent from '../../components/apresentacao/extractionStepListComponent';
import { HTTP } from '../../services/config';

class ExtractionStepsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            projectid: '',
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    americanDate(newdate){
        const date = new Date(newdate);
        let day = date.getDate();
        let mes = date.getMonth();
        const year = date.getFullYear();
        mes = ("00" + (mes + 1)).slice(-2);
        day = ("00" + (day + 1)).slice(-2);
        return year +"/"+ mes +"/"+ day;
    }

    getData() {
        const projectid = this.props.match.params.refproject;
        HTTP.get(`extraction/step/list/${projectid}`).then(res => {
            let data = res.data.map(data => {
                return {
                    key: data.id,
                    startDate: this.americanDate(data.startDate),
                    endDate: this.americanDate(data.endDate),
                    dateExtractor: this.americanDate(data.dateExtractor),
                    dateConflicts: this.americanDate(data.dateConflicts)    ,
                    method: data.method,
                    status: data.status,
                    numExtractorStudy: data.numExtractorStudy,
                    scoreBoard: data.scoreBoard,
                }
            });
            this.setState({ data, projectid });            
        });

    }

    render() {
        return (
            <div>
                <ExtractionStepListComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtractionStepsList);
