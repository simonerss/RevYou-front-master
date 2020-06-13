import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Skeleton, Row, Col } from 'antd';
import moment from 'moment';
import { handleGetProject } from './../../actions/project';
import { handleGetResearcher } from './../../actions/researcher';
import { handleGetStep } from './../../actions/step';

const userEmail = 'deboramcn@dcomp.ufs.br';
// igorvc@dcomp.ufs.br
// edmo.santos@dcomp.ufs.br
// simonerss@dcomp.ufs.br
// antoniobjn@dcomp.ufs.br
// deboramcn@dcomp.ufs.br
// gilton@dcomp.ufs.br

class ExtractionHeader extends Component {
  componentDidMount() {
    this.props
      .dispatch(handleGetResearcher(userEmail))
      .then(() => this.props.dispatch(handleGetProject(this.props.researcher.id)))
      .then(() => this.props.dispatch(handleGetStep(this.props.project.id)));
  }

  render() {
    const { researcher, project, step, isLoading } = this.props;
    return isLoading ? (
      <Skeleton active />
    ) : (
      <Row justify="space-around">
        <Col span={14}>
          <h2>Extraction Step</h2>
          <b>Researcher: {researcher.name}</b>
          <p>Project: {project.title}</p>
        </Col>
        { Object.keys(step).length !== 0 && (<Col span={9} offset={1}>
          <span>
            <Icon type="sync" />
            &nbsp;Status: <b>{step.status.replace('_',' ')}</b>
          </span><br/>
          <span>
            <Icon type="calendar" />
            &nbsp;Begin: {moment(step.startDate).format('LLL')}
          </span><br/>
          <span>
            <Icon type="calendar" />
            &nbsp;Deadline for Extractors: {moment(step.dateExtractor).format('LLL')}
          </span><br/>
          <span>
            <Icon type="calendar" />
            &nbsp;Deadline for Decisors: {moment(step.dateConflicts).format('LLL')}
          </span>
        </Col>)}
      </Row>
    );
  }
}

export default connect(state => ({
  project: state.project,
  researcher: state.researcher,
  step: state.step,
  isLoading: state.loading
}))(ExtractionHeader);
