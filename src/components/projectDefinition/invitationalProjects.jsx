import React from 'react';
import { Collapse, Table, Divider, Button } from 'antd';
//import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const invitinonalProject = ({ data, handleDenied, handleAccept }) => {
  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name'
    },
    /*{
      title: 'Cordinator',
      dataIndex: 'cordinator',
      key: 'cordinator'
    },*/
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            <Button type="link" htmlType="submit" icon="check" onClick={() => handleAccept(record.key)} style={{color: 'green'}} />
            <Divider type="vertical" />
            <Button type="link" htmlType="submit" icon="close" onClick={() => handleDenied(record.key)} style={{color: 'red'}} />
          </span>
        );
      }
    }
  ];

  return (
    <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
      <Panel
        marginBottom={20}
        showArrow={false}
        accordion={false}
        header={<h3>Invitational Projects</h3>}
        key="1"
      >
        <Table columns={columns} dataSource={data} />
      </Panel>
    </Collapse>
  );
};

export default invitinonalProject;
