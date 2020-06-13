import React from 'react';
import { Col, Row, Button, Form, Input, Select, Divider } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const UpdateStudy = ({
  handleOk,
  handleCancel,
  initialValues,
  createProject,
  status,
  venueType,
  handleChange
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleOk}
    validationSchema={createProject}
    enableReinitialize={true}
  >
    {({ resetForm, errors, touched }) => (
      <FormikForm>
        <Row gutter={10}>
          <Col span={12}>
            <FormItem
              label="Status"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    name="status"
                    placeholder="Status..."
                    value={status}
                    onChange={value => handleChange('status', value)}
                  >
                    <Option value="Unclassified">Unclassified</Option>
                    <Option value="Duplicated">Duplicated</Option>
                  </Select>
                )}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Venue Type"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="venueType"
                render={({ field }) => (
                  <Select
                    {...field}
                    name="venueType"
                    placeholder="Venue Type..."
                    value={venueType}
                    onChange={value => handleChange('venueType', value)}
                  >
                    <Option value="Journal">Journal</Option>
                    <Option value="Conferecence Pronceendings">Conferecence Pronceendings</Option>
                    <Option value="Technical Report">Technical Report</Option>
                    <Option value="Thesis">Thesis</Option>
                    <Option value="Book">Book</Option>
                  </Select>
                )}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Title"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="title"
                render={({ field }) => <Input {...field} name="title" placeholder="Title..." />}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Abstract"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="abstract"
                render={({ field }) => (
                  <TextArea
                    {...field}
                    name="abstract"
                    placeholder="Abstract..."
                    autosize={{ minRows: 2, maxRows: 6 }}
                  />
                )}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Authors"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="authors"
                render={({ field }) => <Input {...field} name="authors" placeholder="Authors..." />}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Keywords"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="keywords"
                render={({ field }) => (
                  <Input {...field} name="keywords" placeholder="Keywords..." />
                )}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="citekey"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="Citekey"
                render={({ field }) => <Input {...field} name="citekey" placeholder="Citekey..." />}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Venue"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="venue"
                render={({ field }) => <Input {...field} name="venue" placeholder="Venue..." />}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Pages"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="pages"
                render={({ field }) => <Input {...field} name="pages" placeholder="Pages..." />}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Volume"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="volume"
                render={({ field }) => <Input {...field} name="volume" placeholder="Volume..." />}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Year"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="year"
                render={({ field }) => <Input {...field} name="year" placeholder="Year..." />}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="ISSN/ISBN"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="issn"
                render={({ field }) => <Input {...field} name="issn" placeholder="ISSN/ISBN..." />}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Doi"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="doi"
                render={({ field }) => <Input {...field} name="doi" placeholder="Doi..." />}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="Url"
              help={errors.title && touched.title ? errors.title : null}
              validateStatus={errors.title && touched.title ? 'error' : ''}
            >
              <FormikField
                name="url"
                render={({ field }) => <Input {...field} name="url" placeholder="Url..." />}
              />
            </FormItem>
          </Col>
        </Row>
        <Divider />
        <Row type="flex" justify="space-between">
          <Col span={5}>
            <Button type="danger" htmlType="button" onClick={handleCancel.bind(null, resetForm)} block>
              Cancel
            </Button>
          </Col>
          <Col span={5}>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Col>
        </Row>
      </FormikForm>
    )}
  </Formik>
);

export default UpdateStudy;
