import React, { Component } from 'react';
import { message } from 'antd';
import SecondaryQuestionComponent from '../../components/protocol/secondaryQuestionComponent';
import {HTTP} from '../../services/config';

class SecondaryQuestion extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      questions: [],
      ids: [],
      questionsOri: []
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleAddQuestion() {
    this.setState({ counter: this.state.counter + 1 });
  }

  async handleRemoveQuestion() {
    if (this.state.counter > 1) {
      this.setState({ counter: this.state.counter - 1 });
    }
  }


  async handleSubmit() {
    const ProjectId = this.props.project.id;
    const question = this.state.questions;
    const questionOri = this.state.questionsOri;
    const ids = this.state.ids;
    let updateDescr = [];
    let updateIds = [];
    let create = [];
    let del = [];
    for (let i = 0; i < this.state.counter; i++) {
      if (i < questionOri.length) {
        if (question[i] !== questionOri[i]) {
          updateDescr.push(question[i]);
          updateIds.push(ids[i]);
        }
      } else {
        create.push(question[i]);
      }
    }
    for (let j = this.state.counter; j < question.length; j++) {
      del.push(ids[j]);
    }

    try {
      if(create.length > 0){
        await HTTP.post('secondaryQuestion', {
          descriptions: create,
          ProjectId
        });
      }
      if(updateDescr.length > 0){
        await HTTP.put('secondaryQuestion', {
          descriptions: updateDescr,
          ids: updateIds,
          ProjectId
        });
      }
      if(del.length > 0){
        await HTTP.delete(`secondaryQuestion`, {
          params: {
            ids: del
          }
        });
      }

      this.getData();
      message.success('Secondary Question was successfully');
    } catch (err) {
      message.error('Ops... Server error, please contact the administrator');
    }
  }

  getData() {
    HTTP
      .get(`secondaryQuestion/${this.props.project.id}`)
      .then(async res => {
        const counter = res.data.length;
        const questions = await res.data.map(data => data.description);
        const questionsOri = await res.data.map(data => data.description);
        const ids = await res.data.map(data => data.id);

        this.setState({ counter, questions, ids, questionsOri });
      });
  }

  handleChange(e, index) {
    let questions = this.state.questions;
    questions[index] = e.target.value;
    this.setState({ questions });
  }

  render() {
    return (
      <SecondaryQuestionComponent
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleAddQuestion={this.handleAddQuestion}
        handleRemoveQuestion={this.handleRemoveQuestion}
        handleChange={this.handleChange}
      />
    );
  }
}

export default SecondaryQuestion;
