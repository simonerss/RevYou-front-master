import React from 'react';
import { Collapse, Form, Button, Input, Row, Col } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const { Panel } = Collapse;
const { TextArea } = Input;
const FormItem = Form.Item;

const protocolComponent = ({
  initialValues,
  handleSubmit,
  createProject,
  handleChange,
  disableFields
}) => (
  <Collapse defaultActiveKey={['1']} marginBottom="20">
    <Panel
      marginBottom={20}
      showArrow={false}
      accordion={false}
      header={<h3>Standard Query</h3>}
      key="1"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createProject}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Row>
              <Col>
                <FormItem label="Query">
                  <FormikField
                    name="query"
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        name="query"
                        placeholder="Query..."
                        autosize={{ minRows: 2, maxRows: 6 }}
                      />
                    )}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span={1}>
                <Button type="danger" htmlType="button">
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </Panel>
  </Collapse>
);

export default protocolComponent;
