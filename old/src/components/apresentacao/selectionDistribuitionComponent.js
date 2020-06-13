import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class SelectionDistribuitionComponent extends React.Component {
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
        let researchers = this.props.researchers;
        researchers = researchers.concat(this.props.coordinator);
        const projectid = this.props.data.id;
        const login = this.props.login;        

        const columns = [
            { title: 'Researcher', dataIndex: 'name', key: 'name' },
            { title: 'E-mail', dataIndex: 'email', key: 'email', responsive: ['md'], },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => {                    
                    if(record.id === login.id){
                        return(<span>
                            <Link to={`/selfSelectionDistribuition/${projectid}/${record.id}`}>
                                <Button sm="small" title="See Distribuition" type="primary">My Distribuition</Button>
                            </Link>
                        </span>);
                    }else{
                        return(<span>
                            <Link to={`/researcherSelectionDistribuition/${projectid}/${record.id}`}>
                                <Button sm="small" title="See Distribuition" type="primary">See Distribuition</Button>
                            </Link>
                        </span>);
                    }
                }
            }
        ];

        return (
            <Row>
                <Col sm={24}>
                    <h3> Studies Distribution for Selection Step</h3>
                    <hr />
                    {/* <Row>
                        <Col sm={24} className="row row-even">
                            <h5>Selection Step Graphics:</h5>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col sm={24} className="row row-odd" style={{color: '#6c757d'}}>
                            <Row>
                                <Col sm={24}>
                                    <h5>Selection Step Graphics:</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24}>
                                    <Link to={`/acceptedbyyear/${projectid}`}>
                                        <Button title="Accepted Studies per Year" type="default">
                                            Accepted Studies per Year
                                        </Button>
                                    </Link>
                                    {'\u00A0'}|{'\u00A0'}
                                    <Link to={`/selectionStatusResult/${projectid}`}>
                                        <Button title="Selected Studies per Status" type="default">
                                            Selected Studies per Status
                                        </Button>
                                    </Link>
                                    {'\u00A0'}|{'\u00A0'}
                                    <Link to={`/rejectedByCriteria/${projectid}`}>
                                        <Button title="Rejected Studies per Status" type="default">
                                            Rejected Studies per Status
                                        </Button>
                                    </Link>
                                    {'\u00A0'}|{'\u00A0'}
                                    <Link to={`/acceptedBySearchEngine/${projectid}`}>
                                        <Button title="Accepted Studies per Search Engine" type="default">
                                            Accepted Studies per Search Engine
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Table columns={columns} dataSource={researchers} scroll={{ x: true }} />
                </Col>
            </Row>
        );
    }
}

export default SelectionDistribuitionComponent;