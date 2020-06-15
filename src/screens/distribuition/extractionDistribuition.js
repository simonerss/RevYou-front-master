import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExtractionDistribuitionComponent from '../../components/apresentacao/extractionDistribuitionComponent';
import { HTTP } from '../../services/config';

class ExtractionDistribuition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            Extractor: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    americanDate(newdate) {
        const date = new Date(newdate);
        let day = date.getDate();
        let mes = date.getMonth();
        const year = date.getFullYear();
        mes = ("00" + (mes + 1)).slice(-2);
        day = ("00" + (day + 1)).slice(-2);
        return year + "/" + mes + "/" + day;
    }

    getData() {
        const id = this.props.match.params;

        HTTP.get(`extraction/step/report/${id.refextraction}`)
        .then(res => {
            let data = res.data;
            let Extractor = res.data.Extractor;
            this.setState({ data, Extractor });
        }).catch(erro => this.setState({ erro }));
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                <ExtractionDistribuitionComponent {...this.state} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtractionDistribuition);
