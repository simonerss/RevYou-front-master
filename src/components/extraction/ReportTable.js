import React from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { formStatus } from './../../util/constants';
import { PropTypes } from 'prop-types';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <b>{text}</b>
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => (
      <span>
        {status.map(status => {
            let color;
          switch (status.status) {
            case formStatus.ON_GOING:
              color = 'blue';
              break;
            case formStatus.FILLED:
              color = 'green';
              break;
            default:
              color = '';
              break;
          }

          return (
            <Tooltip key={status.status} title={status.status.replace('_',' ').toUpperCase()}>
              <Tag color={color} key={status}>
                {status.count}
              </Tag>
            </Tooltip>
          );
        })}
      </span>
    )
  },
  {
    title: 'Total',
    dataIndex: 'count',
    key: 'count'
  }
];

const ReportTable = props => {
    const {reportData} =  props;
  return <Table pagination={false} columns={columns} dataSource={reportData} />;
};

ReportTable.propTypes = {
    reportData: PropTypes.array.isRequired,
  };

export default ReportTable;
