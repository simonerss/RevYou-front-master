import React, { Component } from 'react';
import {message} from 'antd';
import SearchKeywordComponent from '../../components/protocol/searchKeyword';
import {HTTP} from '../../services/config';

class SearchKeyword extends Component {
  constructor() {
    super();
    this.state = {
      keywords: [],
      idsKeywords: [],
      keywordcomp: []
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
      keywords: value
    });
  }

  getData() {
    HTTP.get(`searchKeyword/${this.props.project.id}`).then(async res => {
      let ary = [];
      let aryIds = [];
      await res.data.forEach(data => {
        ary.push(data.keyword);
        aryIds.push(data.id)
      });
      this.setState({
        keywords: ary,
        keywordcomp: ary,
        idsKeywords: aryIds
      });
    });
  }

  handleSubmit() {
    if(this.state.keywordcomp.length === 0){
      HTTP.post('searchKeyword',{
        keywords: this.state.keywords
      }).then(res =>{
        message.success('Search Keyword was successfully registered');
        this.getData();
      }).catch(err =>{
        message.error('Ops... Server error, please contact the administrator');
      });
    }else{
      HTTP.put(`searchKeyword/${this.props.project.id}`, {
        ids: this.state.idsKeywords,
        keywords: this.state.keywords
      }).then(res =>{
        message.success('Search Keyword was successfully updated');
        this.getData();
      })
    }
  }

  render() {
    return (
      <SearchKeywordComponent
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default SearchKeyword;
