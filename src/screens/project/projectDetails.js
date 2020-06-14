import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectDetailsComponent from '../../components/apresentacao/projectDetailsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HTTP} from '../../services/config';

class ProjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      coordinator: {},
      researchers: [],
      inviteds: [],
      MainQuestion: {},
      // MainQuestionI: {},
      SecondaryQuestion: [],
      StandardQuery: [],
      SearchKeyword: [],
      SelectionCriteria: [],
      SelectionSteps: [],
      Study: [],
      AdaptedQuery: [],
      ExtractionSteps: [],
      Languagues: [],
      SearchEngines: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    const id = this.props.match.params;

    fetch(`http://localhost:5000/report/show/${id.refproject}`)
      .then(data => data.json().then(data =>
        this.setState({
          data: data,
          coordinator: data.ProjectCoordinator,
          researchers: data.Researchers,
          inviteds: data.Inviteds,
          SecondaryQuestion: data.SecondaryQuestion,
          SearchKeyword: data.SearchKeyword,
          SelectionCriteria: data.SelectionCriteria,
          AdaptedQuery: data.AdaptedQuery,
          ExtractionSteps: data.ExtractionSteps,
          Languagues: data.Languagues,
          SearchEngines: data.SearchEngines
        })))
      .catch(erro => this.setState({ erro }));

      // fetch(`http://localhost:5000/report/mainquestion/${id.refproject}`)
      // .then(MainQuestion => MainQuestion.json().then(MainQuestion =>
      //   this.setState({ MainQuestion })))
      // .catch(erro => this.setState({ erro }));

      HTTP.get(`report/mainquestion/${id.refproject}`)
      .then(res => {
        let MainQuestion = res.data;
        this.setState({ MainQuestion });
      });

      fetch(`http://localhost:5000/report/standardQuery/${id.refproject}`)
      .then(StandardQuery => StandardQuery.json().then(StandardQuery =>
        this.setState({ StandardQuery })))
      .catch(erro => this.setState({ erro }));
  }

  render() {
    console.log(this.state);
    return (      
      <div>
        <ProjectDetailsComponent {...this.state} />
      </div>
    );
  }
}

//redux
const mapStateToProps = (state) => ({
  login: state.login,
  project: state.project
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
