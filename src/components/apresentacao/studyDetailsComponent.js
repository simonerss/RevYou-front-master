import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
import { Accordion, Card, Container, Row as BRow, Col as BCol, Button } from 'react-bootstrap';
import { Col, Row, Table, Input, Button as ANButton } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class StudyDetailsComponent extends React.Component {
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
        const dataext = this.props.dataext;
        const datasel = this.props.datasel;
        console.log(datasel)

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columnsext = [
            { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', width: 150, ...this.getColumnSearchProps('startDate') },
            { title: 'End Date', dataIndex: 'endDate', key: 'endDate', width: 150, ...this.getColumnSearchProps('endDate') },
            { title: 'Date Extractor', dataIndex: 'dateExtractor', key: 'dateExtractor', width: 150, ...this.getColumnSearchProps('dateExtractor') },
            { title: 'Date Conflicts', dataIndex: 'dateConflicts', key: 'dateConflicts', width: 150, ...this.getColumnSearchProps('dateConflicts') },
            { title: 'Method', dataIndex: 'method', key: 'method', width: 150, ...this.getColumnSearchProps('method') },
            { title: 'Status', dataIndex: 'status', key: 'status', width: 150, ...this.getColumnSearchProps('status') },
            { title: 'Number Extractor Study', dataIndex: 'numExtractorStudy', key: 'numExtractorStudy', width: 180, ...this.getColumnSearchProps('numExtractorStudy') },
            { title: 'Score Board', dataIndex: 'scoreBoard', key: 'scoreBoard', width: 150, ...this.getColumnSearchProps('scoreBoard') },
            {
                title: 'Action',
                key: 'action',
                width: 150,
                fixed: 'right',
                render: (text, record) => {
                    return (<span>
                        <Link to={`/extractionDistribuition/${record.key}`}>
                            <ANButton title="Select" type="primary">Show Details</ANButton>
                        </Link>
                    </span>);
                }
            }
        ];

        const columnssel = [
            { title: 'Researcher', dataIndex: 'name', key: 'name', width: 150, ...this.getColumnSearchProps('name') },
            { title: 'Date Checker', dataIndex: 'dateChecker', key: 'dateChecker', width: 150, ...this.getColumnSearchProps('dateChecker') },
            { title: 'Method', dataIndex: 'method', key: 'method', width: 150, ...this.getColumnSearchProps('method') },
            { title: 'Status', dataIndex: 'ss_status', key: 'ss_status', width: 150, ...this.getColumnSearchProps('ss_status') },
            {
                title: 'Action',
                key: 'action', width: 150,
                render: (text, record) => {
                    return (
                        <span>
                            <Link to={`/studySelectionResultReport/${record.key}/${data.id}/${record.r_id}`}>
                                <ANButton title="Details" type="primary">Show Details</ANButton>
                            </Link>
                        </span>
                    );
                }
            }
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const extractionStepsXLSX = dataext.map(dataext => {
            return [
                { value: ((dataext.key != null) ? dataext.key : "") },
                { value: ((dataext.startDate != null) ? dataext.startDate : "") },
                { value: ((dataext.endDate != null) ? dataext.endDate : "") },
                { value: ((dataext.dateExtractor != null) ? dataext.dateExtractor : "") },
                { value: ((dataext.dateConflicts != null) ? dataext.dateConflicts : "") },
                { value: ((dataext.method != null) ? dataext.method : "") },
                { value: ((dataext.status != null) ? dataext.status : "") },
                { value: ((dataext.numExtractorStudy != null) ? dataext.numExtractorStudy : "") },
                { value: ((dataext.scoreBoard != null) ? dataext.scoreBoard : "") },
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

        const selectionReportXLSX = datasel.map(datasel => {
            return [
                { value: ((datasel.name != null) ? datasel.name : "") },
                { value: ((datasel.dateChecker != null) ? datasel.dateChecker : "") },
                { value: ((datasel.method != null) ? datasel.method : "") },
                { value: ((datasel.ss_status != null) ? datasel.ss_status : "") },
            ];
        });
        const multidataselectionReportXLSX = [{
            columns: [
                { title: "Researcher", width: { wpx: 300 } },
                { title: "Date Checker", width: { wpx: 250 } },
                { title: "Method", width: { wpx: 250 } },
                { title: "Status", width: { wpx: 250 } },
            ],
            data: selectionReportXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const extractionStepsCSV = dataext.map(dataext => {
            return [
                dataext.key, dataext.startDate, dataext.endDate, dataext.dateExtractor,
                dataext.dateConflicts, dataext.method, dataext.status,
                dataext.numExtractorStudy, dataext.scoreBoard
            ]
        });
        extractionStepsCSV.unshift([
            "ID", "Start Date", "End Date", "Date Extract", "Date Conflicts",
            "Method", "Number Extractor Study", "Score Board"
        ]);

        const selectionReportCSV = datasel.map(datasel => {
            return [
                datasel.name, datasel.dateChecker,
                datasel.method, datasel.ss_status
            ]
        });
        selectionReportCSV.unshift([
            "Researcher", "Date Checker",
            "Method", "Status"
        ]);


        return (
            <div>
                <h3>Study Details</h3><hr />
                <Container style={{ textAlign: 'justify', color: '#595959' }}>
                    <BRow>
                        <BCol sm={24} style={{ width: '100%' }}>
                            <Accordion defaultActiveKey="0">
                                <Card style={{ width: '100%', borderRadius: '3px', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                                    <Card.Header>
                                        <center><h5><b>Article Title:<br /> {data.title}</b></h5></center>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body style={{ padding: '10px 15px' }}>
                                            <Row className="row row-even">
                                                <Col span={24}>
                                                    <p><b><center>Abstract: {'\u00A0'}</center></b></p>
                                                    <p>{data.abstract}</p>
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={24}>
                                                    <b>Authors: {'\u00A0'}</b> {data.authors}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>CiteKey: {'\u00A0'}</b> {data.citekey}
                                                </Col>
                                                <Col span={12}>
                                                    <b>KeyWords: {'\u00A0'}</b> {data.keywords}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={6}>
                                                    <b>Venue: {'\u00A0'}</b> {data.venue}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Year: {'\u00A0'}</b> {data.year}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Pages: {'\u00A0'}</b> {data.pages}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Volume: {'\u00A0'}</b> {data.volume}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>URL: {'\u00A0'}</b> {data.url}
                                                </Col>
                                                <Col span={12}>
                                                    <b>DOI: {'\u00A0'}</b> {data.doi}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>ISSN: {'\u00A0'}</b> {data.issn}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Venue Type: {'\u00A0'}</b> {data.venueType}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </BCol>
                    </BRow><br />
                    <BRow style={{ width: '100%' }}>
                        <BCol span={24}>
                        <h3>Selection Steps for This Article</h3><hr />
                            <Table bordered columns={columnssel} dataSource={datasel} scroll={{ x: true, y: true }} />
                            <ExcelFile filename={"selection-report-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multidataselectionReportXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"selection-report-" + sufixFileName() + ".csv"} data={selectionReportCSV}>
                                    Export to CSV
                                </CSVLink>
                            </ANButton>
                        </BCol>
                    </BRow><br />
                    <BRow style={{ width: '100%' }}>
                        <BCol span={24}>
                            <h3>List of Extraction steps for this Project</h3><hr />
                            <Table bordered columns={columnsext} dataSource={dataext}
                                pagination={{ pageSize: 50 }} scroll={{ x: 1300, y: 500 }} />
                            <ExcelFile filename={"extraction-steps-project-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multiDataExtractionStepsXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"extraction-steps-project-" + sufixFileName() + ".csv"} data={extractionStepsCSV}>
                                    Export to CSV
                            </CSVLink>
                            </ANButton>
                        </BCol>
                    </BRow>
                </Container>

            </div>
        );
    }
}

export default StudyDetailsComponent;