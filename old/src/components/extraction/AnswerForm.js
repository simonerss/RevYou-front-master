import React, { Component } from 'react';
import { Form, Input, Button, Radio, Checkbox, message } from 'antd';
import { fieldTypes } from '../../util/constants';
import {HTTP} from '../../services/config';

class FieldForm extends Component {
  state = {
    field: {},
    isSubmitting: false
  };

  handleSubmit = (e) => {
    const fieldId = this.props.field.id;
    e.preventDefault();
    let fields = this.props.form.getFieldsValue();
    fields.id = 1;

    HTTP
        .post(`extraction/form/1/field/${fieldId}`, fields)
        .then(
          res => {
            message.success(res.data);
          },
          error => {
            message.error(error.response.data);
          }
        )
        .finally(this.setState({ isSubmitting: false }));
  };

  getFieldInput = field => {
    switch (field.type) {
      case fieldTypes.OPEN:
        return <Input placeholder="Extraction Data" />;
      case fieldTypes.SINGLE:
        return <Radio.Group options={field.option} />;
      case fieldTypes.MULTIPLE:
        return <Checkbox.Group options={field.option} />;
      default:
        return <Input />;
    }
  };

  getFieldConfig = field => {
    const { getFieldDecorator } = this.props.form;
    return field.type === fieldTypes.MULTIPLE
      ? getFieldDecorator(`option`, {
          validateTrigger: ['onChange'],
          rules: [
            {
              required: true,
              type: 'array',
              message: 'Please choose any option to answer.'
            }
          ]
        })
      : getFieldDecorator(`content`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Please input or choose and answer.'
            }
          ]
        });
  };

  render() {
    const { field, isSubmitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItems = (
      <div>
        <Form.Item label={(<b>{field.description}</b>)}>
          {this.getFieldConfig(field)(this.getFieldInput(field))}
        </Form.Item>
        <Form.Item label={'Support Data'}>
          {getFieldDecorator(`supportData`)(
            <Input
              placeholder="Support Data"
              // style={{ width: "95%", marginRight: 10 }}
            />
          )}
        </Form.Item>
      </div>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button htmlType="submit" loading={isSubmitting}>Save</Button>
          {/* <Button type="primary" id="submit2" htmlType="submit">
            Submit
          </Button> */}
        </Form.Item>
      </Form>
    );
  }
}

const AnswerForm = Form.create({ name: 'field_form_item' })(FieldForm);

export default AnswerForm;
