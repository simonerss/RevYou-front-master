import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Tooltip, Button, Row } from 'antd';
import DistributionTable from './../../components/extraction/DistributionTable';
import {
  getStudiesDistribution,
  createForm,
  getSelectionDistribution
} from './../../services/DistributionService';
import { formTypes } from '../../util/constants';

class ExtractionDistribution extends Component {
  state = {
    studies: [],
    isLoading: true,
    distribution: {}
  };

  componentDidMount = () => {
    const stepId = this.props.step.id;
    getStudiesDistribution(stepId)
      .then(res =>
        this.setState({ studies: res.data.studies, distribution: res.data.distribution })
      )
      .finally(this.setState({ isLoading: false }));
  };

  loadSelectionDistribution = () => {
    const stepId = this.props.step.id;
    getSelectionDistribution(stepId)
      .then(res => this.setState({ distribution: res.data.distribution }))
      .finally(this.setState({ isLoading: false }));
  };

  render() {
    const researchers = this.props.step.Extractor;
    const { numExtractorStudy, id } = this.props.step;
    const { studies, distribution, isLoading } = this.state;

    return isLoading ? (
      <Skeleton active />
    ) : (
      <>
        <h1>Extraction Distribution</h1>
        <Row type="flex" justify="end">
          <Tooltip
            placement="top"
            title="Load a study distribution based on the selection studies."
          >
            <Button
              loading={isLoading}
              type="primary"
              ghost
              icon="select"
              onClick={() => this.loadSelectionDistribution()}
            >
              Selection Distribution
            </Button>
          </Tooltip>
        </Row>

        <DistributionTable
          studies={studies}
          researchers={researchers}
          numExtractorStudy={numExtractorStudy}
          distribution={distribution}
          type={formTypes.EXTRACTION}
          create={createForm}
          stepId={id}
        />
      </>
    );
  }
}

export default connect(state => ({
  step: state.step
}))(ExtractionDistribution);
