import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExtractionDistribuitionComponent from '../../components/apresentacao/extractionDistribuitionComponent';

class ExtractionDistribuition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            // Decisor: [],
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
        fetch(`http://localhost:5000/extraction/step/report/${id.refextraction}`)
            .then(data => data.json().then(data =>
                this.setState({
                    data,                    
                    Extractor: data.Extractor,
                    // Decisor: data.Decisor,
                })))
            .catch(erro => this.setState({ erro }));
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
