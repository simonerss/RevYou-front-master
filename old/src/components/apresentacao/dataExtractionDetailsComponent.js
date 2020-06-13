import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
// import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Accordion, Card, Button, Container, Row as BRow, Col as BCol } from 'react-bootstrap';
import { Input, Table, Col, Row, Button as ANButton} from 'antd';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class DataExtractionDetailsComponent extends React.Component {
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

    americanDate(newdate) {
        const date = new Date(newdate);
        let day = date.getDate();
        let mes = date.getMonth();
        const year = date.getFullYear();
        mes = ("00" + (mes + 1)).slice(-2);
        day = ("00" + (day + 1)).slice(-2);
        return year + "/" + mes + "/" + day;
    }

    render() {
        // const data = this.props.data;// dados da etapa de extração
        const dataStudy = this.props.dataStudy; //dados do estudo do ual as informações foram extraídas
        const field = this.props.Field; // dados extraídos
        const ExtractionStep = this.props.ExtractionStep;        
        const extractor = this.props.extractor; //pesuisador que extraiu as informações

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const columns = [
            { title: 'Question', dataIndex: 'description', key: 'description', width: 150, ...this.getColumnSearchProps('description') },
            { title: 'Answer', dataIndex: 'content', key: 'content', width: 150, ...this.getColumnSearchProps('content') },
            { title: 'Question Option', dataIndex: 'field_option', key: 'field_option', width: 150, ...this.getColumnSearchProps('field_option') },
            { title: 'Answer Option', dataIndex: 'answer_option', key: 'answer_option', width: 150, ...this.getColumnSearchProps('answer_option') },
            { title: 'Status', dataIndex: 'status', key: 'status', width: 150, ...this.getColumnSearchProps('status') },
            // {
            //     title: 'Action',
            //     key: 'action', width: 150,
            //     render: (text, record) => {
            //         return (
            //             <span>
            //                 <Link to={`#`}>
            //                     <ANButton title="Details" type="primary" size="small">Show Details</ANButton>
            //                 </Link>
            //             </span>
            //         );
            //     }
            // }
        ];
        //--------------FOR EXPORT XLSX-------------------------------
        const extractionFieldsXLSX = field.map(field => {
            return [
                { value: ((field.field_id != null) ? field.field_id : "") },
                { value: ((field.description != null) ? field.description : "") },
                // { value: ((field.field_option != null) ? field.field_option : "") },
                { value: ((field.type != null) ? field.type : "") },
                { value: ((field.position != null) ? field.position : "") },
                // { value: ((field.answer_id != null) ? field.answer_id : "") },
                { value: ((field.content != null) ? field.content : "") },
                { value: ((field.supportData != null) ? field.supportData : "") },
                { value: ((field.answer_option[0] != null) ? field.answer_option[0] : "") },
                { value: ((field.status != null) ? field.status : "") },
            ];
        });
        const multiDataExtractionFieldsXLSX = [{
            columns: [
                { title: "ID", width: { wpx: 300 } },
                { title: "Description", width: { wpx: 250 } },
                { title: "Question Type", width: { wpx: 250 } },
                { title: "Position", width: { wpx: 250 } },
                { title: "Answer", width: { wpx: 250 } },
                { title: "Support Data", width: { wpx: 250 } },
                { title: "Chosen Option", width: { wpx: 250 } },
                { title: "Status", width: { wpx: 250 } },
            ],
            data: extractionFieldsXLSX
        }];

        // -------------FORM CSV EXPORTS:----------------------------
        const extractionFieldsCSV = field.map(field => {
            return [
                field.field_id, field.description, field.type,
                field.position, field.content, field.supportData,
                field.answer_option, field.status
            ]
        });
        extractionFieldsCSV.unshift([
            "ID", "Description", "Question Type",
            "Position", "Answer", "Support Data", 
            "Chosen Option", "Status"
        ]);


        return (
            <div>
                <Container style={{ textAlign: 'justify', color: '#595959' }}>
                    <BRow>
                        <BCol sm={24} style={{ width: '100%' }}>
                            <Accordion defaultActiveKey="0" >
                                <Card style={{ width: '100%', borderRadius: '3px', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                                    <Card.Header>
                                        <h5><b>Details of Extraction</b></h5>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body style={{ padding: '10px 15px' }}>
                                            <Row>
                                                <Col span={24}>
                                                    <b>Extractor: {'\u00A0'}</b> {extractor.name}
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row className="row row-even">
                                                <Col span={24}>
                                                    <b>Article Title: {'\u00A0'}</b> {dataStudy.title}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={24}>
                                                    <p><b><center>Abstract: {'\u00A0'}</center></b></p>
                                                    <p>{dataStudy.abstract}</p>
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={24}>
                                                    <b>Authors: {'\u00A0'}</b> {dataStudy.authors}

                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>CiteKey: {'\u00A0'}</b> {dataStudy.citekey}
                                                </Col>
                                                <Col span={12}>
                                                    <b>KeyWords: {'\u00A0'}</b> {dataStudy.keywords}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
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
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>URL: {'\u00A0'}</b> {dataStudy.url}
                                                </Col>
                                                <Col span={12}>
                                                    <b>DOI: {'\u00A0'}</b> {dataStudy.doi}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>ISSN: {'\u00A0'}</b> {dataStudy.issn}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Venue Type: {'\u00A0'}</b> {dataStudy.venueType}
                                                </Col>
                                            </Row>
                                            <hr />
                                            <h5><b>Extraction:</b></h5>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>Start Date: {'\u00A0'}</b> {this.americanDate(ExtractionStep.startDate)}
                                                </Col>
                                                <Col span={12}>
                                                    <b>End Date: {'\u00A0'}</b> {this.americanDate(ExtractionStep.endDate)}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>Date Extractor: {'\u00A0'}</b> {this.americanDate(ExtractionStep.dateExtractor)}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Date Conflicts: {'\u00A0'}</b> {this.americanDate(ExtractionStep.dateConflicts)}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                                <Col span={12}>
                                                    <b>Method: {'\u00A0'}</b> {ExtractionStep.method}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Status: {'\u00A0'}</b> {ExtractionStep.status}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>Number Extractor Study: {'\u00A0'}</b> {ExtractionStep.numExtractorStudy}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Score Board: {'\u00A0'}</b> {ExtractionStep.scoreBoard}
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
                            <h3>Questions for This Article</h3><hr />
                            <Table bordered columns={columns} dataSource={field} scroll={{ x: true, y: true }} />
                            <ExcelFile filename={"extraction-data-study:"+dataStudy.id+"-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multiDataExtractionFieldsXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"extraction-data-study:"+dataStudy.id+"-" + sufixFileName()+".csv"} data={extractionFieldsCSV}>
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

export default DataExtractionDetailsComponent;