import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import SetReseartcherBaseComponent from '../../components/projectDefinition/setReseartcherBase'
import {HTTP} from '../../services/config';

const {Option} = Select;

class SetReseartcherBase extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            researchers: ['Simone','Edmo','Antonio','Igor','Debora']
        }
        this.getData = this.getData.bind(this);
    }
    
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const ProjectId = this.props.project.id;
        console.log(ProjectId);
        HTTP.get(`searchEngine/${ProjectId}`).then(async res => {
            let data = await res.data[0].SearchEngines.map(data => {
                let temp = {
                    base: data.name
                }
                return temp;
            })
            console.log("aqui = ", data);
            this.setState({data});
        })
        let researchers = await this.state.researchers.map(researcher => (
            (<Option key={researcher}>{researcher}</Option>)
        ))
        this.setState({researchers})
    }

    render() {
        return <SetReseartcherBaseComponent {...this.state}/>
    }

}

const mapStateToProps = state => ({
    project: state.project
});

export default  connect(mapStateToProps)(SetReseartcherBase);