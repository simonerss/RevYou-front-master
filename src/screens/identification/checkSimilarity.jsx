import React, { Component } from 'react';
import {connect} from 'react-redux'
import CheckSimilarityComponent from '../../components/identification/checkSimilarity'
import {HTTP} from '../../services/config';

class CheckSimilarity extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.studyUpdate !== this.props.studyUpdate && this.props.studyUpdate !== '') {
          this.getData();
        }
    }
 
    getData(){
        const ProjectId = this.props.project.id || 'f9fb7e03-e062-4aae-ad78-b1fb57a053a9'; // mudar
        const id = this.props.studyUpdate;
        HTTP.get(`study?ProjectId=${ProjectId}&id=${id}`).then(async res => {
            const data = await res.data.map(data => {
                return data
            })
            console.log(data);
            this.setState({data})
        })
    }

    render(){
        return <CheckSimilarityComponent {...this.state} clickOnLine={this.props.clickOnLine}/>
    }
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps)(CheckSimilarity);