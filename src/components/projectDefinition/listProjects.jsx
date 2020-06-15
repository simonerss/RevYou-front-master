import React from 'react';
import { Collapse, Table, Divider, Button, Row, Col, Input, } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const Panel = Collapse.Panel;
// const Search = Input.Search;

class listProject extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
            </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
            </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {

    const data = this.props.data;
    const handleDelete = this.props.handleDelete;
    const handleEdit = this.props.handleEdit;

    const columns = [
      {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,        
        ...this.getColumnSearchProps('name'),
        render: text => <Link to="/project/protocol">{text}</Link>,
      },
      {
        title: 'Review Type',
        dataIndex: 'reviewType',
        key: 'reviewType',
        width: 110,
        ...this.getColumnSearchProps('reviewType')
      },
      {
        title: 'Coordinator',
        dataIndex: 'coordinator',
        key: 'coordinator',
        width: 110,
        ...this.getColumnSearchProps('coordinator')
      },
      {
        title: 'Action',
        key: 'action',
        width: 110,
        render: (text, record) => {
          return (
            <span>
              <Button title="Edit" type="submit" htmlType="submit" icon="edit" href="/#/project/protocol" onClick={() => handleEdit(record.key)} />
              <Divider type="vertical" />
              <Button title="Delete" type="submit" htmlType="submit" icon="delete" onClick={() => handleDelete(record.key)} />
              <Divider type="vertical" />
              <Link to={`/project/details/${record.key}`}>
                <Button title="Details" type="default" icon="eye" />
              </Link>
            </span>
          );
        }
      }
    ];

    return (
      <Row>
        <Row gutter={20} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Button size="large" type="primary" href="/#/newproject">
                New Project
            </Button>
            {/* <Search placeholder="input the project you search..." size="large" enterButton /> */}
          </Col>
          <Col span={1}>
            {/* <Button size="large" type="primary" href="/#/newproject">
              Register
            </Button> */}
          </Col>
        </Row>

        <Row>
          <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
            <Panel
              marginBottom={20}
              showArrow={false}
              accordion={false}
              header={<h3>User Projects</h3>}
              key="1"
            >
              <Table bordered columns={columns} dataSource={data} rowKey={data => data.key} />
            </Panel>
          </Collapse>
        </Row>
      </Row>
    )
  }
}

export default listProject;
