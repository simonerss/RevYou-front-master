import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormTable from './FormTable';
import { getForms } from '../../services/FormService';
import { Skeleton } from 'antd';
import { formTypes } from '../../util/constants';
import FullConflictForm from './ConflictForm';

class ManageConflictForm extends Component {
  state = {
    forms: [],
    isLoading: false
  };

  componentDidMount() {
    const { step } = this.props;
    this.setState({ isLoading: true });
    getForms({step, type: formTypes.FINAL})
      .then(res => this.setState({ forms: res.data }))
      .finally(this.setState({ isLoading: false }));
  }

  render() {
    const { forms, isLoading } = this.state;
    const { step } = this.props;
    return Object.keys(step).length === 0 || isLoading ? (
      <Skeleton active />
    ) : (
      <>
        <h2>Conflict Forms</h2>
        <FormTable forms={forms} researchers={step.Decisor} formComp={<FullConflictForm/>}/>
      </>
    );
  }
}

export default connect(state => ({
  step: state.step
}))(ManageConflictForm);
