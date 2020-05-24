import React from 'react';
import { Collapse, Form, Button, Input, Row, Col } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { changeName, changeEmail, changePassword } from '../../util/validationSchema';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

const userProfile = ({ handleSubmit }) => (
  <div>
    <Collapse defaultActiveKey={['1', '2', '3']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Change Password</h3>}
        key="1"
      >
        <Formik onSubmit={handleSubmit} validationSchema={changePassword}>
          {({ errors, touched }) => (
            <FormikForm>
              <Row gutter={40}>
                <Col md={{ span: 8 }}>
                  <FormItem
                    label="New Password"
                    help={errors.password && touched.password ? errors.password : null}
                    validateStatus={errors.password && touched.password ? 'error' : ''}
                  >
                    <FormikField
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          name="password"
                          placeholder="New Password"
                          visibilityToggle={false}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col md={{ span: 8 }}>
                  <FormItem
                    label="New Passoword Confirmation"
                    help={
                      errors.passwordVerification && touched.passwordVerification
                        ? errors.passwordVerification
                        : null
                    }
                    validateStatus={
                      errors.passwordVerification && touched.passwordVerification ? 'error' : ''
                    }
                  >
                    <FormikField
                      name="passwordVerification"
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          name="passwordVerification"
                          placeholder="New Password Confirmation"
                          visibilityToggle={false}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2 }}>
                  <Button type="primary" htmlType="submit" icon="save">
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
        header={<h3>Change Email</h3>}
        key="2"
      >
        <Formik onSubmit={handleSubmit} validationSchema={changeEmail}>
          {({ errors, touched }) => (
            <FormikForm>
              <Row>
                <FormItem
                  label="Change E-mail"
                  help={errors.email && touched.email ? errors.email : null}
                  validateStatus={errors.email && touched.email ? 'error' : ''}
                >
                  <FormikField
                    name="email"
                    render={({ field }) => (
                      <Input {...field} name="email" placeholder="New E-mail" />
                    )}
                  />
                </FormItem>
              </Row>
              <Row>
                <Col md={{ span: 2 }}>
                  <Button type="primary" htmlType="submit" icon="save">
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
        header={<h3>Change Name</h3>}
        key="3"
      >
        <Formik onSubmit={handleSubmit} validationSchema={changeName}>
          {({ errors, touched }) => (
            <FormikForm>
              <Row>
                <FormItem
                  label="Change Name"
                  help={errors.name && touched.name ? errors.name : null}
                  validateStatus={errors.name && touched.name ? 'error' : ''}
                >
                  <FormikField
                    name="name"
                    render={({ field }) => <Input {...field} name="name" placeholder="New Name" />}
                  />
                </FormItem>
              </Row>
              <Row>
                <Col md={{ span: 2 }}>
                  <Button type="primary" htmlType="submit" icon="save">
                    Save
                  </Button>
                </Col>
              </Row>
            </FormikForm>
          )}
        </Formik>
      </Panel>
    </Collapse>
  </div>
);

export default userProfile;
