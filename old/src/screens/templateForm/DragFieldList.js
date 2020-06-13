import React, { Component } from 'react';
import { Table, Tag, Button, Modal } from 'antd';
import DragableBodyRow from '../../components/extraction/DragableBodyRow';
import { fieldTypes } from '../../util/constants';
import { getFieldInput } from './../../components/extraction/FormFieldConfig';
import './DragFieldList.css';

class DragFieldList extends Component {
  state = {
    delete: {}
  };

  componentDidMount() {
    this.setState({
      delete: this.props.delete
    });
  }

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  handleEditQuestion = id => {
    this.props.edit(id);
  };

  showDeleteConfirm = id => {
    Modal.confirm({
      title: 'Are you sure delete this field?',
      // content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.state.delete(id);
      },
      onCancel: () => {
        console.log('Cancel');
      }
    });
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.props;
    const dragRow = data[dragIndex];
    this.props.position(dragRow.id, hoverIndex);
  };

  render() {
    const { isEditable, data, loading } = this.props;
    const columns = [
      // {
      //   title: '#',
      //   dataIndex: 'position',
      //   key: 'name',
      //   render: text => <span>{text}</span>
      // },
      {
        title: 'Description',
        dataIndex: 'description',
        width: 420,
        key: 'name',
        render: text => <span>{text}</span>
      },
      {
        title: 'Field',
        key: 'id',
        render: field => getFieldInput(field)
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: type => (
          <span>
            <Tag
              color={
                type === fieldTypes.OPEN
                  ? 'green'
                  : type === fieldTypes.SINGLE
                  ? 'orange'
                  : 'purple'
              }
              key={type}
            >
              {type.toUpperCase()}
            </Tag>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'id',
        dataIndex: 'id',
        // colSpan: 6,
        width: 110,
        render: id => (
          <>
            {isEditable && (
              <Button type="default" icon="edit" onClick={() => this.handleEditQuestion(id)} />
            )}
            &nbsp; <Button type="danger" icon="delete" onClick={() => this.showDeleteConfirm(id)} />{' '}
            &nbsp;
          </>
        )
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        components={this.components}
        pagination={false}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
        loading={loading}
      />
    );
  }
}

export default DragFieldList;
