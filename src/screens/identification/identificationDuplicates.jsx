import React, { Component } from 'react';
import { message } from 'antd';
import {connect} from 'react-redux';
import IdentificationDuplicatesComponent from '../../components/identification/identificationDuplicates';
import {HTTP} from '../../services/config';

class IdentificationDuplicates extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      duplicates: []
    };
    this.getData = this.getData.bind(this);
    this.handleDuplicate = this.handleDuplicate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleDuplicate(id, index) {
    let data = this.state.data;
    let duplicates = this.state.duplicates;
    if(data[index].generalStatus === 'Unclassified'){
      data[index].generalStatus = 'Duplicated';
      duplicates.push(id);
      this.setState({duplicates});
    }else{
      data[index].generalStatus = 'Unclassified'
      let temp = duplicates.indexOf(id);
      duplicates.splice(temp)
      this.setState({duplicates});
    }
    this.setState({ data });
  }

  async handleSubmit(){
    try { 
      await HTTP.put(`study`,{
        ids : this.state.duplicates
      })
      await this.setState({duplicates: []})
      setTimeout(() => {
        this.getData();
      }, 2000);
    } catch (err) {
      message.error('Ops... Server error, please contact the administrator');
    }
  }

  getData() {
    const id = this.props.project.id || 'f9fb7e03-e062-4aae-ad78-b1fb57a053a9' //mudar
    this.setState({data: []})
    HTTP
      .get(`study/duplicates/${id}`)
      .then(async res => {
        let result = [];
        let color = '#fff';
        await res.data.forEach(data => {
          if (typeof data === 'object') {
            let temp = {};
            temp = data;
            temp.color = color;
            result.push(temp);
          } else {
            color = color === '#fff' ? '#ddd' : '#fff';
          }
        });
        this.setState({ data: result });
        console.log('oi')
      });
  }

  render() {
    return (
      <IdentificationDuplicatesComponent
        {...this.state}
        handleDuplicate={this.handleDuplicate}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  project: state.project
});


export default connect(mapStateToProps)(IdentificationDuplicates);
