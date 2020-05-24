import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  getFields,
  upSertField,
  deleteField,
  updatePosition
} from '../../services/TemplateService';
import TemplateForm from './TemplateForm';
import DragFieldList from './DragFieldList';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { fieldTypes, stepStatus } from '../../util/constants';

class ManageTemplate extends Component {
  state = {
    field: {},
    fields: [],
    isLoading: false,
    isSubmitting: false
  };

  componentDidMount() {
      this.getTemplateFields();
  }

  getTemplateFields = () => {
    const stepId = this.props.step.id;
    if(!stepId){
      return message.error(`Unable to find a valid Extraction Step! Please contact the project Coordinator.`);
    }
    this.setState({ isLoading: true });
    getFields(stepId)
    // https://stackoverflow.com/questions/53551851/node-express-res-status-send-only-sends-the-status-but-does-not-send-an-ob
    // .then(response => response.json())
      .then(
        res => {
          const fields = res.data;
          this.setState({ fields });
        },
        error => {
          console.log(JSON.stringify(error));
          message.warning(`${error.response.data}`);
        }
      )
      .finally(this.setState({ isLoading: false }));
  };

  handlefieldType = e => {
    this.setState({
      field: {
        ...this.state.field,
        type: e.target.value
        // option: []
      }
    });
  };

  handlefieldDescription = e => {
    this.setState({
      field: {
        ...this.state.field,
        description: e.target.value
      }
    });
  };

  handleAddOptions = values => {
    this.setState({
      field: {
        ...this.state.field,
        option: values
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const stepId = this.props.step.id;
    const { field } = this.state;
    if (!field.type) {
      return message.warning('Please choose a type for this field.');
    }
    if (field.type !== fieldTypes.OPEN && !field.option) {
      return message.warning('Please create options for this field.');
    }
    if (field.type !== fieldTypes.OPEN && field.option.length < 2) {
      return message.warning('Please create at least 2 options for this field.');
    }
    this.setState({ isSubmitting: true });

    upSertField(stepId, field)
      .then(
        res => {
          message.success(res.data);
          this.getTemplateFields();
        },
        error => {
          message.error(error.response.data);
        }
      )
      .finally(this.setState({ field: {}, isSubmitting: false }));
  };

  handleDeletefield = fieldId => {
    const stepId = this.props.step.id;
    this.setState({ isSubmitting: true })
    deleteField(stepId, fieldId)
      .then(
        res => {
          message.success(res.data);
          this.getTemplateFields();
        },
        error => {
          console.log(error);
        }
      )
      .finally(this.setState({ isSubmitting: false }));
  };

  handleEditfield = id => {
    this.setState({
      field: this.state.fields.find(item => item.id === id)
    });
  };

  handlePositionUpdate = (fieldId, position) => {
    const stepId = this.props.step.id;
    this.setState({ isSubmitting: true });
    updatePosition(stepId, fieldId, position)
      .then(
        res => {
          this.getTemplateFields();
          message.success(res.data);
        },
        error => {
          message.error(error.response.data);
        }
      )
      .finally(this.setState({ isSubmitting: false }));
  };

  render() {
    const { isSubmitting, field, fields, isLoading } = this.state;
    const {step} = this.props;
    const FieldList = DragDropContext(HTML5Backend)(DragFieldList);

    return (
      <>
        <TemplateForm
          isSubmitting={isSubmitting}
          field={field}
          isLoading={isLoading}
          handleAddOptions={this.handleAddOptions}
          handlefieldType={this.handlefieldType}
          handlefieldDescription={this.handlefieldDescription}
          handleSubmit={this.handleSubmit}
        />
        {fields.length > 0 && (
          <FieldList
            data={fields}
            delete={this.handleDeletefield}
            edit={this.handleEditfield}
            position={this.handlePositionUpdate}
            loading={isSubmitting}
            isEditable={step.status === stepStatus.SETTING}
          />
        )}
        {/* <DragDemo/> */}
      </>
    );
  }
}

export default connect(state => ({
  step: state.step
}))(ManageTemplate);

