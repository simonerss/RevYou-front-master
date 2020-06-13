import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import ExtractionSettingForm from '../../components/extraction/ExtractionStepForm';
import { Formik } from 'formik';
import { extractionStepValidation } from '../../util/validationSchema';
import { editStep, createStep } from '../../services/StepService';
import { handleGetStep } from './../../actions/step';
import moment from 'moment';
import 'moment/locale/pt-br';

class ExtractionSetting extends Component {
  state = {
    finishedSteps: [],
    isLoading: false,
    forms: [],
  };

  render() {
    const {
      id,
      startDate,
      endDate,
      dateExtractor,
      dateConflicts,
      Decisor,
      Extractor,
      method,
      numExtractorStudy,
      scoreBoard
    } = this.props.step;
    const researchers = this.props.project.Researcher || [];
    const decisors = Decisor ? Decisor.map(d => d.id) : [];
    const extractors = Extractor ? Extractor.map(e => e.id) : [];
    const initialValues = {
      startDate: moment.utc(startDate) || moment(),
      endDate: moment.utc(endDate) || moment(),
      dateExtractor: moment.utc(dateExtractor) || moment(),
      dateConflicts: moment.utc(dateConflicts) || moment(),
      decisors: decisors || [],
      extractors: extractors || [],
      method: method || undefined,
      numExtractorStudy: numExtractorStudy || 0,
      scoreBoard: scoreBoard || 0
    };
    return this.state.isLoading ? (
      <Skeleton active size="large" paragraph rows="10" />
    ) : (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={extractionStepValidation}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const projectId = this.props.project.id;
            if (id) {
              editStep(id, {
                startDate: values.startDate,
                endDate: values.endDate,
                dateExtractor: values.dateExtractor,
                dateConflicts: values.dateConflicts,
                decisors: values.decisors,
                extractors: values.extractors,
                method: values.method,
                numExtractorStudy: values.numExtractorStudy,
                scoreBoard: values.scoreBoard
              })
                .then(
                  res => {
                    message.success(res.data);
                  },
                  error => {
                    message.warning(error.data);
                  }
                )
                .then(() => this.props.dispatch(handleGetStep(projectId)))
                .finally(setSubmitting(false));
            } else {
              createStep(projectId, {
                startDate: values.startDate,
                endDate: values.endDate,
                dateExtractor: values.dateExtractor,
                dateConflicts: values.dateConflicts,
                decisors: values.decisors,
                extractors: values.extractors,
                method: values.method,
                numExtractorStudy: values.numExtractorStudy,
                scoreBoard: values.scoreBoard
              })
                .then(
                  res => {
                    if (res.status < 220) message.success(res.data);
                    else message.warning(res.data);
                  },
                  error => {
                    console.log(error.data);
                  }
                )
                .then(() => this.props.dispatch(handleGetStep(projectId)))
                .finally(setSubmitting(false));
            }
            this.setState({ isSubmitting: false });
          }}
          render={formikProps => (
            <ExtractionSettingForm researchers={researchers} {...formikProps} />
          )}
        />       
      </>
    );
  }
}

export default connect(state => ({
  project: state.project,
  step: state.step
}))(ExtractionSetting);
