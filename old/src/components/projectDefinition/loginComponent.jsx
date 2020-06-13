import React from 'react';
import { Col, Row, Button, Form, Input, Modal } from 'antd';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginValidation } from '../../util/validationSchema';

const FormItem = Form.Item;

const login = ({
  initialValues,
  handleSubmit,
  modalVisible,
  handleOk,
  handleCancel,
  showModal
}) => (
  <div className="login">
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidation}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Row type="flex" justify="center">
            <Col md={{ span: 12 }} lg={{ span: 8 }}>
              <div className="border-shadow">
                <div>
                  <Image src="https://i.ibb.co/7rY1Ykv/Rev-U-font3.png" alt="logo revyou" fluid />
                </div>

                <FormItem
                  help={errors.email && touched.email ? errors.email : null}
                  validateStatus={errors.email && touched.email ? 'error' : ''}
                >
                  <FormikField
                    name="email"
                    render={({ field }) => (
                      <Input className="input-login" {...field} name="email" placeholder="E-mail" />
                    )}
                  />
                </FormItem>

                <FormItem
                  help={errors.password && touched.password ? errors.password : null}
                  validateStatus={errors.password && touched.password ? 'error' : ''}
                >
                  <FormikField
                    name="password"
                    render={({ field }) => (
                      <Input.Password
                        className="input-login"
                        name="password"
                        {...field}
                        placeholder="Password"
                      />
                    )}
                  />
                </FormItem>

                <div>
                  <Link to="#" onClick={showModal}>
                    Forgot password?
                  </Link>
                  <Modal
                    title="Reset your password"
                    visible={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Input placeholder="Enter your email address" />
                  </Modal>
                </div>
                <div>
                  <Button className="btn-login" type="primary" htmlType="submit">
                    Login
                  </Button>
                </div>
                <div>
                  <Button className="btn-login" href="/#/singup" htmlType="submit">
                    Sign up
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  </div>
);

export default login;
