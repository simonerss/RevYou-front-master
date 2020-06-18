import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
import { Accordion, Card, Button, Container, Row as BRow, Col as BCol } from 'react-bootstrap';
import { Table, Row, Col, Button as ANButton, Input, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ProjectDetailsComponent extends React.Component {
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
        const data = this.props.data;
        const coordinator = this.props.coordinator;
        const researchers = this.props.researchers;
        const MainQuestion = this.props.MainQuestion;
        const SecondaryQuestion = this.props.SecondaryQuestion;
        const StandardQuery = this.props.StandardQuery;
        const SearchKeyword = this.props.SearchKeyword;
        const SelectionCriteria = this.props.SelectionCriteria;
        const Languagues = this.props.Languagues;
        const SearchEngines = this.props.SearchEngines;

        const inviteds = (this.props.inviteds).map(data => {
            return ({
                id: data.id,
                situation: data.situation,
                email: data.email,
                createdAt: this.americanDate(data.createdAt),
                updatedAt: this.americanDate(data.updatedAt),
            })
        });

        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }

        const colorTagInviteSituation = (situation) => {
            let color = '';
                    
            if (situation === 'denied')
                color = 'red';
            else if (situation === 'pending')
                color = 'geekblue';
            else color = 'green';

            return color;
        }

        const columns = [
            { title: 'Researcher', dataIndex: 'name', key: 'name' },
            { title: 'E-mail', dataIndex: 'email', key: 'email', responsive: ['md'], }
        ];

        const columnsInviteds = [
            { title: 'E-mail Researcher', dataIndex: 'email', key: 'email', ...this.getColumnSearchProps('email') },
            {
                title: 'Situation',
                dataIndex: 'situation',
                key: 'situation',
                ...this.getColumnSearchProps('situation'),
                responsive: ['md'],
                render: situation => {                    
                    let color = colorTagInviteSituation(situation);
                    return (
                        <span>
                            <Tag color={color}>{situation.toUpperCase()}</Tag>
                        </span>
                    );
                }
            },
            { title: 'Send Date', dataIndex: 'createdAt', key: 'createdAt', ...this.getColumnSearchProps('createdAt'), responsive: ['md'], },
            { title: 'Updated Date', dataIndex: 'updatedAt', key: 'updatedAt', ...this.getColumnSearchProps('updatedAt'), responsive: ['md'], },
        ];

        const columnsSearchKeywords = [
            { title: 'Search Keyword', dataIndex: 'keyword', key: 'keyword' },
        ];

        const columnsLanguage = [
            { title: 'Languages', dataIndex: 'studiesLanguage', key: 'studiesLanguage' },
        ];

        const columnsSearchEngine = [
            { title: 'Search Engines', dataIndex: 'name', key: 'name' },
        ];

        const columnsCriteria = [
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'Type', dataIndex: 'type', key: 'type', responsive: ['md'] },
        ];

        //--------------For Export XLSX:--------------------------------------------
        const dataResearchers = researchers.map(data => {
            return [
                { value: ((data.name != null) ? data.name : "") },
                { value: ((data.email != null) ? data.email : "") }
            ];
        });
        const multiDataResearcher = [{
            columns: [
                { title: "Researcher", width: { wpx: 300 } },
                { title: "E-mail", width: { wpx: 250 } },
            ],
            data: dataResearchers
        }];

        const dataInvitedsXLSX = inviteds.map(data => {
            return [
                { value: ((data.email != null) ? data.email : "") },
                { value: ((data.situation != null) ? data.situation : "") },
                { value: ((data.createdAt != null) ? data.createdAt : "") },
                { value: ((data.updatedAt != null) ? data.updatedAt : "") }
            ];
        });
        const multiDataInvitedsXLSX = [{
            columns: [
                { title: "E-mail", width: { wpx: 300 } },
                { title: "Situation", width: { wpx: 250 } },
                { title: "Send Date", width: { wpx: 250 } },
                { title: "Updated Date", width: { wpx: 250 } },
            ],
            data: dataInvitedsXLSX
        }];

        //--------------For Exports CSV:---------------------------------------------
        const researchersCSV = researchers.map(data => {
            return [data.name, data.email]
        });
        researchersCSV.unshift(["Researcher", "E-mail"]);

        const invitedsCSV = inviteds.map(data => {
            return [data.email, data.situation, data.createdAt, data.updatedAt]
        });
        invitedsCSV.unshift(["E-mail", "Situation", "Send Date", "Updated Date"]);

        //---------------------------------------------------------------------------
        return (
            <Row>
                <Col sm={24}>
                    <Container style={{ textAlign: 'justify', color: '#595959', width: '100%' }}>
                        <p>
                            <Link to={`/project/protocol`}>
                                <ANButton title="Edit Project" type="primary">
                                    Edit Project
                                </ANButton>
                            </Link>&nbsp;
                            <Link to={`/identifiedStudies/${data.id}`}>
                                <ANButton title="Identified Studies from this Project">
                                    Identified Studies from this Project
                                </ANButton>
                            </Link>&nbsp;
                            <Link to={`/searchEngineDistribuition/${data.id}`}>
                                <ANButton title="Search Engine Distribuition">
                                    Search Engine Distribuition
                                </ANButton>
                            </Link>&nbsp;
                            <Link to={`/SelectionDistribuition/${data.id}`}>
                                <ANButton title="Selection Distribuition">
                                    Selection Distribuition
                                </ANButton>
                            </Link>&nbsp;
                            <Link to={`/extractionStepsList/${data.id}`}>
                                <ANButton title="Extraction Step for this Project">
                                    Extraction Step for this Project
                                </ANButton>
                            </Link>&nbsp;
                        </p>
                        <hr />
                        <BRow>
                            <BCol sm={12}>
                                <Accordion defaultActiveKey="0" style={{ width: '100%' }}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                <h3><b>Project Title: {data.title}</b></h3>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body style={{ padding: '10px 15px', }}>
                                                <Row className="row row-even">
                                                    <Col span={24}>
                                                        <b>Coordinator: {'\u00A0'}</b>{coordinator.name}
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={24}>
                                                        <b>Review Type:</b> {data.reviewType}
                                                    </Col>
                                                </Row>
                                                <Row className="row row-even">
                                                    <Col span={24}>
                                                        <p><b>Objectives: {'\u00A0'}</b></p>
                                                        <p>{data.objective}</p>
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={24}>
                                                        <p><b>Description: {'\u00A0'}</b></p>
                                                        <p>{data.description}</p>
                                                    </Col>
                                                </Row>
                                                {/* <p><b>Coordinator:</b> {coordinator.name}</p>
                                                <p><b>Review Type:</b> {data.reviewType}<br /></p>
                                                <p><b>Objectives:</b> {data.objective}<br /></p>
                                                <p><b>Description:</b> {data.description}</p> */}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                <h5><b>Researchers</b></h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body style={{ padding: '10px 15px', width: '100%' }}>
                                                <Row>
                                                    <Table columns={columns} dataSource={researchers} rowKey={researchers => researchers.key} scroll={{ x: true }} />
                                                    <ExcelFile filename={"project-researchers-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                                        <ExcelSheet dataSet={multiDataResearcher} name="Organization" />
                                                    </ExcelFile>&nbsp;
                                            <ANButton type="primary" size={"small"}>
                                                        <CSVLink filename={"project-researchers-" + sufixFileName() + ".csv"} data={researchersCSV}>
                                                            Export to CSV
                                                </CSVLink>
                                                    </ANButton>
                                                </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                <h5><b>Inviteds</b></h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body style={{ padding: '10px 15px', width: '100%' }}>
                                                <Row>
                                                    <Table columns={columnsInviteds} dataSource={inviteds} rowKey={inviteds => inviteds.key} scroll={{ x: true }} />
                                                    <ExcelFile filename={"project-inviteds-" + sufixFileName()} element={<ANButton type="primary" size={"small"}>Export to XLSX</ANButton>}>
                                                        <ExcelSheet dataSet={multiDataInvitedsXLSX} name="Organization" />
                                                    </ExcelFile>&nbsp;
                                            <ANButton type="primary" size={"small"}>
                                                        <CSVLink filename={"project-inviteds-" + sufixFileName() + ".csv"} data={invitedsCSV}>
                                                            Export to CSV
                                                </CSVLink>
                                                    </ANButton>
                                                </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                <h5><b>Protocol</b></h5>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body style={{ padding: '10px 15px', width: '100%' }}>
                                                <Row>
                                                    <Col span={24} style={{ padding: '3px', }}>
                                                        <h5><b>Main Question</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={24} style={{ padding: '3px', }}>
                                                        <b>Description:{'\u00A0'}</b> {((MainQuestion.description == null) || (MainQuestion == null)) ? 'Uninformed' : MainQuestion.description}
                                                    </Col>
                                                </Row><br /><br />

                                                <Row>
                                                    <Col span={24} v>
                                                        <h6><b>PICOC:</b></h6><hr />
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Population:{'\u00A0'}</b> {((MainQuestion.population == null) ? 'Uninformed' : MainQuestion.population)}<br />
                                                    </Col>
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Intervation:{'\u00A0'}</b> {(MainQuestion.intervation == null) ? 'Uninformed' : MainQuestion.intervation}<br />
                                                    </Col>
                                                </Row>
                                                <Row className="row row-even">
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Control:{'\u00A0'}</b> {(MainQuestion.control == null) ? 'Uninformed' : MainQuestion.control}
                                                    </Col>
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Results:{'\u00A0'}</b> {(MainQuestion.results == null) ? 'Uninformed' : MainQuestion.results}
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Context:{'\u00A0'}</b> {(MainQuestion.context == null) ? 'Uninformed' : MainQuestion.context}
                                                    </Col>
                                                    <Col span={12} style={{ padding: '2px 4px', }}>
                                                        <b>Design:{'\u00A0'}</b> {(MainQuestion.design == null) ? 'Uninformed' : MainQuestion.design}
                                                    </Col>
                                                </Row><br /><br />

                                                <Row>
                                                    <Col span={24} style={{ padding: '2px 4px', }}>
                                                        <h5><b>Secondary Question:</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={24}>
                                                        <b>Description:{'\u00A0'}</b> {(SecondaryQuestion.description == null) ? 'Uninformed' : SecondaryQuestion.description}
                                                    </Col>
                                                </Row><br /><br />

                                                <Row>
                                                    <Col span={24}>
                                                        <h5><b>Standard Query</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row className="row row-odd">
                                                    <Col span={24}>
                                                        <b>Query:{'\u00A0'}</b> {(StandardQuery.query == null) ? 'Uninformed' : StandardQuery.query}
                                                    </Col>
                                                </Row><br /><br />

                                                <Row>
                                                    <Col span={24}>
                                                        <h5><b>Search Keywords</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <Table columns={columnsSearchKeywords} dataSource={SearchKeyword} rowKey={SearchKeyword => SearchKeyword.key} scroll={{ x: true }} />
                                                    </Col>
                                                </Row><br /><br />

                                                <Row>
                                                    <Col span={24}>
                                                        <h5><b>Language</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <Table columns={columnsLanguage} dataSource={Languagues} rowKey={Languagues => Languagues.key} scroll={{ x: true }} />
                                                    </Col>
                                                </Row><br />

                                                <Row>
                                                    <Col span={24}>
                                                        <h5><b>Search Engines</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <Table columns={columnsSearchEngine} dataSource={SearchEngines} rowKey={SearchEngines => SearchEngines.key} scroll={{ x: true }} />
                                                    </Col>
                                                </Row><br />

                                                <Row>
                                                    <Col span={24}>
                                                        <h5><b>Selection Criteria</b></h5><hr />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <Table columns={columnsCriteria} dataSource={SelectionCriteria} rowKey={SelectionCriteria => SelectionCriteria.key} scroll={{ x: true }} />
                                                    </Col>
                                                </Row><br />
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </BCol>
                        </BRow>
                    </Container>
                </Col>
            </Row>
        );
    }

}

export default ProjectDetailsComponent;
