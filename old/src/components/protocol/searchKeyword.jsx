import React from 'react';
import { Collapse, Form, Button, Row, Col, Select } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const { Panel } = Collapse;
const FormItem = Form.Item;

const searchKeywordComponent = ({
  initialValues,
  handleSubmit,
  createProject,
  handleChange,
  keywords
}) => (
  <Collapse defaultActiveKey={['1']} marginBottom="20">
    <Panel
      marginBottom={20}
      showArrow={false}
      accordion={false}
      header={<h3>Search Keywords</h3>}
      key="1"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createProject}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Row>
              <Col>
                <FormItem label="Keywords">
                  <FormikField
                    name="keywords"
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="tags"
                        tokenSeparators={[',']}
                        name="keywords"
                        placeholder="Keywords..."
                        autosize={{ minRows: 2, maxRows: 6 }}
                        onChange={handleChange}
                        value={keywords.length ? keywords : undefined}
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

export default searchKeywordComponent;
