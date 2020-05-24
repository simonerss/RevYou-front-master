import React, { Component } from 'react';
import { message } from 'antd';
import LanguageComponent from '../../components/protocol/language';
import {HTTP} from '../../services/config';

let listLanguages = ['English','Spanish','Portuguese','Russian','Chinese'];

class Language extends Component {
  constructor() {
    super();
    this.state = {
      languages: [],
      languagesOri: []
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
      languages: value
    });
  }

  async handleSubmit() {
    try {
      const ProjectId = this.props.project.id;
      const languages = this.state.languages;
      const languagesOri = this.state.languagesOri;
      let createLanguages = [];
      let assoaciateLanguages = [];
      let deleteLanguages = [];

      languages.forEach(language => {
        if (languagesOri.indexOf(language) === -1) {
          if (listLanguages.indexOf(language) === -1) {
            //create a new language
            createLanguages.push(language);
          }
          assoaciateLanguages.push(language); // assoaciate luaguage to project
        }
      });

      languagesOri.forEach(language => {
        if (languages.indexOf(language) === -1) {
          deleteLanguages.push(language);
        }
      });

      if(createLanguages.length > 0){
        HTTP.post(`language`,{
          languages: createLanguages
        })
      }

      if(assoaciateLanguages.length > 0){
        HTTP.post(`language/createAssociation`,{
          ProjectId,
          languages: assoaciateLanguages
        })
      }

      if(deleteLanguages.length > 0){
        console.log('entrou no delete')
        HTTP.delete(`language`,{
          params: {
            ProjectId,
            languages: deleteLanguages
          }
        })
      }
      message.success('Ok');
    } catch (err) {
      message.error('Ops... Server error, please contact the administrator');
    }
    console.log(this.state.languages);
  }

  getData() {
    const ProjectId = this.props.project.id;
    HTTP.get(`language/${ProjectId}`).then(async res => {
      const languages = await res.data[0].Languagues.map(data => data.studiesLanguage);
      this.setState({ languages, languagesOri: languages});
    })
  }

  render() {
    return (
      <LanguageComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Language;
