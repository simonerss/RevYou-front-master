import React from 'react';
import {
  Form,
  Popover,
  Button,
  Row,
  Col,
  DatePicker,
  Collapse,
  Select,
  InputNumber,
  Slider
} from 'antd';
import { stepMethods } from '../../util/constants';
import { Form as FormikForm, Field as FormikField } from 'formik';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

const methodsTooltip = (
  <div>
    {Object.keys(stepMethods).map((key, index) => (
      <p key={index}>
        <b>{stepMethods[key].name}:</b>
        {stepMethods[key].tooltip}
      </p>
    ))}
  </div>
);

const ExtractionSettingForm = ({
  props,
  values,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  isSubmitting,
  handleSubmit,
  researchers
}) => {
  const researchersOptions = researchers.map(r => <Option key={r.id}>{r.name}</Option>);
  const methodsOptions = Object.keys(stepMethods).map(key => (
    <Option key={stepMethods[key].name} disabled={stepMethods[key].disabled}>
      {stepMethods[key].name}
    </Option>
  ));
  return (
    <FormikForm onSubmit={handleSubmit}>
      <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
        <Panel
          marginBottom={20}
          showArrow={false}
          accordion={false}
          header={<h3>Deadlines</h3>}
          key="1"
        >
          <Row gutter={40}>
            <Col span={8} offset={4}>
              <FormItem
                label="Start Date"
                help={errors.startDate && touched.startDate ? errors.startDate : null}
                validateStatus={errors.startDate && touched.startDate ? 'error' : ''}
              >
                <FormikField
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      name="startDate"
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={value => setFieldValue('startDate', value)}
                      onBlur={() => setFieldTouched('startDate', true)}
                      value={values.startDate}
                    />
                  )}
                />
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem
                label="End Date for Extractor"
                help={errors.dateExtractor && touched.dateExtractor ? errors.dateExtractor : null}
                validateStatus={errors.dateExtractor && touched.dateExtractor ? 'error' : ''}
              >
                <FormikField
                  name="dateExtractor"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      name="dateExtractor"
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={value => setFieldValue('dateExtractor', value)}
                      onBlur={() => setFieldTouched('dateExtractor', true)}
                      value={values.dateExtractor}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={8} offset={4}>
              <FormItem
                label="End Date for solving conflicts"
                help={errors.dateConflicts && touched.dateConflicts ? errors.dateConflicts : null}
                validateStatus={errors.dateConflicts && touched.dateConflicts ? 'error' : ''}
              >
                <FormikField
                  name="dateConflicts"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      name="dateConflicts"
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={value => setFieldValue('dateConflicts', value)}
                      onBlur={() => setFieldTouched('dateConflicts', true)}
                      value={values.dateConflicts}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="End Date"
                help={errors.endDate && touched.endDate ? errors.endDate : null}
                validateStatus={errors.endDate && touched.endDate ? 'error' : ''}
              >
                <FormikField
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      name="endDate"
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={value => setFieldValue('endDate', value)}
                      onBlur={() => setFieldTouched('endDate', true)}
                      value={values.endDate}
                    />
                  )}
                />
              </FormItem>
            </Col>
          </Row>
        </Panel>
        {/* </Collapse>
  
          <Collapse defaultActiveKey={['1']} marginBottom ="20"> */}
        <Panel
          marginBottom={20}
          showArrow={false}
          accordion={false}
          header={<h3>Method and Colaboration</h3>}
          key="2"
        >
          <Row gutter={40}>
            <Col span={8}>
              <FormItem
                label="Choose Method"
                help={errors.method && touched.method ? errors.method : null}
                validateStatus={errors.method && touched.method ? 'error' : ''}
              >
                <FormikField
                  name="method"
                  render={({ field }) => (
                    <Popover
                      content={methodsTooltip}
                      title="Extraction methods information"
                      trigger="hover"
                    >
                      <Select
                        {...field}
                        name="method"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        showArrow={true}
                        onChange={value => {
                          if (value === stepMethods.EMI.name) {
                            //EMI
                            setFieldValue('numExtractorStudy', 1);
                            setFieldValue('scoreBoard', 1);
                          }
                          setFieldValue('method', value);
                        }}
                        onBlur={() => setFieldTouched('method', true)}
                        value={values.method}
                      >
                        {methodsOptions}
                      </Select>
                    </Popover>
                  )}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Choose Extractors"
                help={errors.extractors && touched.extractors ? errors.extractors : null}
                validateStatus={errors.extractors && touched.extractors ? 'error' : ''}
              >
                <FormikField
                  name="extractors"
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="extractors"
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      showArrow={true}
                      onChange={value => setFieldValue('extractors', value)}
                      onBlur={() => setFieldTouched('extractors', true)}
                      value={values.extractors}
                    >
                      {researchersOptions}
                    </Select>
                  )}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Choose Decisors"
                help={errors.decisors && touched.decisors ? errors.decisors : null}
                validateStatus={errors.decisors && touched.decisors ? 'error' : ''}
              >
                <Select
                  name="decisors"
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  showArrow={true}
                  onChange={value => setFieldValue('decisors', value)}
                  onBlur={() => setFieldTouched('decisors', true)}
                  value={values.decisors}
                >
                  {researchersOptions}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={8}>
              <FormItem
                label="Number of Extractors for Study"
                help={
                  errors.numExtractorStudy && touched.numExtractorStudy
                    ? errors.numExtractorStudy
                    : null
                }
                validateStatus={
                  errors.numExtractorStudy && touched.numExtractorStudy ? 'error' : ''
                }
              >
                <InputNumber
                  name="numExtractorStudy"
                  style={{ width: '100%' }}
                  placeholder="Set Extractors Number"
                  onChange={value => {
                    setFieldValue('numExtractorStudy', value);
                    setFieldValue('scoreBoard', 0);
                  }}
                  onBlur={() => setFieldTouched('numExtractorStudy', true)}
                  value={values.numExtractorStudy}
                  min={1}
                  disabled={values.method === 'EMI'}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Score board"
                help={errors.scoreBoard && touched.scoreBoard ? errors.scoreBoard : null}
                validateStatus={errors.scoreBoard && touched.scoreBoard ? 'error' : ''}
              >
                <Slider
                  name="scoreBoard"
                  style={{ width: '100%' }}
                  onChange={value => {
                    //With 1 or 2 numExtractorStudy the score should be 1x0 or 2x0
                    if (values.numExtractorStudy <= 2)
                      setFieldValue('scoreBoard', values.numExtractorStudy);
                    else {
                      //With more than 3 numExtractorStudy, the score can vary a lot,
                      //but the number of Equals has to be higher than wrongs
                      const score =
                        value <= values.numExtractorStudy / 2
                          ? Math.floor(values.numExtractorStudy / 2) + 1
                          : value;
                      setFieldValue('scoreBoard', score);
                    }
                  }}
                  onBlur={() => setFieldTouched('scoreBoard', true)}
                  value={values.scoreBoard}
                  min={0}
                  max={values.numExtractorStudy}
                  tipFormatter={value => {
                    return `${value} Equals vs ${values.numExtractorStudy - value} wrong`;
                  }}
                  disabled={
                    values.numExtractorStudy <= 2 &&
                    (values.scoreBoard === 1 || values.scoreBoard === 2)
                  }
                />
              </FormItem>
            </Col>
          </Row>
          <FormItem>
        <Row style={{ marginTop: 20 }} type="flex" justify="center">
          {/* <Col span={6}>
            <Button
              icon="arrow-left"
              block
              disabled={isSubmitting}
              type="primary"
              ghost
            >
              Cancel
            </Button>
          </Col> */}
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
      </FormItem>
        </Panel>
      </Collapse>
      
    </FormikForm>
  );
};

export default ExtractionSettingForm;
