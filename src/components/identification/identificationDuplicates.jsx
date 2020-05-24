import React from 'react';
import { Collapse, Table, Button, Row, Col, Tag } from 'antd';
import './identificationDuplicates.css';

const Panel = Collapse.Panel;

const identificationResume = ({ data, handleDuplicate, handleSubmit }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors'
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: 'Status',
      dataIndex: 'generalStatus',
      key: 'generalStatus',
      render: status => {
        let color = status.length > 10 ? 'geekblue' : 'gold';
        return (
          <span>
            <Tag color={color}>{status}</Tag>
          </span>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => {
        return (
          <span>
            <Button
              type="submit"
              htmlType="submit"
              onClick={() => handleDuplicate(record.id, index)}
            >
              Duplicate
            </Button>
          </span>
        );
      }
    }
  ];

  return (
    <Row>
      <Collapse defaultActiveKey={['1']} marginBottom="20">
        <Panel
          marginBottom={20}
          showArrow={false}
          accordion={false}
          header={<h3>Duplicates Studies</h3>}
          key="1"
        >
          <Row style={{ marginBottom: 20 }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                rowClassName={record => record.color.replace('#', '')}
                rowKey={data => data.id}
                expandedRowRender={record => (
                  <div style={{ margin: 0 }}>
                    <span style={{ color: 'blue'}}> Abstract: </span>
                    <span>{record.abstract}</span>
                  </div>
                )}
                pagination={false}
              />
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={5}>
              <Button type="danger" href="/#/identification" htmlType="button" block>
                Cancel
              </Button>
            </Col>
            <Col span={5}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit} block>
                Save
              </Button>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Row>
  );
};

export default identificationResume;
