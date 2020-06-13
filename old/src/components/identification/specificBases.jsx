import React from 'react';
import { Collapse, Button, Row, Col, Input, Upload, Icon, DatePicker, Form } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const Panel = Collapse.Panel;
const { TextArea } = Input;
const FormItem = Form.Item;

const dateFormat = 'DD/MM/YYYY';

const specificBases = ({
  handleImport,
  handleSubmit,
  fileList,
  initialValues,
  createProject,
  dateSearch,
  handleChange
}) => {
  return (
    <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Adapt Standard Query</h3>}
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
                <Col span={24}>
                  <FormItem
                    label="Adapt Standard Query"
                    help={errors.title && touched.title ? errors.title : null}
                    validateStatus={errors.title && touched.title ? 'error' : ''}
                  >
                    <FormikField
                      name="adaptSearchString"
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          name="adaptSearchString"
                          placeholder="Adapt Search String..."
                          autosize={{ minRows: 2, maxRows: 6 }}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="Date string was searched in base">
                    <FormikField
                      name="dateSearch"
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          name="dateSearch"
                          format={dateFormat}
                          onChange={(value) => handleChange('dateSearch', value)}
                          onBlur={() => null}
                          value={dateSearch}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={1}>
                  <Button type="danger" href="/#/user/listprojects" htmlType="button">
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
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Import Studies</h3>}
        key="2"
      >
        <Row style={{ gutter: 20, marginBottom: 20 }}>
          <Col span={3}>
            <Upload customRequest={handleImport} accept=".bib" fileList={fileList}>
              <Button>
                <Icon type="upload" /> Click to Import
              </Button>
            </Upload>
          </Col>
          <Col span={6}>
            <span>Date bibtex was generated: </span>
            <DatePicker format={dateFormat} onChange={(value) => handleChange('importDate', value)} />
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default specificBases;
