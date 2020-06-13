import React, { Component } from 'react';
import { message } from 'antd';
import moment from 'moment';
import SpecificBasesComponent from '../../components/identification/specificBases';
import {HTTP} from '../../services/config';

class AdaptedQueryAndImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: '',
      initialValues: {
        adaptSearchString: ''
      },
      dateSearch: null,
      importDate: null,
      id: ''
    };
    this.handleImport = this.handleImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleImport({ file }) {
    let formData = new FormData();
    formData.append('image', file);
    HTTP
      .post(
        `study/?ProjectId=${this.props.projectId}&base=${this.props.baseName}&search=${this.props.search}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => {
        this.setState({
          fileList: [
            {
              uid: '1',
              name: file.name,
              status: 'done'
            }
          ]
        });
        this.setState({ importedStudies: res.data });
      })
      .catch(error => {
        this.setState({
          fileList: [
            {
              uid: '1',
              name: file.name,
              status: 'error'
            }
          ]
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps){
    if (prevProps.baseName !== this.props.baseName) {
      this.getData();
    }
  }

  handleChange(type, value) {
    if (type === 'dateSearch') {
      this.setState({ dateSearch: moment(value) });
    } else {
      this.setState({ importDate: moment(value) });
    }
  }

  handleSubmit({ adaptSearchString }) {
    const adaptedDate = this.state.dateSearch !== null ? this.state.dateSearch._d : null;
    const id = this.state.id;
    if (id === '') {
      HTTP
        .post(`adaptedQuery`, {
          ProjectId: this.props.projectId,
          query: adaptSearchString,
          adaptedDate,
          search: this.props.search,
          base: this.props.baseName
        })
        .then(res => {
          this.getData();
          message.success('Adapted Query was successfully registered');
        })
        .catch(err => {
          message.error('Ops... Server error, please contact the administrator');
        });
    } else {
      HTTP
        .put(`adaptedQuery/${id}`, {
          query: adaptSearchString,
          adaptedDate
        })
        .then(res => {
          message.success('Adapted Query was successfully update');
        })
        .catch(err => {
          message.error('Ops... Server error, please contact the administrator');
        });
    }
  }

  getData() {
    HTTP
    .get(
      `adaptedQuery?ProjectId=${this.props.projectId}&search=${this.props.search}&base=${this.props.baseName}`
      )
      .then(res => {
        if (res.data !== null) {
          const initialValues = {
            adaptSearchString: res.data.query
          };
          const dateSearch = res.data.adaptedDate === null ? null : moment(res.data.adaptedDate);
          const importDate = res.data.importDate === null ? null : moment(res.data.importDate);
          console.log('entrou', initialValues , dateSearch)
          this.setState({
            initialValues,
            dateSearch,
            importDate,
            id: res.data.id
          });
        }else{
          this.setState({
            initialValues: {
              adaptSearchString: ''
            },
            dateSearch: null,
            importDate: null,
            id: ''
          });
        }
      });
  }

  render() {
    return (
      <SpecificBasesComponent
        {...this.state}
        handleImport={this.handleImport}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AdaptedQueryAndImport;
