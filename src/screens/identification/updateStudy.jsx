import React, { Component } from 'react';
import { Modal, Tabs } from 'antd';
import UpdateStudyComponent from '../../components/identification/updateStudy';
import CheckSimilarity from '../../screens/identification/checkSimilarity';
import {HTTP} from '../../services/config';

const { TabPane } = Tabs;

class UpdateStudy extends Component {
  constructor() {
    super();
    this.state = {
      initialValues: {
        title: '',
        authors: '',
        citekey: '',
        keywords: '',
        venue: '',
        year: '',
        pages: '',
        volume: '',
        url: '',
        issn: '',
        doi: '',
        id: ''
      },
      studyUpdate: '',
      activeKey: '1',
      study: undefined,
      venueType: undefined
    };
    this.getData = this.getData.bind(this);
    this.clickOnLine = this.clickOnLine.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    if (this.state.studyUpdate !== '') {
      HTTP.get(`study/specificStudy/${this.state.studyUpdate}`).then(res => {
        this.setState({
          initialValues: {
            title: res.data.title,
            authors: res.data.authors,
            citekey: res.data.citekey,
            keywords: res.data.keywords,
            venue: res.data.venue,
            year: res.data.year,
            pages: res.data.pages,
            volume: res.data.volume,
            url: res.data.url,
            issn: res.data.issn,
            doi: res.data.doi,
            id: res.data.id
          },
          status: res.data.generalStatus,
          venueType: res.data.venueType,
        });
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.studyUpdate !== this.props.studyUpdate && this.props.studyUpdate !== '') {
      this.setState({ studyUpdate: this.props.studyUpdate }, () => {
        this.getData();
      });
    }
  }

  clickOnLine(value) {
    this.setState({ activeKey: '1', studyUpdate: value }, () => {
      this.getData();
    });
  }

  onChange(value) {
    this.setState({ activeKey: value });
  }

  handleChange(type, value) {
    console.log('valor = ', value);
    if (type === 'status') {
      this.setState({ status: value });
    } else {
      this.setState({ venueType: value });
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        onCancel={this.props.handleCancel}
        footer={null}
        width={1100}
      >
        <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
          <TabPane tab="Update Study" key="1">
            <UpdateStudyComponent
              {...this.state}
              handleOk={this.props.handleOk}
              handleCancel={this.props.handleCancel}
              handleChange={this.handleChange}
            />
          </TabPane>
          <TabPane tab="Check Similarity" key="2">
            <CheckSimilarity studyUpdate={this.state.studyUpdate} clickOnLine={this.clickOnLine} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default UpdateStudy;
