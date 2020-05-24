import React from 'react';
import { Collapse, Table, Divider, Button, Input, Row, Col, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
const Panel = Collapse.Panel;

const selectionCriteria = ({ data, handleDelete, handleEdit, handleSubmit, handleChange }) => {
  const typeAfter = (
    <Select defaultValue="Inclusion" onChange={handleChange}>
      <Option value="Inclusion">Inclusion</Option>
      <Option value="Exclusion">Exclusion</Option>
    </Select>
  );

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: text => <Link to="/project/protocol">{text}</Link>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            <Button
              type="submit"
              htmlType="submit"
              icon="edit"
              onClick={() => handleEdit(record.key)}
            />
            <Divider type="vertical" />
            <Button
              type="submit"
              htmlType="submit"
              icon="delete"
              onClick={() => handleDelete(record.key)}
            />
          </span>
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
        header={<h3>Selection Criteria</h3>}
        key="1"
      >
        <Row gutter={20} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Input
              id="description"
              addonAfter={typeAfter}
              placeholder="input the selection criteria description..."
              onPressEnter={handleSubmit}
            />
          </Col>
          <Col span={1}>
            <Button type="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table columns={columns} dataSource={data} rowKey={data => data.key} />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default selectionCriteria;
