import React from 'react';
import { Collapse, Table, Row } from 'antd';
// import { Link } from 'react-router-dom';

const Panel = Collapse.Panel;
// const Search = Input.Search;

const ListResearchers = ({ researchers }) => {
    const columns = [
        {
            title: 'Researchers',
            dataIndex: 'name',
            key: 'name'
            // render: text => <Link to="/project/protocol">{text}</Link>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }
    ];
    return (
        <Row>
            {/* <Row gutter={20} style={{ marginBottom: 20 }}>
                <Col span={12}>
                    <Search placeholder="input the project you search..." size="large" enterButton />
                </Col>
                <Col span={1}>
                    <Button size="large" type="primary" href="/#/newproject">
                        Register
                    </Button>
                </Col>
            </Row> */}

            <Row>
                <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
                    <Panel
                        marginBottom={20}
                        showArrow={false}
                        accordion={false}
                        // header={<h3>Researchers</h3>}
                        key="1"
                    >
                        <Table columns={columns} dataSource={researchers} rowKey={researchers => researchers.key} />
                    </Panel>
                </Collapse>
            </Row>
        </Row>
    );
};

export default ListResearchers;