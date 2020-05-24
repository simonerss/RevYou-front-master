import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Accordion, Card, Button, Container, Row as BRow, Col as BCol } from 'react-bootstrap';
import { Input, Table, Col, Row, Button as ANButton } from 'antd';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class StudySelectionReportComponent extends React.Component {
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
        const dataStudy = this.props.dataStudy;

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columns = [
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
                            <Link to={`/studySelectionResultReport/${record.key}/${dataStudy.id}/${record.r_id}`}>
                                <Button title="Details" type="default" icon="eye">Show Details</Button>
                            </Link>
                        </span>
                    );
                }
            }
        ];
        //--------------FOR EXPORT XLSX-------------------------------
        const selectionReportXLSX = data.map(data => {
            return [
                { value: ((data.name != null) ? data.name : "") },
                { value: ((data.dateChecker != null) ? data.dateChecker : "") },
                { value: ((data.method != null) ? data.method : "") },
                { value: ((data.ss_status != null) ? data.ss_status : "") },
            ];
        });
        const multiDataselectionReportXLSX = [{
            columns: [
                { title: "Researcher", width: { wpx: 300 } },
                { title: "Date Checker", width: { wpx: 250 } },
                { title: "Method", width: { wpx: 250 } },
                { title: "Status", width: { wpx: 250 } },
            ],
            data: selectionReportXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const selectionReportCSV = data.map(data => {
            return [
                data.name, data.dateChecker,
                data.method, data.ss_status
            ]
        });
        selectionReportCSV.unshift([
            "Researcher", "Date Checker",
            "Method", "Status"
        ]);


        return (
            <div>
                <Container style={{ textAlign: 'justify', color: '#595959' }}>
                    <BRow>
                        <BCol sm={24}>
                            <Accordion defaultActiveKey="0" >
                                <Card style={{ width: '100%', borderRadius: '3px', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                                    <Card.Header>
                                        <h5><b>Article Title: {dataStudy.title}</b></h5>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body style={{ padding: '10px 15px' }}>
                                            <Row className="row row-even">
                                                <Col span={24}>
                                                    <b>Authors: {'\u00A0'}</b> {dataStudy.authors}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={24}>
                                                    <p><b><center>Abstract: {'\u00A0'}</center></b></p>
                                                    <p>{dataStudy.abstract}</p>
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>CiteKey: {'\u00A0'}</b> {dataStudy.citekey}
                                                </Col>
                                                <Col span={12}>
                                                    <b>KeyWords: {'\u00A0'}</b> {dataStudy.keywords}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={6}>
                                                    <b>Venue: {'\u00A0'}</b> {dataStudy.venue}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Year: {'\u00A0'}</b> {dataStudy.year}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Pages: {'\u00A0'}</b> {dataStudy.pages}
                                                </Col>
                                                <Col span={6}>
                                                    <b>Volume: {'\u00A0'}</b> {dataStudy.volume}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>URL: {'\u00A0'}</b> {dataStudy.url}
                                                </Col>
                                                <Col span={12}>
                                                    <b>DOI: {'\u00A0'}</b> {dataStudy.doi}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>ISSN: {'\u00A0'}</b> {dataStudy.issn}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Venue Type: {'\u00A0'}</b> {dataStudy.venueType}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </BCol>
                    </BRow>
                    <BRow>
                        <BCol sm={24} style={{ width: '100%', paddingTop: '40px' }}>
                            <h3>Selection Steps for This Article</h3><hr />
                            <Table bordered columns={columns} dataSource={data} scroll={{ x: true, y: true }} />
                            <ExcelFile filename={"selection-report-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multiDataselectionReportXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"selection-report-" + sufixFileName() + ".csv"} data={selectionReportCSV}>
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

export default StudySelectionReportComponent;