import React from 'react';
import { Input, Radio, Checkbox } from 'antd';
import { fieldTypes } from '../../util/constants';

export const getFieldInput = (field, disabled = false) => {
  const { TextArea } = Input;
  switch (field.type) {
    case fieldTypes.OPEN:
      return (
        <TextArea
          placeholder="Extraction data"
          autosize={{ minRows: 1, maxRows: 4 }}
          style={disabled ? { background: 'lightgrey' } : ''}
        />
      );
    // <Input placeholder="Extraction Data" />;
    case fieldTypes.SINGLE:
      return <Radio.Group options={field.option} disabled={disabled} />;
    case fieldTypes.MULTIPLE:
      return <Checkbox.Group options={field.option} disabled={disabled} />;
    default:
      return <Input />;
  }
};

export const getFieldConfig = (field, answer, form) => {
  const { getFieldDecorator } = form;
  let decorator = {};
  if (field.type === fieldTypes.MULTIPLE) {
    decorator = getFieldDecorator(`[${field.id}][option]`, {
      initialValue: answer[0] ? answer[0].option : [],
      validateTrigger: ['onChange'],
      rules: [
        {
          required: true,
          type: 'array',
          message: 'Please choose any option to answer.'
        }
      ]
    });
  } else {
    decorator = getFieldDecorator(`[${field.id}][content]`, {
      initialValue: answer[0] ? answer[0].content : '',
      validateTrigger: ['onChange', 'onBlur'],
      rules: [
        {
          required: true,
          whitespace: true,
          message: 'Please input or choose and answer.'
        }
      ]
    });
  }
  return decorator;
};
