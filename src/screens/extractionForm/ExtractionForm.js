import React, { Component } from 'react';
import { Form, Input, Button, message, Skeleton, Col, Row } from 'antd';
import { getFieldInput, getFieldConfig } from '../../components/extraction/FormFieldConfig';
import { updateCreateAnswer, getFieldsWithAnswers } from './../../services/FormService';
import { formTypes } from './../../util/constants';
import { PropTypes } from 'prop-types';

class ExtractionForm extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  state = {
    fields: [],
    isLoading: false,
    isSubmitting: false
  };

  componentDidMount() {
    const { formId } = this.props;
    if (formId) {
      this.setState({ isLoading: true });
      getFieldsWithAnswers(formId)
        .then(
          res => {
            const fields = res.data;
            this.setState({ fields }); //field: fields[0]
          },
          error => {
            message.error(`Houston we have a problem! Try again soon!`);
            console.log(error);
          }
        )
        .finally(this.setState({ isLoading: false }));
    }
  }

  findFieldById = id => {
    const field = this.state.fields.find(field => field.id === id);
    return `#${field.position} ${field.description.substring(0, 15)}`;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formId, closeModal } = this.props;
    const answers = this.props.form.getFieldsValue();
    Object.entries(answers).forEach(([key, value], index) => {
      this.setState({ isSubmitting: true });
      const question = this.findFieldById(key);
      if (
        (value.option !== undefined && value.option.length > 0) ||
        (value.content !== undefined && value.content.trim().length > 0)
      ) {
        updateCreateAnswer(value, key, formId).then(
          res => {
            message.success(`${res.data} for question ${question}`, 7);
          },
          error => {
            message.error(error.response.data);
          }
        );
      } else {
        message.warning(`No answer subtimited for question ${question}`, 7);
      }
    });
    this.setState({ isSubmitting: false }, () => closeModal());
  };

  render() {
    const { TextArea } = Input;
    const { fields, isSubmitting, isLoading } = this.state;
    const { form, type } = this.props;
    const formItems = fields.map((field, index) => (
      <div key={field.id}>
        <Form.Item  
          label={
            <b>
              {field.description}
            </b>
          }
        >
          <Row type="flex" justify="space-around" align="middle">
            {getFieldConfig(field, field.Answers, form)(
              getFieldInput(field, type === formTypes.FINAL)
            )}
          </Row>
        </Form.Item>
        {type === formTypes.EXTRACTION && (
          <Form.Item label={'Support Data'}>
            {form.getFieldDecorator(`[${field.id}][supportData]`, {
              initialValue: field.Answers[0] ? field.Answers[0].supportData : ''
            })(<TextArea placeholder="Support Data" autosize={{ minRows: 2, maxRows: 6 }} />)}
          </Form.Item>
        )}
      </div>
    ));
    return isLoading ? (
      <Skeleton active size="large" paragraph rows="10" />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Row type="flex" justify="space-between" align="bottom">
            <Col span={8}>
              <Button block icon="close" onClick={() => this.props.closeModal()}>
                Close
              </Button>
            </Col>
            {type === formTypes.EXTRACTION && (
              <Col offset={8} span={8}>
                <Button block htmlType="submit" loading={isSubmitting} icon="save" type="primary">
                  Save
                </Button>
              </Col>
            )}
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const FullExtractionForm = Form.create({ name: 'extraction_form' })(ExtractionForm);

export default FullExtractionForm;
