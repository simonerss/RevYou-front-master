import React, { Component } from 'react';
import { Form, Divider, Button, message, Skeleton, Col, Row, Popover } from 'antd';
import { getFieldInput, getFieldConfig } from '../../components/extraction/FormFieldConfig';
import { updateCreateAnswer, getStudyFieldsWithAnswers } from '../../services/FormService';
import { formTypes, fieldTypes } from '../../util/constants';
import { PropTypes } from 'prop-types';

class ConflictForm extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  state = {
    fields: [],
    isLoading: false,
    isSubmitting: false
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    const { formId } = this.props;
    if (formId) {
      this.setState({ isLoading: true });
      getStudyFieldsWithAnswers(formId)
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
    return `${field.description.substring(0, 15)}`;
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
    const { fields, isSubmitting, isLoading } = this.state;
    const { form } = this.props;
    const formItems = fields.map((field, index) => {
      const finalAnswer = field.Answers.filter(answer => answer.Form.type === formTypes.FINAL);
      const extractionAnswer = field.Answers.filter(
        answer => answer.Form.type === formTypes.EXTRACTION
      );
       return (
        <div key={field.id}>
          <Form.Item
            label={
              <b>
                #{field.position} {field.description}
              </b>
            }
          >
            <Row type="flex" justify="center" gutter={16}>
              {extractionAnswer.map(answer =>{ 
                const value = field.type === fieldTypes.MULTIPLE? answer.option: answer.content;
                return(
                //Flex layout uses a 24 grid layout to define the width of each "box"
                <Col key={answer.id} span={Math.floor(24 / extractionAnswer.length)}>
                  <Popover
                    style={{ width: 500}}
                    placement="topLeft"
                    title="Extraction Data"
                    content={<p>{answer.supportData}</p>}
                    arrowPointAtCenter
                  >
                    {React.cloneElement(getFieldInput(field, true), { value })}
                  </Popover>
                </Col>
              )})}
            </Row>
            <Divider dashed>Final Answer</Divider>
            <Row type="flex" justify="space-around" align="middle">
              {getFieldConfig(field, finalAnswer, form)(getFieldInput(field))}
            </Row>
          </Form.Item>
        </div>
      );
    });
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
            <Col offset={8} span={8}>
              <Button block htmlType="submit" loading={isSubmitting} icon="save" type="primary">
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const FullConflictForm = Form.create({ name: 'conflict_form' })(ConflictForm);

export default FullConflictForm;
