import React, { Component } from 'react';
import { Table, Input, Tag, Radio, Button } from 'antd';

 class FieldList extends Component {
  handleEditQuestion = id => {
    this.props.edit(id);
  };

  render() {
    //const data = [{"id":46,"key":46,"type":"open","options":[],"description":"teste1 "}];
    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'name',
        render: text => <span>{text}</span>
      },
      {
        title: 'Field',
        dataIndex: 'options',
        key: 'options',
        render: options => {
          if (options.length > 0) {
            return ( 
              <Radio.Group>
                {options.map(op => (
                  <Radio value={op} checked={false}>
                    {op}
                  </Radio>
                ))}
              </Radio.Group>
            );
          } else {
            return <Input />;
          }
        }
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: type => (
          <span>
            <Tag color={type === 'close' ? 'orange' : 'green'} key={type}>
              {type.toUpperCase()}
            </Tag>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'id',
        dataIndex: 'id',
        render: id => (
          <>
           <Button type="default" icon="edit" onClick={()=> this.props.edit(id)} /> &nbsp; 
            
          </>
        )
      }
    ];
    // console.log(JSON.stringify(this.props.data));
    return <Table columns={columns} dataSource={this.props.data} />;
  }
}

export default FieldList;
