import React, { Component } from 'react';
import { message, Collapse } from 'antd';
import { connect } from 'react-redux';
import UpdateStudy from './updateStudy';
import IdentificationResumeComponent from '../../components/identification/identificationResume';
import UpdateStudyComponent from '../../components/identification/updateStudy';
import {HTTP} from '../../services/config';

const baseName = 'Manually';

const Panel = Collapse.Panel;

class StudyManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      studyUpdate: '',
      status: 'Unclassified',
      venueType: undefined,
      initialValues: {}
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelFormik = this.cancelFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleSubmit(value) {
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
      doi
    } = value;
    HTTP
      .post(`study/${this.props.project.id}`, {
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
          generalStatus: this.state.status,
          venueType: this.state.venueType,
          base: 'manually'
      })
      .then(res => {
        this.getData();
      })
      .catch(err => {
        message.error('Ops... Server error, please contact the administrator');
      });
  }

  cancelFormik(resetForm) {
    this.setState({status: 'Unclassified', venueType: undefined });
    resetForm();
  }

  getData() {
    HTTP.get(`study/${this.props.project.id}?base=manually`).then(res => {
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
  }

  handleChange(type, value) {
    if (type === 'status') {
      this.setState({ status: value });
    } else {
      this.setState({ venueType: value });
    }
  }

  onSearch(search) {
    if (search !== '') {
      const ProjectId = this.props.project.id;
      HTTP
        .get(
          `study/findStudies?base=manually&search=${search}&ProjectId=${ProjectId}`
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

  render() {
    return (
      <>
        <Collapse defaultActiveKey={['1']} marginBottom="20">
          <Panel
            marginBottom={20}
            showArrow={false}
            accordion={false}
            header={<h3>Add Manually Studies</h3>}
            key="1"
          >
            <UpdateStudyComponent
              initialValues={this.state.initialValues}
              status={this.state.status}
              venueType={this.state.venueType}
              handleChange={this.handleChange}
              handleOk={this.handleSubmit}
              handleCancel={this.cancelFormik}
            />
          </Panel>
        </Collapse>
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps)(StudyManually);
