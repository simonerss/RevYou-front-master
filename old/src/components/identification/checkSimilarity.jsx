import React from 'react';
import { Table, Tag } from 'antd';
import './identificationDuplicates.css';

const checkSimilarity = ({ data, clickOnLine }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',

    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',

    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',

    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',

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
      title: 'Similarity',
      dataIndex: 'similarity',
      key: 'similarity',

      sorter: (a, b) => a.similarity - b.similarity,
      render: text => text + '%'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={data => data.id}
      pagination={false}
      onRow={record => {return {onDoubleClick: () => clickOnLine(record.id)}}}
    />
  );
};

export default checkSimilarity;
