import React from 'react';
import { Collapse, Form, Button, Input, Row, Col } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';

const { Panel } = Collapse;
const { TextArea } = Input;
const FormItem = Form.Item;

const secondaryQuestion = ({
  initialValues,
  questions,
  handleSubmit,
  createProject,
  counter,
  handleAddQuestion,
  handleRemoveQuestion,
  handleChange
}) => {
  const createQuestion = () => {
    let quention = [];
    for (let i = 0; i < counter; i++) {
      quention.push(
        <Col key={i}>
          <FormItem label="Description">
            <FormikField
              name={`description${i}`}
              render={({ field }) => (
                <TextArea
                  {...field}
                  name={`description${i}`}
                  placeholder="Description..."
                  autosize={{ minRows: 2, maxRows: 6 }}
                  value={questions[i] !== undefined ? questions[i] : ''}
                  onChange={e => handleChange(e, i)}
                />
              )}
            />
          </FormItem>
        </Col>
      );
    }
    return quention;
  };

  return (
    <Collapse defaultActiveKey={['1', '2', '3']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Secondary Question</h3>}
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
                {createQuestion()}
              </Row>
              <Row type="flex" justify="space-between" style={{ marginBottom: '10px' }}>
                <Col >
                  <Button htmlType="button" onClick={handleRemoveQuestion}>Remove Secondary Question</Button>
                </Col>
                <Col >
                  <Button htmlType="button" onClick={handleAddQuestion}>Add Secondary Question</Button>
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
};

export default secondaryQuestion;
