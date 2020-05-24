import React from 'react';
import { Collapse, Form, Button, Row, Col, Select } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const { Panel } = Collapse;
const { Option } = Select;
const FormItem = Form.Item;

const language = ['English','Spanish','Portuguese','Russian','Chinese'];
const children = [];
for (let i = 0; i < language.length; i++) {
  children.push(<Option key={language[i]}>{language[i]}</Option>);
}

const languageComponent = ({
  initialValues,
  handleSubmit,
  createProject,
  handleChange,
  languages
}) => (
  <Collapse defaultActiveKey={['1']} marginBottom="20">
    <Panel
      marginBottom={20}
      showArrow={false}
      accordion={false}
      header={<h3>Language</h3>}
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
                <FormItem label="Study Languages">
                  <FormikField
                    name="studiesLanguage"
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="tags"
                        tokenSeparators={[',']}
                        name="studiesLanguage"
                        placeholder="Studies Language..."
                        autosize={{ minRows: 2, maxRows: 6 }}
                        onChange={handleChange}
                        value={languages.length ? languages : undefined}
                      >
                        {children}
                      </Select>
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

export default languageComponent;
