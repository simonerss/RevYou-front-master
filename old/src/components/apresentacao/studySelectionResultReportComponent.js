import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Accordion, Card, Button, Container, Row as BRow, Col as BCol } from 'react-bootstrap';
import { Input, Table, Col, Row, Button as ANButton } from 'antd';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class StudySelectionResultReportComponent extends React.Component {
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
        const dataStudy = this.props.dataStudy;
        const dataSelStep = this.props.dataSelStep;
        const dataStudyResult = this.props.dataStudyResult;

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columns = [
            { title: 'Criteria Type', dataIndex: 'criteriaType', key: 'criteriaType', ...this.getColumnSearchProps('criteriaType') },
            { title: 'Criteria Description', dataIndex: 'criteriaDescription', key: 'criteriaDescription', ...this.getColumnSearchProps('criteriaDescription') },
            { title: 'Result', dataIndex: 'restultStatus', key: 'restultStatus', ...this.getColumnSearchProps('sr_statrestultStatusus') },
            // {
            //     title: 'Action',
            //     key: 'action',
            //     render: (text, record) => {
            //         return (
            //             <span>
            //                 <Link to={`/studySelectionResultReport/${dataStudy.id}/${record.key}`}>
            //                     <Button title="Details" type="default" icon="eye">Show Details</Button>
            //                 </Link>
            //             </span>
            //         );
            //     }
            // }
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const selectionResultReportXLSX = dataStudyResult.map(dataStudyResult => {
            return [
                { value: ((dataStudyResult.criteriaType != null) ? dataStudyResult.criteriaType : "") },
                { value: ((dataStudyResult.criteriaDescription != null) ? dataStudyResult.criteriaDescription : "") },
                { value: ((dataStudyResult.restultStatus != null) ? dataStudyResult.restultStatus : "") },
            ];
        });
        const multiDataselectionResultReportXLSX = [{
            columns: [
                { title: "Criteria Type", width: { wpx: 300 } },
                { title: "Criteria Description", width: { wpx: 250 } },
                { title: "Result", width: { wpx: 250 } },
            ],
            data: selectionResultReportXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const selectionResultReportCSV = dataStudyResult.map(dataStudyResult => {
            return [ dataStudyResult.criteriaType, dataStudyResult.criteriaDescription, dataStudyResult.restultStatus ]
        });
        selectionResultReportCSV.unshift([ "Criteria Type", "Criteria Description","Result"]);

        return (
            <div>
                <Container style={{ textAlign: 'justify', color: '#595959' }}>
                    <BRow>
                        <BCol sm={24} style={{ width: '100%' }}>
                            <Accordion defaultActiveKey="1">
                                <Card style={{ width: '100%' }}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <h5><b>Article Title: {dataStudy.title}</b></h5>
                                        </Accordion.Toggle>
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
                                <Card style={{ width: '100%', borderRadius: '3px', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            <h5><b>Selection Step Made by: {dataSelStep.name}</b></h5>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body style={{ padding: '10px 15px' }}>
                                            <Row className="row row-even">
                                                <Col span={24}>
                                                    <b>Method: {'\u00A0'}</b> {dataSelStep.method}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={24}>
                                                    <b>Rated Content: {'\u00A0'}</b> {dataSelStep.ratedContent}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>Start Date: {'\u00A0'}</b> {dataSelStep.startDate}
                                                </Col>
                                                <Col span={12}>
                                                    <b>End Date: {'\u00A0'}</b> {dataSelStep.endDate}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>Date Checker: {'\u00A0'}</b> {dataSelStep.dateChecker}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Date Conflict: {'\u00A0'}</b> {dataSelStep.dateConflicts}
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
                            <h3>Selection Criteria Results for This Article</h3><hr />
                            <Table bordered columns={columns} dataSource={dataStudyResult} />
                            <ExcelFile filename={"selection-result-report-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multiDataselectionResultReportXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"selection-result-report-" + sufixFileName() + ".csv"} data={selectionResultReportCSV}>
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

export default StudySelectionResultReportComponent;