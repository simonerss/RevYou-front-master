import React, { Component } from 'react';
import { Skeleton, Radio, Form, Input, Button, Row, Col, Collapse, Select } from 'antd';
import { fieldTypes } from '../../util/constants';

class TemplateForm extends Component {
  render() {
    const Panel = Collapse.Panel;
    const FormItem = Form.Item;
    const { TextArea } = Input;
    const {
      isSubmitting,
      field,
      isLoading,
      handleAddOptions,
      handlefieldType,
      handlefieldDescription,
      handleSubmit
    } = this.props;
    const showOptions = field.type === fieldTypes.SINGLE || field.type === fieldTypes.MULTIPLE;

    return isLoading ? (
      <Skeleton active size="large" paragraph rows="10" />
    ) : (
      <>
        <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
          <Panel
            marginBottom={20}
            showArrow={false}
            accordion={false}
            header={<h3>Create field</h3>}
            key="1"
          >
            <Form onSubmit={handleSubmit}>
              <Row gutter={40}>
                <Col span={10} offset={2}>
                  <FormItem label="Field Type">
                    <Radio.Group onChange={handlefieldType} value={field.type}>
                      <Radio.Button value={fieldTypes.OPEN}>Open field</Radio.Button>
                      <Radio.Button value={fieldTypes.SINGLE}>Single field</Radio.Button>
                      <Radio.Button value={fieldTypes.MULTIPLE}>Multiple fields</Radio.Button>
                    </Radio.Group>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="Description" />
                  <TextArea rows={4} value={field.description} onChange={handlefieldDescription} />
                </Col>
              </Row>
              {showOptions && (
                <Row>
                  <Col span={16} offset={4}>
                    <FormItem label="Close field Options">
                      <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        value={field.option}
                        onChange={handleAddOptions}
                        tokenSeparators={[',']}
                        placeholder="Type the desired options separated by comma(,)."
                        notFoundContent={<span> </span>}
                      />
                    </FormItem>
                  </Col>
                </Row>
              )}
              <Row style={{ marginTop: 20 }} type="flex" justify="center">
                <Col span={6}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon="save"
                    size="large"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    block
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </>
    );
  }
}
export default TemplateForm;
