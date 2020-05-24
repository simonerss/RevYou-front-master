import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Col, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RightCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ExtractionStepListComponent extends React.Component {
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
        const projectid = this.props.projectid;

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columns = [
            { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', width: 150, ...this.getColumnSearchProps('startDate') },
            { title: 'End Date', dataIndex: 'endDate', key: 'endDate', width: 150, ...this.getColumnSearchProps('endDate') },
            { title: 'Date Extractor', dataIndex: 'dateExtractor', key: 'dateExtractor', width: 150, ...this.getColumnSearchProps('dateExtractor') },
            { title: 'Date Conflicts', dataIndex: 'dateConflicts', key: 'dateConflicts', width: 150, ...this.getColumnSearchProps('dateConflicts') },
            { title: 'Method', dataIndex: 'method', key: 'method', width: 150, ...this.getColumnSearchProps('method') },
            { title: 'Status', dataIndex: 'status', key: 'status', width: 100, ...this.getColumnSearchProps('status') },
            { title: 'Number Extractor Study', dataIndex: 'numExtractorStudy', key: 'numExtractorStudy', width: 150, ...this.getColumnSearchProps('numExtractorStudy') },
            { title: 'Score Board', dataIndex: 'scoreBoard', key: 'scoreBoard', width: 150, ...this.getColumnSearchProps('scoreBoard') },
            {
                title: 'Action',
                key: 'action',
                fixed: 'right',
                width: 150,
                render: (text, record) => {
                    return (<span>
                        <Link to={`/extractionDistribuition/${record.key}`}>
                            <Button title="Select" type="primary">Show Details</Button>
                        </Link>
                    </span>);
                }
            }
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const extractionStepsXLSX = data.map(data => {
            return [
                { value: ((data.key != null) ? data.key : "") },
                { value: ((data.startDate != null) ? data.startDate : "") },
                { value: ((data.endDate != null) ? data.endDate : "") },
                { value: ((data.dateExtractor != null) ? data.dateExtractor : "") },
                { value: ((data.dateConflicts != null) ? data.dateConflicts : "") },
                { value: ((data.method != null) ? data.method : "") },
                { value: ((data.status != null) ? data.status : "") },
                { value: ((data.numExtractorStudy != null) ? data.numExtractorStudy : "") },
                { value: ((data.scoreBoard != null) ? data.scoreBoard : "") },
            ];
        });
        const multiDataExtractionStepsXLSX = [{
            columns: [
                { title: "ID", width: { wpx: 300 } },
                { title: "Start Date", width: { wpx: 300 } },
                { title: "End Date", width: { wpx: 300 } },
                { title: "Date Extractor", width: { wpx: 250 } },
                { title: "Date Conflicts", width: { wpx: 250 } },
                { title: "Method", width: { wpx: 250 } },
                { title: "Status", width: { wpx: 250 } },
                { title: "Number Extractor Study", width: { wpx: 250 } },
                { title: "Score Board", width: { wpx: 250 } },
            ],
            data: extractionStepsXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const extractionStepsCSV = data.map(data => {
            return [
                data.key, data.startDate, data.endDate, data.dateExtractor,
                data.dateConflicts, data.method, data.status,
                data.numExtractorStudy, data.scoreBoard
            ]
        });
        extractionStepsCSV.unshift([
            "ID", "Start Date", "End Date", "Date Extract", "Date Conflicts",
            "Method", "Number Extractor Study", "Score Board"
        ]);

        return (
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <h3>List of Extraction steps for this Project</h3>
                        </Col>
                        <Col span={12}>
                            <Link to={`/studiesInExtractionConflict/${projectid}`}>
                                <Button title="Studies in conflict in Extraction Step" type="danger">
                                    Studies in conflict in Extraction Step
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <hr />
                    <Table bordered columns={columns} dataSource={data}
                        pagination={{ pageSize: 50 }} scroll={{ x: true, y: true }} />
                    <ExcelFile filename={"extraction-steps-project-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataExtractionStepsXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"extraction-steps-project-" + sufixFileName() + ".csv"} data={extractionStepsCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default ExtractionStepListComponent;