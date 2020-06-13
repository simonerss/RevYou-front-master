import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Col, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ResearcherSelectionDistribuition extends React.Component {
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
            { title: 'Title', dataIndex: 'title', key: 'title', width: 100, ...this.getColumnSearchProps('title') },
            { title: 'Authors', dataIndex: 'authors', key: 'authors', width: 180, ...this.getColumnSearchProps('authors') },
            // { title: 'Cite Key', dataIndex: 'citekey', key: 'citekey', width: 180, ...this.getColumnSearchProps('citekey') },
            // { title: 'Abstract', dataIndex: 'abstract', key: 'abstract', width: 200, ...this.getColumnSearchProps('abstract') },
            { title: 'Keywords', dataIndex: 'keywords', key: 'keywords', width: 150, ...this.getColumnSearchProps('keywords') },
            { title: 'Venue', dataIndex: 'venue', key: 'venue', width: 150, ...this.getColumnSearchProps('venue') },
            { title: 'Year', dataIndex: 'year', key: 'year', width: 100, ...this.getColumnSearchProps('year') },
            { title: 'Pages', dataIndex: 'pages', key: 'pages', width: 100, ...this.getColumnSearchProps('pages') },
            // { title: 'Volume', dataIndex: 'volume', key: 'volume', ...this.getColumnSearchProps('volume') },
            // { title: 'URL', dataIndex: 'url', key: 'url',  width: 180,...this.getColumnSearchProps('url') },
            { title: 'General Status', dataIndex: 'generalStatus', key: 'generalStatus', width: 120, ...this.getColumnSearchProps('generalStatus') },
            { title: 'Venue Type', dataIndex: 'venueType', key: 'venueType', width: 150, ...this.getColumnSearchProps('venueType') },
            { title: 'Assign Date', dataIndex: 'assignDate', key: 'assignDate', width: 150, ...this.getColumnSearchProps('assignDate') },
            { title: 'Examination Date', dataIndex: 'examinationDate', key: 'examinationDate', width: 150, ...this.getColumnSearchProps('examinationDate') },
            { title: 'Selection Status ', dataIndex: 'status', key: 'status', width: 150, ...this.getColumnSearchProps('status') },
            // { title: 'Researcher name ', dataIndex: 'name', key: 'name', width: 150, ...this.getColumnSearchProps('name') },
            // { title: 'Researcher ID ', dataIndex: 'ResearcherId', key: 'ResearcherId', width: 150, ...this.getColumnSearchProps('ResearcherId') },            
            // { title: 'Article ID ', dataIndex: 'key', key: 'key', width: 150, ...this.getColumnSearchProps('key') },
            // {
            //     title: 'Action',
            //     key: 'action',
            //     width: 150,
            //     fixed: 'right',
            //     render: (text, record) => {
            //         return (
            //             <span>
            //                 <Link to={`/selectionForm/${record.key}/${record.ResearcherId}`}>
            //                     <Button title="Select" type="primary">Make Selection</Button>
            //                 </Link>
            //             </span>
            //         );
            //     }
            // }
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const selectionDistribuitionXLSX = data.map(data => {
            return [
                { value: ((data.StudyId != null) ? data.StudyId : "") },
                { value: ((data.title != null) ? data.title : "") },
                { value: ((data.authors != null) ? data.authors : "") },
                { value: ((data.citekey != null) ? data.citekey : "") },
                { value: ((data.abstract != null) ? data.abstract : "") },
                { value: ((data.keywords != null) ? data.keywords : "") },
                { value: ((data.venue != null) ? data.venue : "") },
                { value: ((data.year != null) ? data.year : "") },
                { value: ((data.pages != null) ? data.pages : "") },
                { value: ((data.volume != null) ? data.volume : "") },
                { value: ((data.url != null) ? data.url : "") },
                { value: ((data.issn != null) ? data.issn : "") },
                { value: ((data.doi != null) ? data.doi : "") },
                { value: ((data.base != null) ? data.base : "") },
                { value: ((data.search != null) ? data.search : "") },
                { value: ((data.generalStatus != null) ? data.generalStatus : "") },
                { value: ((data.venueType != null) ? data.venueType : "") },
                { value: ((data.createdAt != null) ? data.createdAt : "") },
                { value: ((data.updatedAt != null) ? data.updatedAt : "") },
                { value: ((data.assignDate != null) ? data.assignDate : "") },
                { value: ((data.examinationDate != null) ? data.examinationDate : "")},
                { value: ((data.status != null) ? data.status : "")},
            ];
        });
        const multiDataSelectionDistribuitionXLSX = [{
            columns: [
                { title: 'Study ID', width: { wpx: 300 } },
                { title: 'Title', width: { wpx: 300 } },
                { title: 'Authors', width: { wpx: 250 } },
                { title: 'Cite Key', width: { wpx: 250 } },
                { title: 'Abstract', width: { wpx: 250 } },
                { title: 'Keywords', width: { wpx: 250 } },
                { title: 'Venue', width: { wpx: 250 } },
                { title: 'Year', width: { wpx: 250 } },
                { title: 'Pages', width: { wpx: 250 } },
                { title: 'Volume', width: { wpx: 250 } },
                { title: 'URL', width: { wpx: 250 } },
                { title: 'ISSN', width: { wpx: 250 } },
                { title: 'DOI', width: { wpx: 250 } },
                { title: 'Base', width: { wpx: 250 } },
                { title: 'Search', width: { wpx: 250 } },
                { title: 'General Status', width: { wpx: 250 } },
                { title: 'Venue Type', width: { wpx: 250 } },
                { title: 'Date Identification', width: { wpx: 250 } },
                { title: 'Date Update', width: { wpx: 250 } },
                { title: 'Assign Date', width: { wpx: 250 } },
                { title: 'Examination Date', width: { wpx: 250 } },
                { title: 'Selection Status ', width: { wpx: 250 } },
            ],
            data: selectionDistribuitionXLSX 
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const distribuitionCSV = data.map(data => {
            return [
                data.StudyId, data.title, data.authors, data.citekey,
                data.abstract, data.keywords, data.venue, data.year,
                data.pages, data.volume, data.url, data.issn,
                data.doi, data.base, data.search, data.generalStatus,
                data.venueType, data.createdAt, data.updatedAt, data.assignDate,
                data.examinationDate, data.status,
            ]
        });
        distribuitionCSV.unshift([
            "Study ID", "Title", "Authors", "Cite Key",
            "Abstract", "Keywords", "Venue", "Year", 
            "Pages", "Volume", "URL","ISSN",
            "DOI", "Base", "Search", "General Status",
            "Venue Type", "Date Identification", "Date Update", "Assign Date",
            "Examination Date", "Selection Status ",
        ]);


        return (
            <Row>
                <Col span={24}>
                    <h3>Studies Assigned to {this.props.researcher.name} Selection Step</h3><hr />
                    <Table bordered columns={columns} dataSource={data}
                        pagination={{ pageSize: 50 }} scroll={{ x: 1300, y: 500 }} />
                    <ExcelFile filename={"selection-study-researcher-distribuition-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataSelectionDistribuitionXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"selection-study-researcher-distribuition-" + sufixFileName() + ".csv"} data={distribuitionCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default ResearcherSelectionDistribuition;