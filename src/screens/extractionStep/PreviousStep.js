import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import { getFinishedSteps } from '../../services/StepService';
import FullExtractionForm from './../extractionForm/ExtractionForm';
import FormTable from './../extractionForm/FormTable';
import { getForms } from './../../services/FormService';
import { formTypes } from './../../util/constants';
import StepTable from './../../components/extraction/StepTable';

class PreviousStep extends Component {
  state = {
    finishedSteps: [],
    isLoading: false,
    forms: [],
    showForms: false
  };

  componentDidMount() {
    const projectId = this.props.project.id;
    this.setState({ isLoading: true });
    getFinishedSteps(projectId)
      .then(
        res => {
          const finishedSteps = res.data;
          this.setState({ finishedSteps });
        },
        error => {
          console.log(error);
          message.error(`Houston we have a problem! Try again soon!`);
        }
      )
      .finally(this.setState({ isLoading: false }));
  }

  showFormsTable = step => {
    this.setState({ isLoading: true });
    getForms({ step, type: formTypes.FINAL })
      .then(res => this.setState({ forms: res.data, showForms: true }))
      .finally(this.setState({ isLoading: false }));
  };

  hideFormsTable = () => {
    this.setState({ forms: [], showForms: false });
  };

  render() {
    const { finishedSteps, showForms, forms, isLoading } = this.state;
    return isLoading ? (
      <Skeleton active size="large" paragraph rows="10" />
    ) : (
      <>
        <StepTable
          steps={finishedSteps}
          showForms={showForms}
          showFormsTable={this.showFormsTable}
          hideFormsTable={this.hideFormsTable}
        />
        {showForms && forms.length && 
          <FormTable forms={forms} formComp={<FullExtractionForm />} />
        }
      </>
    );
  }
}
export default connect(state => ({
    project: state.project,
  }))(PreviousStep);
