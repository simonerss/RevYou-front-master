import React from 'react';
import { Collapse, Form, Button, Input, Row, Col, Checkbox } from 'antd';
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
      header={<h3>Main Question</h3>}
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
            <Row gutter={10}>
              <Col>
                <FormItem
                  label="Description"
                  help={errors.title && touched.title ? errors.title : null}
                  validateStatus={errors.title && touched.title ? 'error' : ''}
                >
                  <FormikField
                    name="description"
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        name="description"
                        placeholder="Description..."
                        autosize={{ minRows: 2, maxRows: 6 }}
                      />
                    )}
                  />
                </FormItem>
              </Col>
              <Col>
                <Checkbox onChange={handleChange}>Picoc Criteria</Checkbox>
              </Col>
              { disableFields && (
                <>
                  <Col>
                    <FormItem label="Population">
                      <FormikField
                        name="population"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="population"
                            placeholder="Population..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Intervation">
                      <FormikField
                        name="intervation"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="intervation"
                            placeholder="Intervation..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Control">
                      <FormikField
                        name="control"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="control"
                            placeholder="Control..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Results">
                      <FormikField
                        name="results"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="results"
                            placeholder="Results..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Application context">
                      <FormikField
                        name="application"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="application"
                            placeholder="Application context..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Experimental Design">
                      <FormikField
                        name="experimental"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="experimental"
                            placeholder="Experimental Design..."
                            autosize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                </>
              )}
            </Row>
            <Row type="flex" justify="space-between" style={{marginTop: 10}}>
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
