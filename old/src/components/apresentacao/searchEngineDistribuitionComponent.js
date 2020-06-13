import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class SearchEngineDistribuitionComponent extends React.Component {
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
        
        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columns = [
            { title: 'Researcher', dataIndex: 'researcher', key: 'researcher', ...this.getColumnSearchProps('researcher') },
            { title: 'Search Engine', dataIndex: 'searchengine', key: 'searchengine', ...this.getColumnSearchProps('searchengine') },
            
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const distribuitionXLSX = data.map(data => {
            return [
                { value: ((data.researcher != null) ? data.researcher : "") },
                { value: ((data.searchengine != null) ? data.searchengine : "") }
            ];
        });
        const multiDataDistribuitionXLSX = [{
            columns: [
                { title: "Researcher", width: { wpx: 300 } },
                { title: "Search engine", width: { wpx: 250 } }
            ],
            data: distribuitionXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const distribuitionCSV = data.map(data => {
            return [data.researcher, data.searchengine]
        });
        distribuitionCSV.unshift(["Researcher", "Searchengine"]);

        return (
            <Row>
                <Col sm={24}>
                    <h3>Search Engine Distribuition</h3><hr />
                    <Table columns={columns} dataSource={data} scroll={{ x: true }} />
                    <ExcelFile filename={"search-engine-distribuition-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataDistribuitionXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"search-engine-distribuition-" + sufixFileName() + ".csv"} data={distribuitionCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default SearchEngineDistribuitionComponent;