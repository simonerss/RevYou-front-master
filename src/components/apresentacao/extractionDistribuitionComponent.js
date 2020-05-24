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


class ExtractionDistribuitionComponent extends React.Component {
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
        console.log(this.props)
        const data = this.props.data;
        const extractor = this.props.Extractor;

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }
        const columns = [
            { title: 'Extractor Name', dataIndex: 'name', key: 'name', width: 150, ...this.getColumnSearchProps('name') },
            { title: 'Date Checker', dataIndex: 'email', key: 'email', width: 150, ...this.getColumnSearchProps('email') },
            {
                title: 'Action',
                key: 'action', 
                width: 150,
                render: (text, record) => {
                    return (<span>
                        <Link to={`/researcherStudiesExtractionList/${data.ProjectId}/${record.id}`}>
                            <ANButton sm="small" title="Details" type="primary">Show Details</ANButton>
                        </Link>
                    </span>);
                }
            }
        ];
        //--------------FOR EXPORT XLSX-------------------------------
        const extractorReportXLSX = extractor.map(extractor => {
            return [
                { value: ((extractor.name != null) ? extractor.name : "") },
                { value: ((extractor.email != null) ? extractor.email : "") },
            ];
        });
        const multiDataExtractorReportXLSX = [{
            columns: [
                { title: "Extractor Name", width: { wpx: 300 } },
                { title: "E-mail", width: { wpx: 250 } },
            ],
            data: extractorReportXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const extractorReportCSV = extractor.map(extractor => {
            return [extractor.name, extractor.email]
        });
        extractorReportCSV.unshift(["Extractor Name", "E-mail"]);


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
                                            <Row className="row row-even">
                                                <Col span={12}>
                                                    <b>Start Date: {'\u00A0'}</b> {this.americanDate(data.startDate)}
                                                </Col>
                                                <Col span={12}>
                                                    <b>End Date: {'\u00A0'}</b> {this.americanDate(data.endDate)}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">
                                            <Col span={12}>
                                                    <b>Date Extractor: {'\u00A0'}</b> {this.americanDate(data.dateExtractor)}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Date Conflicts: {'\u00A0'}</b> {this.americanDate(data.dateConflicts)}
                                                </Col>
                                            </Row>
                                            <Row className="row row-even">
                                            <Col span={12}>
                                                    <b>Method: {'\u00A0'}</b> {data.method}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Status: {'\u00A0'}</b> {data.status}
                                                </Col>
                                            </Row>
                                            <Row className="row row-odd">                                                
                                                <Col span={12}>
                                                    <b>Number Extractor Study: {'\u00A0'}</b> {data.numExtractorStudy}
                                                </Col>
                                                <Col span={12}>
                                                    <b>Score Board: {'\u00A0'}</b> {data.scoreBoard}
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
                            <h3>Extractors for This Step</h3><hr />
                            <Table bordered columns={columns} dataSource={extractor} scroll={{ x: true, y: true }} />
                            <ExcelFile filename={"extractors-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                <ExcelSheet dataSet={multiDataExtractorReportXLSX} name="Organization" />
                            </ExcelFile>&nbsp;
                            <ANButton type="primary" size={"small"}>
                                <CSVLink filename={"extractors-" + sufixFileName() + ".csv"} data={extractorReportCSV}>
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

export default ExtractionDistribuitionComponent;