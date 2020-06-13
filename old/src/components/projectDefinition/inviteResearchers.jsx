import React from 'react';
import { Collapse, Table, Tag, Button, Input, Row, Col } from 'antd';

const Panel = Collapse.Panel;

const inviteResearchers = ({ data, handleSubmit, handleDelete}) => {
  const columns = [
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Situation',
      dataIndex: 'situation',
      key: 'situation',
      render: situation => {
        let color = situation.length > 6 ? 'geekblue' : 'green';
        if (situation === 'denied') {
          color = 'volcano';
        }
        return (
          <span>
            <Tag color={color}>{situation.toUpperCase()}</Tag>
          </span>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button htmlType="submit" icon="delete" onClick={() => handleDelete(record.key)}/>
        </span>
      )
    }
  ];

  return (
    <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Researchers</h3>}
        key="1"
      >
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Input id="invite" placeholder="Researcher Email..." onPressEnter={handleSubmit} />
          </Col>
          <Col span={1}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Send
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} rowKey={data => data.key} />
      </Panel>
    </Collapse>
  );
};

export default inviteResearchers;
