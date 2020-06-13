import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import IdentificationResumeComponent from '../../components/identification/identificationResume';
import UpdateStudy from './updateStudy';
import {HTTP} from '../../services/config';

const baseName = 'All';

class IdentificationResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      studyUpdate: ''
    };
    this.getData = this.getData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const id = this.props.project.id || 'f9fb7e03-e062-4aae-ad78-b1fb57a053a9'; //mudar
    HTTP.get(`study/${id}`).then(res => {
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

  onSearch(search) {
    if (search !== '') {
      const ProjectId = this.props.project.id;
      HTTP
        .get(
          `study/findStudies?&search=${search}&ProjectId=${ProjectId}`
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
    console.log('valor do formik = ', title);
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
        <IdentificationResumeComponent
          {...this.state}
          baseName={baseName}
          handleEdit={this.handleEdit}
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

export default connect(mapStateToProps)(IdentificationResume);
