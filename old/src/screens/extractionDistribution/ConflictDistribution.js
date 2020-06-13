import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import DistributionTable from './../../components/extraction/DistributionTable';
import { getStudiesConflicts, createForm } from './../../services/DistributionService';
import { formTypes } from '../../util/constants';

class ConflictDistribution extends Component {
  state = {
    studies: [],
    isLoading: true,
    avoid: {},
    distribution: {}
  };

  componentDidMount = () => {
    const stepId = this.props.step.id;
    getStudiesConflicts(stepId)
      .then(res =>
        this.setState({
          studies: res.data.studies,
          avoid: res.data.avoid,
          distribution: res.data.distribution
        })
      )
      .finally(this.setState({ isLoading: false }));
  };

  render() {
    const researchers = this.props.step.Decisor;
    const { id } = this.props.step;
    const { studies, avoid, distribution, isLoading } = this.state;

    return isLoading ? (
      <Skeleton active />
    ) : (
      <div>
        <h1>Conflicts Distribution</h1>
        <DistributionTable
          studies={studies}
          researchers={researchers}
          type={formTypes.FINAL}
          create={createForm}
          stepId={id}
          avoid={avoid}
          distribution={distribution}
        />
      </div>
    );
  }
}

export default connect(state => ({
  step: state.step
}))(ConflictDistribution);
