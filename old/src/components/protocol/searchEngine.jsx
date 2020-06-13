import React from 'react';
import { Collapse, Form, Button, Row, Col, Select } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const { Panel } = Collapse;
const { Option } = Select;
const FormItem = Form.Item;

const base = ['ACM', 'IEEE', 'Web of Science', 'Springer', 'Scopus',' Science Direct', 'Scielo', 'Lilacs', 'Google Academic'];
const children = [];
for (let i = 0; i < base.length; i++) {
  children.push(<Option key={base[i]}>{base[i]}</Option>);
}

const searchEngineComponent = ({
  initialValues,
  handleSubmit,
  createProject,
  handleChange,
  bases
}) => (
  <Collapse defaultActiveKey={['1']} marginBottom="20">
    <Panel
      marginBottom={20}
      showArrow={false}
      accordion={false}
      header={<h3>Search Engines</h3>}
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
                <FormItem label="Bases Used">
                  <FormikField
                    name="bases"
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="tags"
                        tokenSeparators={[',']}
                        name="bases"
                        placeholder="Bases..."
                        autosize={{ minRows: 2, maxRows: 6 }}
                        onChange={handleChange}
                        value={bases.length ? bases : undefined}
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

export default searchEngineComponent;
