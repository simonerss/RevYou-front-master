import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Col, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

class SearchProjectsComponent extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
        visible: false,
        data: this.props.data
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

        const projects = this.props.data;
        const columns = [
            {
                title: 'Title', dataIndex: 'title', key: 'title', width: 250,
                ...this.getColumnSearchProps('title'),
                render: (text, record) => {
                    return (
                        <span> <Link to={`/aboutProject/${record.key}`} >{text}</Link> </span>
                    );
                },
            },
            { title: 'Review Type', dataIndex: 'reviewType', key: 'reviewType', width: 150, ...this.getColumnSearchProps('reviewType') },
            { title: 'Coordinator', dataIndex: 'coordinatorName', key: 'coordinatorName', width: 100, ...this.getColumnSearchProps('coordinatorName') },
            { title: 'E-mail Coordinator', dataIndex: 'coordinatorEmail', key: 'coordinatorEmail', width: 100, ...this.getColumnSearchProps('coordinatorEmail') },
        ];

        return (
            <Row>
                <Col span={24}>
                    <h2>Projects on RevYou</h2><hr />
                    <Table bordered columns={columns} dataSource={projects}
                        pagination={{ pageSize: 20 }} scroll={{ x: true, y: true }} />
                </Col>
            </Row>
        );
    }
}

export default SearchProjectsComponent;