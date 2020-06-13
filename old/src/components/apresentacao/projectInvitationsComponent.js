import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ProjectInvitationsComponent extends React.Component {
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
        // const inviteds = this.props.inviteds;
        // console.log(inviteds);
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

        //--------------FOR THE TABLE:-------------------------------
        const columns = [
            { title: 'E-mail Researcher', dataIndex: 'email', key: 'email', ...this.getColumnSearchProps('email') },
            { title: 'Situation', dataIndex: 'situation', key: 'situation', ...this.getColumnSearchProps('situation'), responsive: ['md'], },
            { title: 'Send Date', dataIndex: 'createdAt', key: 'createdAt', ...this.getColumnSearchProps('createdAt'), responsive: ['md'], },
            { title: 'Updated Date', dataIndex: 'updatedAt', key: 'updatedAt', ...this.getColumnSearchProps('updatedAt'), responsive: ['md'], },
        ];
        //--------------FOR EXPORT XLSX-------------------------------

        const dataInvitedsXLSX = inviteds.map(data => {
            return [
                { value: ((data.email != null) ? data.email : "" ) },
                { value: ((data.situation != null) ? data.situation : "" ) },
                { value: ((data.createdAt != null) ? data.createdAt : "" ) },
                { value: ((data.updatedAt != null) ? data.updatedAt : "" ) }
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

        //-------------FORM CSV EXPORTS:----------------------------
        const invitedsCSV = inviteds.map(data => {
            return [data.email, data.situation, data.createdAt, data.updatedAt]
        });
        invitedsCSV.unshift(["E-mail", "Situation", "Send Date", "Updated Date"]);

        return (
            <Row>
                <Col sm={24}>
                    <h3>Project Sent Invitations</h3><hr />
                    <Table columns={columns} dataSource={inviteds} scroll={{ x: true }} />
                    <ExcelFile filename={"project-invitations-" + sufixFileName()} element={<Button type="primary" size={"small"}>Export to XLSX</Button>}>
                        <ExcelSheet dataSet={multiDataInvitedsXLSX} name="Organization" />
                    </ExcelFile>&nbsp;
                    <Button type="primary" size={"small"}>
                        <CSVLink filename={"project-invitations-" + sufixFileName() + ".csv"} data={invitedsCSV}>
                            Export to CSV
                        </CSVLink>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default ProjectInvitationsComponent;