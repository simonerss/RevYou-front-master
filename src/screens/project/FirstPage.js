import React, { Component } from 'react';
import { connect } from 'react-redux';

class FirstPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTerm: ''
    };
    this.getData = this.getData.bind(this);
  }
  
  getData() {
    // const id = this.props.match.params;
    // fetch(`http://localhost:5000/report/show/${id.refproject}`)
    //   .then(data => data.json().then(data =>
    //     this.setState({ data })))
    //   .catch(erro => this.setState({ erro }));
  }



  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="searhterm" name="searhterm" placeholder="Search..."
            value={this.state.searchTerm} onChange={this.handleInputChange} />
          <button type="submit">Search!</button>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      searchTerm: { ...prevState.searchTerm, [name]: value }
    }))
  }

  handleSubmit = event => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.setState({ data: json }));

    event.preventDefault();
  }

}
//redux
const mapStateToProps = (state) => ({
  login: state.login,
  project: state.project
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
