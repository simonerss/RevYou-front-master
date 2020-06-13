import React, { Component } from 'react';
import { Row, Radio, Tooltip, Icon, Skeleton, message } from 'antd';
import moment from 'moment';
import { stepStatus, formTypes, formStatus } from './../../util/constants';
import { connect } from 'react-redux';
import { editStep } from '../../services/StepService';
import { handleGetStep } from './../../actions/step';
import { receiveData, requestData } from './../../actions/loading';
import ReportTable from '../../components/extraction/ReportTable';
import { getStepReport } from './../../services/FormService';
import { withRouter } from 'react-router-dom';


class ExtractionControl extends Component {
  state = {
    extractionReport: []
  };

  componentDidMount() {
    const { step } = this.props;
    const type = step.status === stepStatus.ON_GOING ? formTypes.EXTRACTION : formTypes.FINAL;
    this.props.dispatch(requestData());
    getStepReport(step.id, type)
      .then(
        res => {
          this.setState({ extractionReport: res.data });
        },
        error => {
          message.warning(error.data);
        }
      )
      .finally(this.props.dispatch(receiveData()));
  }

  changeStepStatus = e => {
    let step = this.props.step;
    const status = e.target.value;
    step.status = status;
    this.props.dispatch(requestData());
    editStep(step.id, step)
      .then(
        res => {
          message.success(res.data);
        },
        error => {
          message.warning(error.data);
        }
      )
      .then(() => this.props.dispatch(handleGetStep(step.ProjectId)))
      .finally(this.props.dispatch(receiveData()));
  };

  checkFormConclusion = () => {
    let notConcluded = false;
    const { extractionReport } = this.state; 
    extractionReport.forEach(report =>{
      report.status.forEach(type => {
        if(type.status === formStatus.FILLED && type.count !== report.count){
          notConcluded = true;
        }
      })
    })
    return notConcluded;
  }

  render() {
    const { step, isLoading } = this.props;
    const { extractionReport } = this.state;
    const reportType = step.status === stepStatus.ON_GOING? "Extraction" : "Decision";  
    const dateStart = new Date(step.startDate).getTime();
    const dateExtractor = new Date(step.dateExtractor).getTime();
    const dateConflicts = new Date(step.dateConflicts).getTime();
    return isLoading ? (
      <Skeleton active size="large" paragraph rows="10" />
    ) : (
      <>
        <h2>Extraction Step Control</h2>
        <Row>
          <Radio.Group value={step.status} onChange={this.changeStepStatus}>
            <Radio.Button
              disabled={step.status !== stepStatus.SETTING}
              value={stepStatus.ON_GOING}
              style={{ backgroundColor: 'LimeGreen' }}
            >
              <Tooltip title={'Date: ' + moment(dateStart).format('LLLL')}>
                <Icon type="form" />
                &nbsp; Release Extraction
              </Tooltip>
            </Radio.Button>
            <Radio.Button
              value={stepStatus.SETTING_DECISORS}
              disabled={this.checkFormConclusion() || step.status !== stepStatus.ON_GOING}
            >
              <Tooltip title={'Date: ' + moment(dateExtractor).format('LLLL')}>
                <Icon type="file-done" />
                &nbsp; Finish Extraction
              </Tooltip>
            </Radio.Button>
            <Radio.Button
              value={stepStatus.SOLVING_CONFLICTS}
              style={{ backgroundColor: 'DodgerBlue', color: 'white' }}
              disabled={step.status !== stepStatus.SETTING_DECISORS}
            >
              <Icon type="solution" />
              &nbsp; Solve Conflicts
            </Radio.Button>
            <Radio.Button
              value={stepStatus.FINISHED}
              style={{ backgroundColor: 'red', color: 'white'}}
              disabled={
                this.checkFormConclusion() || step.status !== stepStatus.SOLVING_CONFLICTS
              }
              onClick={() => this.props.history.push("/extraction/step")}
            >
              <Tooltip title={'Date: ' + moment(dateConflicts).format('LLLL')}>
                <Icon type="issues-close" />
                &nbsp; Finish Step
              </Tooltip>
            </Radio.Button>
          </Radio.Group>
        </Row>
        {extractionReport.length > 0 && (step.status === stepStatus.ON_GOING || step.status === stepStatus.SOLVING_CONFLICTS) && (
          <Row>
            <h2>{reportType} Report</h2>
            <ReportTable reportData={extractionReport} />
          </Row>
        )}
      </>
    );
  }
}

export default connect(state => ({
  step: state.step,
  isLoading: state.loading
}))(withRouter(ExtractionControl));
