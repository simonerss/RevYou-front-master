import React, { Component } from 'react';
import { Table, Button, Tooltip } from 'antd';
import {stepMethods} from '../../util/constants';
import { PropTypes } from 'prop-types';
import moment from 'moment';

class StepTable extends Component {
  static propTypes = {
    steps: PropTypes.array.isRequired,
    showFormsTable: PropTypes.func.isRequired,
    hideFormsTable: PropTypes.func.isRequired,
    showForms: PropTypes.bool.isRequired
  };

  render() {
    const { steps, showFormsTable, hideFormsTable, showForms } = this.props;
    const columns = [
      {
        title: 'Start Date',
        //   colSpan: 3,
        dataIndex: 'startDate',
        sorter: (a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        },
        sortDirections: ['ascend', 'descend'],
        render: date => <b>{moment(date).format('ll')}</b>
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        render: date => <b>{moment(date).format('ll')}</b>
      },
      {
        title: 'Method',
        dataIndex: 'method',
        render: text => (<Tooltip placement="top" title={stepMethods[text].tooltip}>
        <b>{text}</b>
      </Tooltip>)
        
      },
      {
        title: 'Extractors',
        dataIndex: 'Extractor',
        render: extractors => (
          <>
            {extractors.map(extractor => (
              <>
                <span>{extractor.name}</span>
                <br />
              </>
            ))}
          </>
        )
      },
      {
        title: 'Decisors',
        dataIndex: 'Decisor',
        render: decisors => (
          <>
            {decisors.map(decisor => (
              <>
                <span>{decisor.name}</span>
                <br />
              </>
            ))}
          </>
        )
      },
      {
        title: 'Answers',
        render: step => (
          <>
            {!showForms && <Button onClick={() => showFormsTable(step)} icon="file-text" type="primary"/>}
            {showForms && <Button onClick={() => hideFormsTable()} icon="close" type="danger"/>}
          </>
        )
      }
    ];

    return (
      <Table dataSource={steps} columns={columns} size="middle" rowKey="id" pagination={false} />
    );
  }
}
export default StepTable;
