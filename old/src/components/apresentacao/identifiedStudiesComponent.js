// import ReactDOM from 'react-dom';
// import { Button } from 'react-bootstrap';
import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/revyou-css.css';
import { Link } from 'react-router-dom';
import { Input, Table, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class IdentifiedStudiesComponent extends React.Component {
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
        const sufixFileName = () => {
            const date = new Date();
            const dia = date.getDate();
            let mes = date.getMonth();
            mes = ("00" + (mes + 1)).slice(-2);
            const ano = date.getFullYear();
            return dia + mes + ano;
        }
        const dataStudies = this.props.dataStudies;
        const columns = [
            { title: 'Article Title', dataIndex: 'title', key: 'title', ...this.getColumnSearchProps('title') },
            { title: 'Authors', dataIndex: 'authors', key: 'authors', ...this.getColumnSearchProps('authors') },
            { title: 'Search Engine', dataIndex: 'base', key: 'base', ...this.getColumnSearchProps('base') },
            { title: 'Year', dataIndex: 'year', key: 'year', ...this.getColumnSearchProps('year') },
            { title: 'General Status', dataIndex: 'generalStatus', key: 'generalStatus', ...this.getColumnSearchProps('generalStatus') },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <span>
                            <Link to={`/studySelectionStepReport/${record.key}`}>
                                <Button style={{ marginBottom: '3px' }} title="Show" type="primary" size="small">
                                    Selection Steps
                                </Button>
                            </Link><br />
                            <Link to={`/extractionStepsList/${record.key}`}>
                                <Button style={{ marginBottom: '3px' }} title="Show" type="primary" size="small">
                                    Extraction Steps
                                </Button>
                            </Link><br />
                            {/* <Link to={`/studyDetails/${record.key}/${record.ProjectId}`}>
                                <Button style={{ marginBottom: '3px' }} title="Show" type="primary" size="small">
                                    Show
                                </Button>
                            </Link> */}
                        </span>
                    );
                }
            }
        ];

        //--------------FOR EXPORT XLSX-------------------------------
        const identifiedStudiesXLSX = dataStudies.map(dataStudies => {
            return [
                { value: ((dataStudies.key != null) ? dataStudies.key : "") },
                { value: ((dataStudies.title != null) ? dataStudies.title : "") },
                { value: ((dataStudies.authors != null) ? dataStudies.authors : "") },
                { value: ((dataStudies.citekey != null) ? dataStudies.citekey : "") },
                { value: ((dataStudies.abstract != null) ? dataStudies.abstract : "") },
                { value: ((dataStudies.keywords != null) ? dataStudies.keywords : "") },
                { value: ((dataStudies.venue != null) ? dataStudies.venue : "") },
                { value: ((dataStudies.year != null) ? dataStudies.year : "") },
                { value: ((dataStudies.pages != null) ? dataStudies.pages : "") },
                { value: ((dataStudies.volume != null) ? dataStudies.authors : "") },
                { value: ((dataStudies.url != null) ? dataStudies.url : "") },
                { value: ((dataStudies.issn != null) ? dataStudies.issn : "") },
                { value: ((dataStudies.doi != null) ? dataStudies.doi : "") },
                { value: ((dataStudies.base != null) ? dataStudies.base : "") },
                { value: ((dataStudies.search != null) ? dataStudies.search : "") },
                { value: ((dataStudies.generalStatus != null) ? dataStudies.generalStatus : "") },
                { value: ((dataStudies.venueType != null) ? dataStudies.venueType : "") },
                { value: ((dataStudies.createdAt != null) ? dataStudies.createdAt : "") },
                { value: ((dataStudies.updatedAt != null) ? dataStudies.updatedAt : "") },
                { value: ((dataStudies.ProjectId != null) ? dataStudies.ProjectId : "") },
                { value: ((dataStudies.SearchId != null) ? dataStudies.ProjectSearchIdId : "") },
            ];
        });
        const multiDataIdentifiedStudiestXLSX = [{
            columns: [
                { title: "ID Study", width: { wpx: 200 } },
                { title: "Title", width: { wpx: 300 } },
                { title: "Authors", width: { wpx: 250 } },
                { title: "Citekey", width: { wpx: 200 } },
                { title: "Abstract", width: { wpx: 300 } },
                { title: "Keywords", width: { wpx: 200 } },
                { title: "Venue", width: { wpx: 150 } },
                { title: "Year", width: { wpx: 150 } },
                { title: "Pages", width: { wpx: 100 } },
                { title: "Volume", width: { wpx: 100 } },
                { title: "URL", width: { wpx: 300 } },
                { title: "ISSN", width: { wpx: 250 } },
                { title: "DOI", width: { wpx: 300 } },
                { title: "Search Engine", width: { wpx: 150 } },
                { title: "Search", width: { wpx: 250 } },
                { title: "General Status", width: { wpx: 150 } },
                { title: "Venue Type", width: { wpx: 150 } },
                { title: "Created At", width: { wpx: 200 } },
                { title: "Update At", width: { wpx: 200 } },
                { title: "Project ID", width: { wpx: 200 } },
                { title: "Search ID", width: { wpx: 200 } },
            ],
            data: identifiedStudiesXLSX
        }];

        //-------------FORM CSV EXPORTS:----------------------------
        const identifiedStudiesCSV = dataStudies.map(dataStudies => {
            return [
                dataStudies.key, dataStudies.title, dataStudies.authors,
                dataStudies.citekey, dataStudies.abstract, dataStudies.keywords,
                dataStudies.venue, dataStudies.year, dataStudies.pages,
                dataStudies.volume, dataStudies.ur, dataStudies.issn,
                dataStudies.doi, dataStudies.base, dataStudies.search,
                dataStudies.generalStatus, dataStudies.venueType, dataStudies.createdAt,
                dataStudies.updatedAt, dataStudies.ProjectId, dataStudies.SearchId,
            ]
        });
        identifiedStudiesCSV.unshift([
            "ID Study", "Title", "Authors",
            "Citekey", "Abstract", "Keywords",
            "Venue", "Year", "Pages",
            "Volume", "URL", "ISSN",
            "DOI", "Search Engine", "Search",
            "General Status", "Venue Type", "Created At",
            "Update At", "Project ID", "Search ID",
        ]);

        return (
            <Row>
                <Col sm={24}>
                    <Row>
                        <Col sm={12} >
                            <h3>Identified Studies of this Project</h3>
                        </Col>
                        <Col sm={12} >
                            <Link to={`/studiesInConflict/${this.props.projectid}`}>
                                <Button title="Studies in conflict on Selection Step" type="danger" >
                                    Studies in Conflict on Selection Step
                                </Button>
                            </Link>
                            {'\u00A0'}{'\u00A0'}
                            <Link to={`/studiesInExtractionConflict/${this.props.projectid}`}>
                                <Button title="Studies in conflict in Extraction Step" type="danger">
                                    Studies in Conflict on Extraction Step
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col sm={24} className="row row-odd">
                            <Row>
                                <Col sm={24} >
                                    <h5>{/*Identified Studies */} Graphics:</h5>
                                </Col>
                            </Row>{'\u00A0'}{'\u00A0'}{'\u00A0'}
                            <Row>
                                <Col sm={24}>
                                    <Link to={`/identifiedbymethod/${this.props.projectid}`}>
                                        <Button title="Identified Studies per Search Method" type="default">
                                            Identified Studies per Search Method
                                    </Button>
                                    </Link>
                                    {'\u00A0'} {'\u00A0'}
                                    <Link to={`/studiesbysearchengine/${this.props.projectid}`}>
                                        <Button title="Identified Studies per Search Engine" type="default">
                                            Identified Studies per Search Engine
                                        </Button>
                                    </Link>
                                    {'\u00A0'} {'\u00A0'}
                                    <Link to={`/identifiedByAdaptedQuery/${this.props.projectid}`}>
                                        <Button title="Identified Studies per Adapted Query" type="default">
                                            Identified Studies per Adapted Query
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    <hr />
                    <Table bordered columns={columns} dataSource={dataStudies} />
                    <ExcelFile filename={"identified-studies-project-" + this.props.projectid + "-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataIdentifiedStudiestXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"identified-studies-project-" + this.props.projectid + "-" + sufixFileName() + ".csv"} data={identifiedStudiesCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default IdentifiedStudiesComponent;