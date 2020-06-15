import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectDetailsComponent from '../../components/apresentacao/projectDetailsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HTTP } from '../../services/config';

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

    HTTP.get(`report/show/${id.refproject}`)
      .then(res => {
        let data = res.data;
        let coordinator = res.data.ProjectCoordinator;
        let researchers = res.data.Researchers;
        let inviteds = res.data.Inviteds;
        let SecondaryQuestion = res.data.SecondaryQuestion;
        let SearchKeyword = res.data.SearchKeyword;
        let SelectionCriteria = res.data.SelectionCriteria;
        let AdaptedQuery = res.data.AdaptedQuery;
        let ExtractionSteps = res.data.ExtractionSteps;
        let Languagues = res.data.Languagues;
        let SearchEngines = res.data.SearchEngines;

        this.setState({
          data, coordinator, researchers, inviteds, SecondaryQuestion,
          SearchKeyword, SelectionCriteria, AdaptedQuery, ExtractionSteps,
          Languagues, SearchEngines
        });
      }).catch(erro => this.setState({ erro }));

    HTTP.get(`report/mainquestion/${id.refproject}`)
      .then(res => {
        let MainQuestion = res.data;
        this.setState({ MainQuestion });
      }).catch(erro => this.setState({ erro }));

    HTTP.get(`report/standardQuery/${id.refproject}`)
      .then(res => {
        let StandardQuery = res.data;
        this.setState({ StandardQuery });
      }).catch(erro => this.setState({ erro }));
  }

  render() {
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
