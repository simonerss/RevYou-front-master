import React from 'react';
import { Collapse, Table, Select, Row, Col, Button} from 'antd';

const Panel = Collapse.Panel;

const inviteResearchers = ({ data, researchers}) => {
  const columns = [
    {
      title: 'Base',
      dataIndex: 'base',
      key: 'base'
    },
    {
      title: 'Researcher',
      dataIndex: 'name',
      key: 'name',
      render: () => {
        return (
          <Select placeholder='Select Researcher' style={{ width: 200 }}>
            {researchers}
          </Select>
        );
      }
    }
  ];

  return (
    <Collapse defaultActiveKey={['1']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Set Researcher to a Base</h3>}
        key="1"
      >
        <Row style={{ marginBottom: 20 }}>
          <Table columns={columns} dataSource={data} rowKey={data => data.key} />
        </Row>
        <Row type="flex" justify="end">
            <Col span={5}>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default inviteResearchers;
