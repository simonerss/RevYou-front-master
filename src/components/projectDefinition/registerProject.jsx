import React from 'react';
import { Card, Form, Col, Button, Row, Input, Select } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { createProject } from '../../util/validationSchema';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const registerProject = ({ initialValues, handleSubmit, handleChange, valueSelect, infoTitle }) => (
  <Card title={<h1>{infoTitle} Project</h1>}>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createProject} enableReinitialize={true}>
      {({ errors, touched }) => (
        <FormikForm>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem
                label="Project Name (Title)"
                help={errors.title && touched.title ? errors.title : null}
                validateStatus={errors.title && touched.title ? 'error' : ''}
              >
                <FormikField
                  name="title"
                  render={({ field }) => (
                    <Input {...field} name="title" placeholder="Project Name" />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Review Type"
                help={errors.reviewType && touched.reviewType ? errors.reviewType : null}
                validateStatus={errors.reviewType && touched.reviewType ? 'error' : ''}
              >
                <FormikField
                  name="reviewType"
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="reviewType"
                      placeholder="Select a Review Type"
                      value={valueSelect}
                      onChange={handleChange}
                    >
                      <Option value="Systematic Review">Systematic Review</Option>
                      <Option value="Systematic Mapping">Systematic Mapping</Option>
                      <Option value="Not Systematic">Not Systematic</Option>
                    </Select>
                  )}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem label="Description">
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
            <Col span={12}>
              <FormItem label="Objective">
                <FormikField
                  name="objective"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      name="objective"
                      placeholder="Objective..."
                      autosize={{ minRows: 2, maxRows: 6 }}
                    />
                  )}
                />
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={1}>
              <Button type="danger" href="/#/home" htmlType="button">
                Cancel
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                {infoTitle} Project
              </Button>
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  </Card>
);

export default registerProject;
