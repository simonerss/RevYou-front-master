import React from 'react';
import { Collapse, Table, Row, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const Panel = Collapse.Panel;

const SearchEngineDistribuitionComponent = ({ data, searchText, searchedColumn }) => {

    const getColumnSearchProps = dataIndex => ({
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
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    const columns = [
        {
            title: 'Researcher',
            dataIndex: 'researcher',
            key: 'researcher',
            ...this.getColumnSearchProps('researcher')
        },
        {
            title: 'Search Engine',
            dataIndex: 'searchengine',
            key: 'searchengine',
            ...this.getColumnSearchProps('searchengine')
        }
    ];


    return (
        <div>
            <Row>
                <Collapse defaultActiveKey={['1', '2']} marginBottom="20">
                    <Panel marginBottom={20} showArrow={false} accordion={false} key="1"
                        header={<h3>Search Engine Distribuition</h3>} >

                        <Table columns={columns} dataSource={data} rowKey={data => data.key} />

                    </Panel>
                </Collapse>
            </Row>
        </div>
    );
};

export default SearchEngineDistribuitionComponent;
