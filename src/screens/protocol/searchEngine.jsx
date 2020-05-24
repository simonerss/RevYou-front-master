import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchEngineComponent from '../../components/protocol/searchEngine';
import { setBases } from '../../reducers/bases/actions';
import {HTTP} from '../../services/config';

const listbases = [
  'ACM',
  'IEEE',
  'Web of Science',
  'Springer',
  'Scopus',
  ' Science Direct',
  'Scielo',
  'Lilacs',
  'Google Academic'
];

class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      basesBack: [],
      bases: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleChange(value) {
    this.setState({
      bases: value
    });
  }

  async handleSubmit() {
    try {
      console.log('oi');
      const bases = this.state.bases;
      const originalBases = this.state.basesBack;
      const ProjectId = this.props.project.id;
      let createBases = [];
      let assoaciateBases = [];
      let deleteBases = [];
      await bases.forEach(base => {
        if (originalBases.indexOf(base) === -1) {
          if (listbases.indexOf(base) === -1) {
            //create a new base
            createBases.push(base);
          }
          assoaciateBases.push(base); // assoaciate base to project
        }
      });
      await originalBases.forEach(base => {
        if (bases.indexOf(base) === -1) {
          deleteBases.push(base);
        }
      });
      if (createBases.length > 0) {
        console.log('createBases', createBases);
        await HTTP.post(`searchEngine`, {
          bases: createBases
        });
      }
      if (assoaciateBases.length > 0) {
        console.log('assoaciateBases', assoaciateBases);
        await HTTP.post(`searchEngine/createAssociation`, {
          bases: assoaciateBases,
          ProjectId
        });
      }
      if (deleteBases.length > 0) {
        console.log('delete', deleteBases);
        await HTTP.delete(`searchEngine`, {
          params: {
            bases: deleteBases,
            ProjectId
          }
        });
      }
      await this.getData();
    } catch (err) {
      console.log('error = ', err);
    }
  }

  getData() {
    const ProjectId = this.props.project.id;
    HTTP.get(`searchEngine/${ProjectId}`).then(async res => {
      const bases = await res.data[0].SearchEngines.map(data => data.name);
      this.setState({ bases, basesBack: bases });
      this.props.bases(bases);
    });
  }

  render() {
    return (
      <SearchEngineComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  bases: bases => {
    dispatch(setBases({ bases }));
  }
});

export default connect(null, mapDispatchToProps)(SearchEngine);
