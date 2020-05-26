import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Col, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class StudiesInSelectionConflictComponent extends React.Component {

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
            {
                title: 'Title', dataIndex: 'title', key: 'title', width: 300,
                ...this.getColumnSearchProps('title'),
                // render: text => <Link to="#" >{text}</Link>,
            },
            { title: 'Authors', dataIndex: 'authors', key: 'authors', width: 200, ...this.getColumnSearchProps('authors') },
            // { title: 'Keywords', dataIndex: 'keywords', key: 'keywords', width: 150, ...this.getColumnSearchProps('keywords') },
            { title: 'Year', dataIndex: 'year', key: 'year', width: 100, ...this.getColumnSearchProps('year') },
            { title: 'Search Engine', dataIndex: 'base', key: 'base', width: 200, ...this.getColumnSearchProps('base') },
            { title: 'Selection Result Status', dataIndex: 'selectionstatus', key: 'selectionstatus', width: 200, ...this.getColumnSearchProps('selectionstatus') },
            // { title: 'Cite Key', dataIndex: 'citekey', key: 'citekey', width: 180, ...this.getColumnSearchProps('citekey') },
            // { title: 'Abstract', dataIndex: 'abstract', key: 'abstract', width: 200, ...this.getColumnSearchProps('abstract') },
            // { title: 'Venue', dataIndex: 'venue', key: 'venue', width: 150, ...this.getColumnSearchProps('venue') },
            // { title: 'Pages', dataIndex: 'pages', key: 'pages',  width: 100,...this.getColumnSearchProps('pages') },
            // { title: 'Volume', dataIndex: 'volume', key: 'volume', ...this.getColumnSearchProps('volume') },
            // { title: 'General Status', dataIndex: 'generalStatus', key: 'generalStatus', width: 120, ...this.getColumnSearchProps('generalStatus') },
            // { title: 'Venue Type', dataIndex: 'venueType', key: 'venueType', width: 150, ...this.getColumnSearchProps('venueType') }
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <span>
                            <Link to={`/studySelectionStepReport/${record.key}`}>
                                <Button title="Selection Details" type="primary" >Selection Details</Button>
                            </Link>
                        </span>
                    );
                }
            }
        ];

        //studySelectionStepReport
        //--------------FOR EXPORT XLSX-------------------------------
        const selectionConflictXLSX = data.map(data => {
            return [
                { value: ((data.title != null) ? data.title : "") },
                { value: ((data.authors != null) ? data.authors : "") },
                { value: ((data.keywords != null) ? data.keywords : "") },
                { value: ((data.year != null) ? data.year : "") },
                { value: ((data.url != null) ? data.url : "") },
                { value: ((data.selectionstatus != null) ? data.selectionstatus : "") },
            ];
        });
        const multiDataselectionConflictXLSX = [{
            columns: [
                { title: "Title", width: { wpx: 300 } },
                { title: 'Authors', width: { wpx: 250 } },
                { title: 'Keywords', width: { wpx: 250 } },
                { title: 'Year', width: { wpx: 250 } },
                { title: 'URL', width: { wpx: 250 } },
                { title: 'Selection Result Status', width: { wpx: 250 } },
            ],
            data: selectionConflictXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const selectionConflictCSV = data.map(data => {
            return [
                data.title, data.authors, data.keywords, data.year,
                data.url, data.selectionstatus
            ]
        });
        selectionConflictCSV.unshift([
            "Title", "Authors", "Keywords", "Year",
            "URL", "Selection Result Status"
        ]);
        
        return (

            <Row>
                <Col span={24}>
                    <Table bordered columns={columns} dataSource={data}
                        pagination={{ pageSize: 20 }} scroll={{ x: 1300, y: 400 }} />
                    <ExcelFile filename={"selection-conflict-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataselectionConflictXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"selection-conflict-" + sufixFileName() + ".csv"} data={selectionConflictCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default StudiesInSelectionConflictComponent;