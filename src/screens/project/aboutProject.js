import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutProjectComponent from '../../components/apresentacao/aboutProjectComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HTTP} from '../../services/config';

class AboutProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      coordinator: {},
      researchers: []     
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
        this.setState({ data, coordinator, researchers });
    }).catch(erro => this.setState({ erro }));

  }

  render() {
    return (
      <div>
        <AboutProjectComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutProject);
