import React from 'react';
import '../../../src/revyou-css.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Container, Row as BRow, Col as BCol } from 'react-bootstrap';
import { Table, Row, Col } from 'antd';

const AboutProjectComponent = ({ data, coordinator, researchers }) => {

    const columns = [
        { title: 'Researcher', dataIndex: 'name', key: 'name' },
        { title: 'E-mail', dataIndex: 'email', key: 'email', responsive: ['md'], }
    ];

    return (
        <div>
            <Container style={{ textAlign: 'justify', color: '#595959' }}>
                <p>
                    <h1><b>Project Title: {data.title}</b></h1>
                </p><hr />
                <BRow>
                    <BCol sm={24}>
                        <Accordion defaultActiveKey="0">
                            <Card style={{ width: '100%', borderRadius: '3px', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                                <Card.Header>
                                        <h5><b>About Project</b></h5>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body style={{ padding: '10px 15px', }}>
                                        <Row className="row row-even">
                                            <Col span={12}>
                                                <b>Coordinator: {'\u00A0'}</b> {coordinator.name}
                                            </Col>
                                            <Col span={12}>
                                                <b>E-mail: {'\u00A0'}</b> {coordinator.email}
                                            </Col>
                                        </Row>
                                        <Row className="row row-odd">
                                            <Col span={24}>
                                                <b>Review Type: {'\u00A0'}</b> {data.reviewType}
                                            </Col>
                                        </Row>
                                        <Row className="row row-even">
                                            <Col span={24}>
                                                <p><b><center>Objectives: {'\u00A0'}</center></b></p>
                                                <p>{data.objective}</p>
                                            </Col>
                                        </Row>
                                        <Row className="row row-odd">
                                            <Col span={24}>
                                                <p><b><center>Description: {'\u00A0'}</center></b></p>
                                                <p>{data.description}</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </BCol>
                </BRow><br /><br />
                <BRow sm={24}>
                    <BCol>
                        <h4>Researchers Involved</h4>
                        <Table columns={columns} dataSource={researchers} rowKey={researchers => researchers.key} scroll={{ x: true }} />
                    </BCol>
                </BRow>
            </Container>
        </div>
    );
}

export default AboutProjectComponent;
