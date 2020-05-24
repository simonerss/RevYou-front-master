import React from 'react';
import { Card, Form, Col, Button, Row, Input } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { singupValidation } from '../../util/validationSchema';
import './register.css';

const FormItem = Form.Item;

const singupComponent = ({ initialValues, handleSubmit }) => (
  <div className="tela-cadastro">
    <Card title={<h1>Join RevYou</h1>} className="card">
      <h2>User Info</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={singupValidation}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Row>
              <Col md={{ span: 24 }}>
                <Col md={{ span: 12 }}>
                  <FormItem
                    label="E-mail"
                    help={errors.email && touched.email ? errors.email : null}
                    validateStatus={errors.email && touched.email ? 'error' : ''}
                  >
                    <FormikField
                      name="email"
                      render={({ field }) => (
                        <Input
                          className="input-login"
                          {...field}
                          name="email"
                          placeholder="E-mail"
                        />
                      )}
                    />
                  </FormItem>
                </Col>

                <Col md={{ span: 6 }}>
                  <FormItem
                    label="Password"
                    help={errors.password && touched.password ? errors.password : null}
                    validateStatus={errors.password && touched.password ? 'error' : ''}
                  >
                    <FormikField
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          className="input-login"
                          {...field}
                          visibilityToggle={false}
                          name="password"
                          placeholder="Password"
                        />
                      )}
                    />
                  </FormItem>
                </Col>

                <Col md={{ span: 6 }}>
                  <FormItem
                    label="Password Verification"
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
                          className="input-login"
                          {...field}
                          visibilityToggle={false}
                          name="passwordVerification"
                          placeholder="Password"
                        />
                      )}
                    />
                  </FormItem>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 12 }}>
                <FormItem
                  label="Name"
                  help={errors.name && touched.name ? errors.name : null}
                  validateStatus={errors.name && touched.name ? 'error' : ''}
                >
                  <FormikField
                    name="name"
                    render={({ field }) => (
                      <Input
                        className="input-login"
                        {...field}
                        name="name"
                        placeholder="Your Name"
                      />
                    )}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 1 }}>
                <Button type="danger" href="/#/" htmlType="button">
                  Cancel
                </Button>
              </Col>
              <Col md={{ span: 1, offset: 19 }}>
                <Button type="primary" htmlType="submit">
                  Create an account
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </Card>
  </div>
);

export default singupComponent;
