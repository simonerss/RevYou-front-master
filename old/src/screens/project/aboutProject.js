import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutProjectComponent from '../../components/apresentacao/aboutProjectComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    fetch(`http://localhost:5000/report/aboutproject/${id.refproject}`)
      .then(data => data.json().then(data =>
        this.setState({
          data: data,
          coordinator: data.ProjectCoordinator,
          researchers: data.Researchers
        })))
      .catch(erro => this.setState({ erro }));
  }

  render() {
    console.log(this.state)
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
