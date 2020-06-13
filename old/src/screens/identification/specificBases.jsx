import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Tabs } from 'antd';
import IdentificationResumeComponent from '../../components/identification/identificationResume';
import AdaptedQueryAndImport from './adaptedQueryAndImport';
import UpdateStudy from './updateStudy';
import {HTTP} from '../../services/config';

const { TabPane } = Tabs;

class SpecificBases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      panes: [0],
      newTabIndex: null,
      modalVisible: false,
      studyUpdate: '',
      activeKey: '0'
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.addTab = this.addTab.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.getData();
    }
  }

  addTab() {
    const len = this.state.newTabIndex || this.state.panes.length;
    const panes = this.state.panes;
    panes.splice(len, 0, len);
    this.setState({ panes, newTabIndex: null });
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    let panes = this.state.panes;
    let temp = panes.indexOf(parseInt(targetKey));
    panes.splice(temp, 1);
    this.setState({ panes, newTabIndex: parseInt(targetKey) });
  };

  getData() {
    const ProjectId = this.props.project.id || 'bef767a5-9f46-46c2-bc43-42664124ea89'; //mudar
    HTTP
      .get(`study/${ProjectId}?base=${this.props.match.params.name}`)
      .then(res => {
        const data = res.data.map(data => {
          return {
            title: data.title,
            author: data.authors,
            year: data.year,
            status: data.generalStatus,
            key: data.id
          };
        });
        this.setState({ data });
      });
  }

  //modal
  handleOk(value) {
    const {
      title,
      authors,
      citekey,
      keywords,
      venue,
      year,
      pages,
      volume,
      url,
      issn,
      doi,
      generalStatus,
      venueType
    } = value;
    HTTP
      .put(`study/specificStudy/${value.id}`, {
        title,
        authors,
        citekey,
        keywords,
        venue,
        year,
        pages,
        volume,
        url,
        issn,
        doi,
        generalStatus,
        venueType
      })
      .then(res => {
        this.setState({
          modalVisible: false,
          studyUpdate: ''
        });
      })
      .catch(() => {
        message.error('Ops... Server error, please contact the administrator');
      });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      studyUpdate: ''
    });
  }

  handleEdit(studyUpdate) {
    this.setState({
      modalVisible: true,
      studyUpdate
    });
  }

  onSearch(search) {
    if (search !== '') {
      const ProjectId = this.props.project.id;
      const base = this.props.match.params.name;
      HTTP
        .get(
          `study/findStudies?base=${base}&search=${search}&ProjectId=${ProjectId}`
        )
        .then(res => {
          const data = res.data.map(data => {
            return {
              title: data.title,
              author: data.authors,
              year: data.year,
              status: data.generalStatus,
              key: data.id
            };
          });
          this.setState({ data });
        })
        .catch(() => {
          message.error('Ops... Server error, please contact the administrator');
        });
    } else {
      this.getData();
    }
  }

  render() {
    const baseName = this.props.match.params.name;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.addTab}>ADD Search</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map((pane, index) => (
            <TabPane tab={`Search ${pane}`} key={pane} closable={index === 0 ? false : true}>
              <AdaptedQueryAndImport
                projectId={this.props.project.id}
                baseName={baseName}
                search={this.state.activeKey}
              />
              <IdentificationResumeComponent
                {...this.state}
                handleEdit={this.handleEdit}
                baseName={baseName}
                onSearch={this.onSearch}
              />
              <UpdateStudy
                studyUpdate={this.state.studyUpdate}
                modalVisible={this.state.modalVisible}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps)(SpecificBases);
